"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { handleDarkMode } from "@/utils/handleDrakMode";

export default function Header() {
	return (
		<header className="sticky top-0 z-40 w-full border-b border-jacarta-100 bg-white dark:border-jacarta-700 dark:bg-jacarta-800">
			<div className="container">
				<div className="flex h-16 items-center justify-between">
					<Link href="/" className="flex items-center gap-2">
						<div className="flex items-center justify-center w-10 h-10 rounded-full bg-accent-lighter">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
								<path d="M18 6 7 17l-5-5" />
								<path d="m22 10-7.5 7.5L13 16" />
							</svg>
						</div>
						<span className="text-lg font-bold text-jacarta-700 dark:text-white">NEDocSign</span>
					</Link>

					<div className="flex items-center gap-4">
						<div className="pr-3">
							<button
								onClick={() => handleDarkMode()}
								className=" md:flex  cursor-pointer js-dark-mode-trigger group ml-2 flex h-10 w-10 items-center justify-center rounded-full border border-jacarta-100 bg-white transition-colors hover:border-transparent hover:bg-accent-lighter  dark:border-transparent dark:bg-white/[.15] dark:hover:bg-accent-lighter"
							>
								<Moon className="dark:hidden text-jacarta-700 fill-jacarta-700 w-4 group-hover:text-white group-hover:fill-white" />
								<Sun className="w-6 hidden dark:block dark:text-white" />
							</button>
						</div>

						<Button className="bg-accent-lighter hover:bg-accent-lighter-dark text-white">Sign Up Free</Button>
					</div>
				</div>
			</div>
		</header>
	);
}
