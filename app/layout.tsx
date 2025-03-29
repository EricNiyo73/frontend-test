import type React from "react";
import type { Metadata } from "next";

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import "./globals.css";
// import "../public/styles/style.css";
import { Toaster } from "@/components/ui/sonner";
export const metadata: Metadata = {
	title: "NEDocSign - PDF Annotation Tool",
	description: "Upload, annotate, and sign PDF documents with ease",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className=" min-h-screen flex flex-col bg-light-base dark:bg-jacarta-900">
				<Header />

				<main className="flex-grow">
					{children}

					<Toaster
						position="top-right"
						className="toaster group"
						toastOptions={{
							classNames: {
								error: "bg-red text-white",
								success: "bg-green text-white",
							},
						}}
					/>
				</main>
				<Footer />
			</body>
		</html>
	);
}
