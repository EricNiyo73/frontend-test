"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentUploaderProps {
	onFileUpload: (file: File) => void;
}

export default function DocumentUploader({ onFileUpload }: DocumentUploaderProps) {
	const [dragActive, setDragActive] = useState(false);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			if (acceptedFiles.length > 0) {
				const file = acceptedFiles[0];
				if (file.type === "application/pdf") {
					onFileUpload(file);
				} else {
					alert("Please upload a PDF file");
				}
			}
		},
		[onFileUpload]
	);

	const { getRootProps, getInputProps, open } = useDropzone({
		onDrop,
		accept: {
			"application/pdf": [".pdf"],
		},
		maxFiles: 1,
		noClick: true,
	});

	return (
		<div
			{...getRootProps()}
			className={`w-full max-w-xl border-2 border-dashed rounded-2lg p-12 text-center transition-colors ${
				dragActive ? "border-accent bg-orange-100 dark:bg-jacarta-700" : "border-jacarta-100 dark:border-jacarta-600"
			}`}
			onDragEnter={() => setDragActive(true)}
			onDragLeave={() => setDragActive(false)}
			onDragEnd={() => setDragActive(false)}
		>
			<input {...getInputProps()} />
			<div className="flex flex-col items-center gap-4">
				<div className="bg-orange-100 dark:bg-jacarta-700 p-4 rounded-full">
					<FileUp size={40} className="text-accent" />
				</div>
				<div className="space-y-2">
					<h3 className="text-xl font-medium text-jacarta-700 dark:text-white">Upload your document</h3>
					<p className="text-jacarta-500 dark:text-jacarta-300">Drag and drop your PDF file here, or click the button below</p>
				</div>
				<Button onClick={open} className="mt-2 bg-accent hover:bg-accent-dark text-white">
					Select PDF
				</Button>
				<p className="text-sm text-jacarta-400">Only PDF files are supported</p>
			</div>
		</div>
	);
}
