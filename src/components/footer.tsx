import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Footer = () => {
	return (
		<footer className="w-full border-t py-20 mt-20 md:px-8 xl:px-12 grid grid-cols-1 md:grid-cols-3">
			<div>
				<h2 className="text-xl font-medium">File converter</h2>
				<p className="text-sm text-muted-foreground">
					Empowering seamless file conversions, our platform ensures privacy,
					ease, and efficiency. Convert files securely at your convenience.
				</p>
			</div>
			<div />
			<div className="flex flex-col items-end justify-start">
				<Link href="/terms">
					<Button variant="link" className="text-muted-foreground">
						Terms of Service
					</Button>
				</Link>
				<Link href="/privacy">
					<Button variant="link" className="text-muted-foreground">
						Privacy Policy
					</Button>
				</Link>
				<Link href="/copyright">
					<Button variant="link" className="text-muted-foreground">
						Copyright Information
					</Button>
				</Link>
				<Link
					href="https://github.com/whoyoux/file-converter"
					target="_blank"
					referrerPolicy="no-referrer"
				>
					<Button variant="link">Source Code</Button>
				</Link>
			</div>
		</footer>
	);
};

export default Footer;
