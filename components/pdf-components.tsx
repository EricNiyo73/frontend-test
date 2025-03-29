"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import type { Annotation } from "@/lib/types";
import { Loader2 } from "lucide-react";
import AnnotationLayer from "@/components/annotation-layer";
import type { MutableRefObject } from "react";
import * as pdfjsLib from "pdfjs-dist";
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
// Set up the worker for PDF.js - use a public URL that's more reliable
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

interface PDFComponentsProps {
	pdfUrl: string;
	pageNumber: number;
	scale: number;
	onDocumentLoadSuccess: ({ numPages }: { numPages: number }) => void;
	handlePageClick: (e: React.MouseEvent, pageIndex: number) => void;
	pageRefs: MutableRefObject<(HTMLDivElement | null)[]>;
	annotations: Annotation[];
}

export default function PDFComponents({ pdfUrl, pageNumber, scale, onDocumentLoadSuccess, handlePageClick, pageRefs, annotations }: PDFComponentsProps) {
	const [validatedUrl, setValidatedUrl] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		// Validate the URL before passing it to the Document component
		try {
			if (!pdfUrl) {
				setError("No PDF URL provided");
				return;
			}

			// Check if it's a valid URL or a Blob URL
			if (pdfUrl.startsWith("blob:") || pdfUrl.startsWith("http")) {
				setValidatedUrl(pdfUrl);
				setError(null);
			} else {
				setError("Invalid PDF URL format");
			}
		} catch (err) {
			console.error("Error validating PDF URL:", err);
			setError("Failed to load PDF");
		}
	}, [pdfUrl]);

	if (error) {
		return (
			<div className="p-8 text-center bg-white dark:bg-jacarta-800 rounded-lg shadow-md">
				<p className="text-red mb-2">{error}</p>
				<p className="text-sm text-jacarta-500 dark:text-jacarta-300">Please try again or use a different PDF file.</p>
			</div>
		);
	}

	if (!validatedUrl) {
		return (
			<div className="flex items-center justify-center w-full h-40">
				<Loader2 className="w-8 h-8 animate-spin text-orange-500" />
				<span className="ml-2 text-jacarta-700 dark:text-white">Preparing document...</span>
			</div>
		);
	}

	return (
		<Document
			file={validatedUrl}
			onLoadSuccess={onDocumentLoadSuccess}
			loading={<Loader2 className="w-8 h-8 animate-spin text-orange-500" />}
			error={() => (
				<div className="p-4 text-center">
					<p className="text-red mb-2">Error loading PDF</p>
					<p className="text-sm text-jacarta-500 dark:text-jacarta-300">{error || "Please try again or use a different PDF file."}</p>
				</div>
			)}
		>
			<div className="relative">
				<Page
					pageNumber={pageNumber}
					scale={scale}
					renderTextLayer={false}
					renderAnnotationLayer={false}
					onClick={(e) => handlePageClick(e, pageNumber - 1)}
					inputRef={(ref) => {
						if (ref) {
							pageRefs.current[pageNumber - 1] = ref;
						}
					}}
					className="shadow-lg"
					error={() => (
						<div className="p-4 text-center">
							<p className="text-red">Error loading page {pageNumber}</p>
							<p className="text-sm text-jacarta-500 dark:text-jacarta-300">{error}</p>
						</div>
					)}
				/>
				<AnnotationLayer annotations={annotations} scale={scale} />
			</div>
		</Document>
	);
}
