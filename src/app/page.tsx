import Features from "@/components/features";
import Hero from "@/components/hero";
import SupportedFormats from "@/components/supported-formats";
import UsedBy from "@/components/used-by";

export default function Home() {
	return (
		<main>
			<Hero />
			<Features />
			<SupportedFormats />
			<UsedBy />
		</main>
	);
}
