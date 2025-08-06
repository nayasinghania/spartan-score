import type { Metadata } from "next";
import "./globals.css";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import Title from "@/components/title";
import { UploadProvider } from "@/contexts/upload-context";

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
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<UploadProvider>
						<Title />
						<div className="container m-4 md:mx-8 md:my-6 max-w-[90%] md:max-w-xl">
							{children}
						</div>
						<ModeToggle />
					</UploadProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
