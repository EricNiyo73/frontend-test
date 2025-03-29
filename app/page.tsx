"use client";

import { useState } from "react";
import DocumentUploader from "@/components/document-uploader";
import dynamic from "next/dynamic";
import ToolBar from "@/components/tool-bar";
import type { AnnotationType, Annotation } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";

// Dynamically import DocumentViewer with no SSR
const DocumentViewer = dynamic(() => import("@/components/document-viewer"), { ssr: false });

export default function Home() {
	const [file, setFile] = useState<File | null>(null);
	const [pdfUrl, setPdfUrl] = useState<string | null>(null);
	const [currentTool, setCurrentTool] = useState<AnnotationType>("highlight");
	const [annotations, setAnnotations] = useState<Annotation[]>([]);
	const [isExporting, setIsExporting] = useState(false);

	const handleFileUpload = (file: File) => {
		setFile(file);
		const url = URL.createObjectURL(file);
		setPdfUrl(url);
	};

	const handleToolChange = (tool: AnnotationType) => {
		setCurrentTool(tool);
	};

	const addAnnotation = (annotation: Annotation) => {
		setAnnotations([...annotations, annotation]);
	};

	const exportPdf = async () => {
		if (!file) return;

		setIsExporting(true);

		try {
			// In a real implementation, we would use a PDF library to apply annotations
			// and return a modified PDF. For this example, we'll simulate the export.

			// Simulating processing time
			await new Promise((resolve) => setTimeout(resolve, 1500));

			// Create a download link for the original PDF (in a real app, this would be the annotated PDF)
			const link = document.createElement("a");
			link.href = pdfUrl as string;
			link.download = `annotated-${file.name}`;
			link.click();
		} catch (error) {
			console.error("Error exporting PDF:", error);
		} finally {
			setIsExporting(false);
		}
	};

	return (
		<div className="flex flex-col min-h-[calc(100vh-8rem)]">
			{!file ? (
				<div className="flex-1 flex flex-col items-center justify-center p-8">
					<div className="max-w-3xl w-full text-center mb-10">
						<h1 className="text-3xl md:text-4xl font-bold text-jacarta-700 dark:text-white mb-4">Sign & Annotate Documents with Ease</h1>
						<p className="text-lg text-jacarta-500 dark:text-jacarta-300 mb-8">Upload your PDF, add annotations, signatures, and comments, then export your document in seconds.</p>
					</div>
					<DocumentUploader onFileUpload={handleFileUpload} />

					<div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
						<div className="flex flex-col items-center text-center p-6 bg-white dark:bg-jacarta-700 rounded-2xl shadow-md">
							<div className="w-12 h-12 bg-orange-100 dark:bg-jacarta-600 rounded-full flex items-center justify-center mb-4">
								<FileText className="w-6 h-6 text-orange-500" />
							</div>
							<h3 className="text-lg font-bold text-jacarta-700 dark:text-white mb-2">Upload PDF</h3>
							<p className="text-sm text-jacarta-500 dark:text-jacarta-300">Drag & drop or select your PDF document to get started</p>
						</div>

						<div className="flex flex-col items-center text-center p-6 bg-white dark:bg-jacarta-700 rounded-2xl shadow-md">
							<div className="w-12 h-12 bg-orange-100 dark:bg-jacarta-600 rounded-full flex items-center justify-center mb-4">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="w-6 h-6 text-orange-500"
								>
									<path d="m3 15 5.12-5.12A3 3 0 0 1 10.24 9H13a2 2 0 1 1 0 4h-2.5m4-.68 4.17-4.89a1.88 1.88 0 0 1 2.92 2.36l-4.2 4.6a2 2 0 0 1-1.58.61h-1.5"></path>
								</svg>
							</div>
							<h3 className="text-lg font-bold text-jacarta-700 dark:text-white mb-2">Annotate & Sign</h3>
							<p className="text-sm text-jacarta-500 dark:text-jacarta-300">Add highlights, comments, and signatures to your document</p>
						</div>

						<div className="flex flex-col items-center text-center p-6 bg-white dark:bg-jacarta-700 rounded-2xl shadow-md">
							<div className="w-12 h-12 bg-orange-100 dark:bg-jacarta-600 rounded-full flex items-center justify-center mb-4">
								<Download className="w-6 h-6 text-orange-500" />
							</div>
							<h3 className="text-lg font-bold text-jacarta-700 dark:text-white mb-2">Export & Share</h3>
							<p className="text-sm text-jacarta-500 dark:text-jacarta-300">Download your annotated document or share it directly</p>
						</div>
					</div>
				</div>
			) : (
				<div className="flex-1 flex flex-col">
					<div className="bg-white dark:bg-jacarta-800 border-b border-jacarta-100 dark:border-jacarta-700 p-4">
						<div className="container mx-auto flex flex-wrap items-center justify-between gap-4">
							<div className="flex items-center gap-4">
								<Button
									variant="outline"
									onClick={() => {
										setFile(null);
										setPdfUrl(null);
										setAnnotations([]);
									}}
									className="text-jacarta-700 dark:text-white border-jacarta-100 dark:border-jacarta-600"
								>
									Back
								</Button>
								<div className="text-sm font-medium text-jacarta-700 dark:text-white truncate max-w-[200px] md:max-w-xs">{file.name}</div>
							</div>

							<Button onClick={exportPdf} disabled={isExporting} className="bg-orange-500 hover:bg-accent-dark text-white flex items-center gap-2">
								<Download size={16} />
								{isExporting ? "Exporting..." : "Export PDF"}
							</Button>
						</div>
					</div>

					<div className="flex-1 flex flex-col md:flex-row">
						<div className="w-full md:w-auto border-r border-jacarta-100 dark:border-jacarta-700 bg-white dark:bg-jacarta-800">
							<ToolBar currentTool={currentTool} onToolChange={handleToolChange} />
						</div>
						<div className="flex-1 overflow-auto bg-jacarta-50 dark:bg-jacarta-900 p-4">
							{pdfUrl && <DocumentViewer pdfUrl={pdfUrl} currentTool={currentTool} annotations={annotations} onAddAnnotation={addAnnotation} />}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
