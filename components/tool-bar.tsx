"use client";

import type React from "react";

import type { AnnotationType } from "@/lib/types";
import { Highlighter, Underline, MessageSquare, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ToolBarProps {
	currentTool: AnnotationType;
	onToolChange: (tool: AnnotationType) => void;
}

interface Tool {
	id: AnnotationType;
	name: string;
	icon: React.ReactNode;
}

export default function ToolBar({ currentTool, onToolChange }: ToolBarProps) {
	const tools: Tool[] = [
		{ id: "highlight", name: "Highlight Text", icon: <Highlighter size={20} /> },
		{ id: "underline", name: "Underline Text", icon: <Underline size={20} /> },
		{ id: "comment", name: "Add Comment", icon: <MessageSquare size={20} /> },
		{ id: "signature", name: "Add Signature", icon: <PenTool size={20} /> },
	];

	return (
		<TooltipProvider>
			<div className="p-4 flex flex-row md:flex-col gap-3">
				{tools.map((tool) => (
					<Tooltip key={tool.id}>
						<TooltipTrigger asChild>
							<Button
								variant={currentTool === tool.id ? "default" : "ghost"}
								size="icon"
								onClick={() => onToolChange(tool.id)}
								className={`h-10 w-10 ${currentTool === tool.id ? "bg-accent-lighter hover:bg-accent-lighter-dark text-white" : "text-jacarta-700 dark:text-white"}`}
							>
								{tool.icon}
								<span className="sr-only">{tool.name}</span>
							</Button>
						</TooltipTrigger>
						<TooltipContent side="right">
							<p>{tool.name}</p>
						</TooltipContent>
					</Tooltip>
				))}
			</div>
		</TooltipProvider>
	);
}
