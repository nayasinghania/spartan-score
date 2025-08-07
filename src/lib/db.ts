"use server";

import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.DATABASE_URL || "";

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});

export default async function run(course: string, section: string) {
	try {
		await client.connect();
		await client.db("spartan_score_db").command({ ping: 1 });
		const db = client.db("spartan_score_db");
		const courses = db.collection("courses");
		const result = await courses.findOne({ code: course, section: section });
		if (result) {
			return {
				code: result.code,
				section: result.section,
				class_number: result.class_number,
				mode_of_instruction: result.mode_of_instruction,
				course_title: result.course_title,
				satisfies: result.satisfies,
				units: result.units,
				type: result.type,
				days: result.days,
				times: result.times,
				instructor: result.instructor,
				location: result.location,
				dates: result.dates,
				open_seats: result.open_seats,
				notes: result.notes,
			};
		}
	} finally {
		await client.close();
	}
}
