import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	metadataBase: new URL(siteConfig.url),
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: siteConfig.keywords,
	authors: siteConfig.authors,
	creator: siteConfig.creator,
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable,
				)}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<Header />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
