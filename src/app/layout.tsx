import type { Metadata } from "next";
import "./globals.css";
import { Nunito_Sans } from "next/font/google";
import Title from "@/components/title";
import { UploadProvider } from "@/contexts/upload-context";

const nunitoSans = Nunito_Sans({
	subsets: ["latin"],
	weight: "400",
});

export const metadata: Metadata = {
	title: "Spartan Score Grade Calculator",
	description:
		"An intuitive, efficient, and fast grade point average (GPA) calculator for SJSU students, designed to help you easily calculate your GPA and plan your academic journey.",
	verification: {
		google: "Rqrp8tUebrSVgswxvXDwe31pXj3gSPB_rmlRHJoGaYc",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className={nunitoSans.className} suppressHydrationWarning>
			<body>
				<UploadProvider>
					<Title />
					<div className="container m-4 md:mx-8 md:my-6 max-w-[90%] md:max-w-xl">
						{children}
					</div>
				</UploadProvider>
			</body>
		</html>
	);
}
