import Link from "next/link";
import { ThemeDropdown } from "./theme-dropdown";

const Header = () => {
	return (
		<header className="w-full min-w-0 px-4 md:px-8 xl:px-12 border-b flex items-center justify-between">
			<h1 className="py-4 md:py-6 text-2xl font-semibold">File converter</h1>
			<div className="flex items-center gap-2 md:gap-6">
				<Link
					href="https://github.com/whoyoux/file-converter"
					target="_blank"
					referrerPolicy="no-referrer"
				>
					source code
				</Link>
				<ThemeDropdown />
			</div>
		</header>
	);
};

export default Header;
