import { cn } from "@/lib/utils";

const Container = ({
	children,
	className,
}: { children: React.ReactNode; className?: string }) => {
	return (
		<section
			className={cn("w-full mx-auto max-w-screen-lg px-4 mt-20", className)}
		>
			{children}
		</section>
	);
};

export default Container;
