import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
// import "../public/styles/style.css";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "DocSign - PDF Annotation Tool",
	description: "Upload, annotate, and sign PDF documents with ease",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} min-h-screen flex flex-col bg-light-base dark:bg-jacarta-900`}>
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
