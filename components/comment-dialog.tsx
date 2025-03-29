"use client";

import type React from "react";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CommentDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onAddComment: (text: string) => void;
}

export default function CommentDialog({ isOpen, onClose, onAddComment }: CommentDialogProps) {
	const [commentText, setCommentText] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (commentText.trim()) {
			onAddComment(commentText);
			setCommentText("");
		}
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="sm:max-w-md bg-white dark:bg-jacarta-800 border-jacarta-100 dark:border-jacarta-700">
				<DialogHeader>
					<DialogTitle className="text-jacarta-700 dark:text-white">Add Comment</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<Textarea
							placeholder="Type your comment here..."
							value={commentText}
							onChange={(e) => setCommentText(e.target.value)}
							className="min-h-[100px] border-jacarta-100 dark:border-jacarta-600 bg-white dark:bg-jacarta-700 text-jacarta-700 dark:text-white"
						/>
					</div>
					<DialogFooter>
						<Button type="button" variant="outline" onClick={onClose} className="border-jacarta-100 dark:border-jacarta-600 text-jacarta-700 dark:text-white">
							Cancel
						</Button>
						<Button type="submit" disabled={!commentText.trim()} className="bg-accent-lighter hover:bg-accent-lighter-dark text-white">
							Add Comment
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}
