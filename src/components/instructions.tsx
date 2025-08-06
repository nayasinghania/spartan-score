import Image from "next/image";
import Link from "next/link";

export default function Instructions() {
	return (
		<div>
			<h2>Instructions</h2>
			<ol>
				<li>
					Go to{" "}
					<Link href="https://sjsu.instructure.com/" target="_blank">
						Canvas
					</Link>
				</li>
				<li>
					Ensure you are on the <strong>Card View</strong> of your courses, then
					click <strong>View Grades</strong> towards the right of the page
				</li>
				<li>
					Take a screenshot of your grades, like below
					<Image
						src="/demo_grades_screenshot.png"
						alt="Screenshot of grades"
						width={375}
						height={215}
						className="rounded-lg mt-2"
					/>
				</li>
				<li>Upload the screenshot below</li>
			</ol>
		</div>
	);
}
