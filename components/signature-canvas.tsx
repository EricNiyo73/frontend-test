"use client";

import type React from "react";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

interface SignatureCanvasProps {
	onSave: (signatureData: string) => void;
	onCancel: () => void;
}

export default function SignatureCanvas({ onSave, onCancel }: SignatureCanvasProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isDrawing, setIsDrawing] = useState(false);
	const [lastX, setLastX] = useState(0);
	const [lastY, setLastY] = useState(0);

	const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		setIsDrawing(true);
		setLastX(x);
		setLastY(y);
	};

	const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
		if (!isDrawing) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		ctx.beginPath();
		ctx.moveTo(lastX, lastY);
		ctx.lineTo(x, y);
		ctx.strokeStyle = "#000";
		ctx.lineWidth = 2;
		ctx.stroke();

		setLastX(x);
		setLastY(y);
	};

	const endDrawing = () => {
		setIsDrawing(false);
	};

	const clearCanvas = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		ctx.clearRect(0, 0, canvas.width, canvas.height);
	};

	const saveSignature = () => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const signatureData = canvas.toDataURL("image/png");
		onSave(signatureData);
	};

	return (
		<div className="p-4 bg-white dark:bg-jacarta-800 rounded-lg shadow-lg">
			<h3 className="text-lg font-medium text-jacarta-700 dark:text-white mb-2">Draw your signature</h3>
			<div className="border border-jacarta-100 dark:border-jacarta-600 mb-4">
				<canvas ref={canvasRef} width={400} height={200} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={endDrawing} onMouseLeave={endDrawing} className="bg-white cursor-crosshair" />
			</div>
			<div className="flex justify-between">
				<Button variant="outline" onClick={clearCanvas} className="border-jacarta-100 dark:border-jacarta-600 text-jacarta-700 dark:text-white">
					Clear
				</Button>
				<div className="space-x-2">
					<Button variant="outline" onClick={onCancel} className="border-jacarta-100 dark:border-jacarta-600 text-jacarta-700 dark:text-white">
						Cancel
					</Button>
					<Button onClick={saveSignature} className="bg-accent-lighter hover:bg-accent-lighter-dark text-white">
						Save Signature
					</Button>
				</div>
			</div>
		</div>
	);
}
