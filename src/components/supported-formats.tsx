import Container from "@/components/container";
import { Card, CardHeader } from "@/components/ui/card";
import { Image, Music, Video } from "lucide-react";

const SUPPORTED_FORMATS = [
	{
		icon: <Video />,
		label: "MP4",
	},
	{
		icon: <Music />,
		label: "MP3",
	},
	{
		icon: <Image />,
		label: "PNG",
	},
	{
		icon: <Image />,
		label: "JPG",
	},
	{
		icon: <Image />,
		label: "GIF",
	},
	{
		icon: <Image />,
		label: "WEBP",
	},
];

const SupportedFormats = () => {
	return (
		<Container className="flex flex-col items-center gap-10">
			<h2 className="text-3xl font-semibold" id="supported_formats">
				Supported formats
			</h2>
			<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
				{SUPPORTED_FORMATS.map((format) => (
					<Format key={`format-${format.label}`} {...format} />
				))}
			</div>
		</Container>
	);
};

const Format = ({ icon, label }: { label: string; icon: React.ReactNode }) => {
	return (
		<Card>
			<CardHeader>
				<li className="flex items-center gap-2">
					<div>{icon}</div>
					<span className="text-xl font-medium">{label}</span>
				</li>
			</CardHeader>
		</Card>
	);
};

export default SupportedFormats;
