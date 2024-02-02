import {
	Award,
	FileText,
	Lock,
	MousePointer,
	WifiOff,
	Zap,
} from "lucide-react";
import Container from "./container";

const FEATURES_LIST = [
	{
		title: "Privacy First",
		description:
			"Convert files securely on your device with total privacy; no data is ever uploaded.",
		icon: <Lock />,
	},
	{
		title: "Offline Conversion",
		description:
			"Convert files anytime without an internet connection using our offline-capable PWA.",
		icon: <WifiOff />,
	},
	{
		title: "Wide Format Support",
		description:
			"Supports a broad range of file formats, including documents, images, audio, and video.",
		icon: <FileText />,
	},
	{
		title: "Fast Conversion",
		description:
			"Experience rapid file conversion, saving you time without sacrificing quality.",
		icon: <Zap />,
	},
	{
		title: "Easy to Use",
		description:
			"A user-friendly interface ensures easy file conversions in just a few clicks.",
		icon: <MousePointer />,
	},
	{
		title: "High-Quality Output",
		description:
			"Enjoy high-fidelity conversions with crystal-clear audio and sharp images.",
		icon: <Award />,
	},
];

const Features = () => {
	return (
		<Container className="flex flex-col items-center gap-10">
			<h2 className="text-3xl font-semibold">Features</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{FEATURES_LIST.map((feature) => (
					<Feature key={`feature-${feature.title}`} {...feature} />
				))}
			</div>
		</Container>
	);
};

type FeatureProps = {
	icon: React.ReactNode;
	title: string;
	description: string;
};

const Feature = ({ icon, title, description }: FeatureProps) => {
	return (
		<div className="px-4 py-4 rounded-lg border flex">
			<div className="px-2">{icon}</div>
			<div className="flex-1">
				<h2 className="text-xl font-semibold">{title}</h2>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</div>
	);
};

export default Features;
