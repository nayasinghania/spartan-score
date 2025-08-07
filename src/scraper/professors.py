import requests
from db import get_database

db = get_database()
professors = db.get_collection("professors")
# professors.drop()

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


def variables(cursor: str):
    return {
        "query": {
            "schoolID": "U2Nob29sLTg4MQ==",
        },
        "cursor": cursor,
        "count": 1000,
    }


def rmp_find_professors_page(cursor: str):

    headers = {
        "authorization": "Basic dGVzdDp0ZXN0",
        "content-type": "application/json",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    }

    body = {
        "query": query,
        "variables": variables(cursor),
    }
    response = requests.post(url, json=body, headers=headers)
    data = response.json()
    nodes = data["data"]["search"]["teachers"]
    print(nodes)
    return nodes


def find_all_professors():
    cursor = ""
    has_next_page = True

    while has_next_page:
        professors_page = rmp_find_professors_page(cursor)
        professors_list = [edge["node"] for edge in professors_page["edges"]]
        # professors.insert_many(professors_list)
        cursor = professors_page["pageInfo"]["endCursor"]
        has_next_page = professors_page["pageInfo"]["hasNextPage"]


find_all_professors()
