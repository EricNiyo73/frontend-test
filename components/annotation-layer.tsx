"use client";

import type { Annotation } from "@/lib/types";
import { MessageSquare } from "lucide-react";

interface AnnotationLayerProps {
	annotations: Annotation[];
	scale: number;
}

export default function AnnotationLayer({ annotations, scale }: AnnotationLayerProps) {
	return (
		<div className="absolute top-0 left-0 w-full h-full pointer-events-none">
			{annotations.map((annotation, index) => {
				const x = annotation.position.x * scale;
				const y = annotation.position.y * scale;

				switch (annotation.type) {
					case "highlight":
						return (
							<div
								key={index}
								className="absolute"
								style={{
									left: x,
									top: y,
									backgroundColor: annotation.color,
									width: "100px",
									height: "20px",
								}}
							/>
						);
					case "underline":
						return (
							<div
								key={index}
								className="absolute"
								style={{
									left: x,
									top: y + 20,
									borderBottom: `2px solid ${annotation.color}`,
									width: "100px",
								}}
							/>
						);
					case "comment":
						return (
							<div
								key={index}
								className="absolute flex items-center justify-center bg-accent-lighter rounded-full w-6 h-6"
								style={{
									left: x - 12,
									top: y - 12,
									pointerEvents: "auto",
								}}
								title={annotation.content}
							>
								<MessageSquare size={14} className="text-white" />
							</div>
						);
					case "signature":
						return (
							<div
								key={index}
								className="absolute border border-dashed border-jacarta-400 p-2 bg-white/50"
								style={{
									left: x,
									top: y,
									pointerEvents: "auto",
								}}
							>
								<div className="text-sm italic text-jacarta-600">Signature</div>
							</div>
						);
					default:
						return null;
				}
			})}
		</div>
	);
}
