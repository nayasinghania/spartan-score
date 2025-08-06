from bs4 import BeautifulSoup
import requests

from db import get_database

db = get_database()
courses = db.get_collection("courses")
courses.drop()

response = requests.get("https://www.sjsu.edu/classes/schedules/fall-2025.php")
soup = BeautifulSoup(response.content, "html.parser")
table = soup.find("table", id="classSchedule")
rows = table.find_all("tr")

course_data = []

for row in rows:
    cells = row.find_all("td")
    if cells:
        course_info = {
            "section": cells[0].text.strip(),
            "class_number": cells[1].text.strip(),
            "mode_of_instruction": cells[2].text.strip(),
            "course_title": cells[3].text.strip(),
            "satisfies": cells[4].text.strip(),
            "units": cells[5].text.strip(),
            "type": cells[6].text.strip(),
            "days": cells[7].text.strip(),
            "times": cells[8].text.strip(),
            "instructor": cells[9].text.strip(),
            "location": cells[10].text.strip(),
            "dates": cells[11].text.strip(),
            "open_seats": cells[12].text.strip(),
            "notes": cells[13].text.strip() if len(cells) > 13 else "",
        }
        course_data.append(course_info)

if course_data:
    result = courses.insert_many(course_data)
    unit_1 = courses.find({"units": "6.0"})
    for course in unit_1:
        print(course)
        print("\n")
