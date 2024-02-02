import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
	return (
		<section className="flex flex-col items-center py-20 md:py-40 text-center px-10 border-b">
			<h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl">
				Instant File Conversion At Your Fingertips
			</h1>
			<h2 className="mt-4 scroll-m-20 pb-2 text-2xl font-semibold tracking-tight text-muted-foreground">
				Convert documents, images, audio, and video files securely on your
				device, anytime, anywhere - even offline
			</h2>
			<Button size="lg" className="mt-10">
				Convert Now
			</Button>
			<Link href="#supported_formats">
				<Button variant="link">See Supported Formats</Button>
			</Link>
		</section>
	);
};

export default Hero;
