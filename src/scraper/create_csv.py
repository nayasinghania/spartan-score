import csv
from db import get_database


db = get_database()
professors = db.get_collection("professors")
reviews = db.get_collection("reviews")
output_file = "src/scraper/sjsu_rmp.csv"

sjsu_rmp_data = []
all_reviews = reviews.find({})
all_professors = list(professors.find({}))
professors_dict = {}
for professor in all_professors:
    professors_dict[professor["id"]] = professor

for review in all_reviews:
    professor = professors_dict.get(review.get("professor_id"))
    if professor:
        sjsu_rmp_data.append(
            {
                "professor_id": professor["id"],
                "professor_first_name": professor["firstName"],
                "professor_last_name": professor["lastName"],
                "professor_department": professor["department"],
                "avg_difficulty": professor["avgDifficulty"],
                "avg_rating": professor["avgRating"],
                "num_ratings": professor["numRatings"],
                "would_take_again_percent": professor["wouldTakeAgainPercent"],
                "comment": review.get("comment"),
                "difficulty_rating": review.get("rating"),
                "grade": review.get("grade"),
                "clarity_rating": review.get("clarityRating"),
                "rating_tags": review.get("ratingTags"),
            }
        )

with open(output_file, mode="w", newline="", encoding="utf-8") as file:
    field_names = sjsu_rmp_data[0].keys()
    writer = csv.DictWriter(file, fieldnames=field_names)
    writer.writeheader()
    writer.writerows(sjsu_rmp_data)
    print(f"Successfully wrote {len(sjsu_rmp_data)} records to {output_file}")
