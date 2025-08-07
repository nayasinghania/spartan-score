import requests

from db import get_database
from concurrent.futures import ProcessPoolExecutor


def fetch_professor_data(professor_id):
    url = "https://www.ratemyprofessors.com/graphql"
    headers = {
        "Accept": "*/*",
        "Authorization": "Basic dGVzdDp0ZXN0",
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    }
    data = {
        "query": f"""
            {{
                node(id: "{professor_id}") {{
                    ... on Teacher {{
                        firstName
                        lastName
                        department
                        avgRating
                        avgDifficulty
                        ratings(first: 100) {{
                            edges {{
                                node {{
                                    comment
                                    ratingTags
                                    difficultyRating
                                    grade
                                    helpfulRating
                                    clarityRating
                                }}
                            }}
                        }}
                        teacherRatingTags {{
                            tagName
                            tagCount
                        }}
                    }}
                }}
            }}
        """
    }

    response = requests.post(url, headers=headers, json=data)

    # Check if the request was successful
    if response.status_code == 200:
        return response.json()
    else:
        response.raise_for_status()


def structure_data(data, professor_id):
    db = get_database()
    reviews = db.get_collection("reviews")
    rating_data = []
    for edge in data["data"]["node"]["ratings"]["edges"]:
        rating_data.append(
            {
                "professor_id": professor_id,
                "comment": edge["node"]["comment"],
                "difficulty_rating": edge["node"]["difficultyRating"],
                "grade": edge["node"]["grade"],
                "clarity_rating": edge["node"]["clarityRating"],
                "rating_tags": edge["node"]["ratingTags"],
            }
        )
    reviews.insert_many(rating_data)



def fetch_and_write():
    db = get_database()
    professors = db.get_collection("professors")
    professor_ids = professors.distinct("id")
    reviews = db.get_collection("reviews")
    reviews.drop()

    with ProcessPoolExecutor(16) as executor:
        # Fetch data in parallel, then process sequentially
        futures = [(executor.submit(fetch_professor_data, prof_id), prof_id) 
                  for prof_id in professor_ids]
        
        counter = 0
        for future, prof_id in futures:
            print(f"Processing course #{counter}")
            fetched_data = future.result()
            structure_data(fetched_data, prof_id)
            counter += 1

fetch_and_write()
