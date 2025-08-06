import requests
import base64
from db import get_database

db = get_database()
professors = db.get_collection("professors")
professors.drop()

url = "https://www.ratemyprofessors.com/graphql"

query = """
query TeacherSearchResultsPageQuery($query: TeacherSearchQuery!, $cursor: String, $count: Int!) {
  search: newSearch {
    teachers(query: $query, first: $count, after: $cursor) {
      edges {
        node {
          id
          avgRating
          numRatings
          firstName
          lastName
          department
          wouldTakeAgainPercent
          avgDifficulty
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
"""


def variables(cursor: str, count: int):
    return {
        "query": {
            "schoolID": "U2Nob29sLTg4MQ==",
            # "fallback": True,
        },
        "cursor": cursor,
        "count": count,
    }


def encode_basic_credentials(username: str, password: str) -> str:
    credentials = f"{username}:{password}"
    encoded = base64.b64encode(credentials.encode("utf-8")).decode("utf-8")
    return encoded


def rmp_find_professors_page(cursor: str, count: int):

    headers = {
        "authorization": "Basic " + encode_basic_credentials("test", "test"),
        "content-type": "application/json",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    }

    body = {
        "query": query,
        "variables": variables(cursor, count),
    }
    response = requests.post(url, json=body, headers=headers)
    data = response.json()
    nodes = data["data"]["search"]["teachers"]["edges"]
    for node in nodes:
        info = {
            "id": node["node"]["id"],
            "avgRating": node["node"]["avgRating"],
            "numRatings": node["node"]["numRatings"],
            "firstName": node["node"]["firstName"],
            "lastName": node["node"]["lastName"],
            "department": node["node"]["department"],
            "wouldTakeAgainPercent": node["node"]["wouldTakeAgainPercent"],
            "avgDifficulty": node["node"]["avgDifficulty"],
        }
        professors.insert_one(info)


rmp_find_professors_page("", 10)
