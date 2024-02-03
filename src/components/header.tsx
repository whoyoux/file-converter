import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import { ThemeDropdown } from "./theme-dropdown";

const Header = () => {
	return (
		<header className="w-full min-w-0 px-4 md:px-8 xl:px-12 border-b flex items-center justify-between">
			<Link href="/">
				<h1 className="py-4 md:py-6 text-2xl font-semibold">File converter</h1>
			</Link>
			<div className="flex items-center gap-2 md:gap-4">
				<Link href="/convert">
					<Button>Convert now</Button>
				</Link>
				<ThemeDropdown />
				<Link
					href="https://github.com/whoyoux/file-converter"
					target="_blank"
					referrerPolicy="no-referrer"
				>
					<Button variant="outline" size="icon">
						<Github className="h-[1.2rem] w-[1.2rem]" />
					</Button>
				</Link>
			</div>
		</header>
	);
};

export default Header;
