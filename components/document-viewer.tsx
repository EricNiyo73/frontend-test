"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import type { Annotation, AnnotationType } from "@/lib/types";
import { Loader2 } from "lucide-react";
import CommentDialog from "@/components/comment-dialog";

const PDFComponents = dynamic(() => import("@/components/pdf-components"), {
	ssr: false,
	loading: () => (
		<div className="flex items-center justify-center w-full h-40">
			<Loader2 className="w-8 h-8 animate-spin text-accent" />
			<span className="ml-2 text-jacarta-700 dark:text-white">Loading PDF viewer...</span>
		</div>
	),
});

interface DocumentViewerProps {
	pdfUrl: string;
	currentTool: AnnotationType;
	annotations: Annotation[];
	onAddAnnotation: (annotation: Annotation) => void;
}

export default function DocumentViewer({ pdfUrl, currentTool, annotations, onAddAnnotation }: DocumentViewerProps) {
	const [numPages, setNumPages] = useState<number | null>(null);
	const [pageNumber, setPageNumber] = useState<number>(1);
	const [scale, setScale] = useState<number>(1.2);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [showCommentDialog, setShowCommentDialog] = useState<boolean>(false);
	const [commentPosition, setCommentPosition] = useState({ x: 0, y: 0 });

	const containerRef = useRef<HTMLDivElement>(null);
	const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

	useEffect(() => {
		if (!pdfUrl) {
			console.error("No PDF URL provided to DocumentViewer");
		}
	}, [pdfUrl]);

	const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
		setNumPages(numPages);
		setIsLoading(false);
		pageRefs.current = Array(numPages).fill(null);
	};

	const handlePageClick = (e: React.MouseEvent, pageIndex: number) => {
		if (!containerRef.current || !pageRefs.current[pageIndex]) return;

		const pageRect = pageRefs.current[pageIndex]!.getBoundingClientRect();
		const x = e.clientX - pageRect.left;
		const y = e.clientY - pageRect.top;

		if (currentTool === "comment") {
			setCommentPosition({ x, y });
			setShowCommentDialog(true);
		} else if (currentTool === "signature") {
			onAddAnnotation({
				type: "signature",
				pageIndex,
				position: { x, y },
				content: "",
			});
		} else if (currentTool === "highlight" || currentTool === "underline") {
			onAddAnnotation({
				type: currentTool,
				pageIndex,
				position: { x, y },
				content: "Sample text",
				color: currentTool === "highlight" ? "rgba(255, 165, 0, 0.3)" : "rgba(255, 165, 0, 0.8)",
			});
		}
	};

	const handleAddComment = (text: string) => {
		onAddAnnotation({
			type: "comment",
			pageIndex: pageNumber - 1,
			position: commentPosition,
			content: text,
		});
		setShowCommentDialog(false);
	};

	const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
	const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.6));

	if (!pdfUrl) {
		return (
			<div className="flex items-center justify-center w-full h-40 bg-white dark:bg-jacarta-800 rounded-lg shadow-md p-4">
				<p className="text-jacarta-700 dark:text-white">No PDF document loaded. Please upload a document first.</p>
			</div>
		);
	}

	return (
		<div className="flex flex-col items-center w-full">
			{isLoading && (
				<div className="flex items-center justify-center w-full h-40">
					<Loader2 className="w-8 h-8 animate-spin text-accent" />
					<span className="ml-2 text-jacarta-700 dark:text-white">Loading document...</span>
				</div>
			)}

			<div className="flex justify-center gap-4 mb-4 w-full bg-white dark:bg-jacarta-800 p-3 rounded-lg shadow-sm">
				<button
					onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
					disabled={pageNumber <= 1 || !numPages}
					className="px-3 py-1 bg-jacarta-50 dark:bg-jacarta-700 rounded-md disabled:opacity-50 text-jacarta-700 dark:text-white"
				>
					Previous
				</button>
				<div className="flex items-center text-jacarta-700 dark:text-white">
					Page {pageNumber} of {numPages || "?"}
				</div>
				<button
					onClick={() => setPageNumber((prev) => Math.min(prev + 1, numPages || 1))}
					disabled={!numPages || pageNumber >= numPages}
					className="px-3 py-1 bg-jacarta-50 dark:bg-jacarta-700 rounded-md disabled:opacity-50 text-jacarta-700 dark:text-white"
				>
					Next
				</button>
				<button onClick={zoomOut} className="px-3 py-1 bg-jacarta-50 dark:bg-jacarta-700 rounded-md text-jacarta-700 dark:text-white">
					-
				</button>
				<div className="flex items-center text-jacarta-700 dark:text-white">{Math.round(scale * 100)}%</div>
				<button onClick={zoomIn} className="px-3 py-1 bg-jacarta-50 dark:bg-jacarta-700 rounded-md text-jacarta-700 dark:text-white">
					+
				</button>
			</div>

			<div ref={containerRef} className="w-full overflow-auto flex justify-center" style={{ maxHeight: "calc(100vh - 250px)" }}>
				<PDFComponents
					pdfUrl={pdfUrl}
					pageNumber={pageNumber}
					scale={scale}
					onDocumentLoadSuccess={onDocumentLoadSuccess}
					handlePageClick={handlePageClick}
					pageRefs={pageRefs}
					annotations={annotations.filter((a) => a.pageIndex === pageNumber - 1)}
				/>
			</div>

			{showCommentDialog && <CommentDialog isOpen={showCommentDialog} onClose={() => setShowCommentDialog(false)} onAddComment={handleAddComment} />}
		</div>
	);
}
