import Container from "./container";

import { Card, CardContent } from "@/components/ui/card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import {
	Facebook,
	Instagram,
	Linkedin,
	Slack,
	Twitch,
	Twitter,
} from "lucide-react";

const UsedBy = () => {
	return (
		<Container className="flex flex-col items-center gap-10">
			<h2 className="text-3xl font-semibold">Used by</h2>

			<UsedByCarousel />
		</Container>
	);
};

const USED_BY_LIST = [
	{
		icon: <Twitch size={32} />,
	},
	{
		icon: <Facebook size={32} />,
	},
	{
		icon: <Twitter size={32} />,
	},
	{
		icon: <Instagram size={32} />,
	},
	{
		icon: <Linkedin size={32} />,
	},
	{
		icon: <Slack size={32} />,
	},
];

const UsedByCarousel = () => {
	return (
		<div className="w-full flex flex-col items-center">
			<Carousel
				opts={{
					align: "start",
				}}
				className="w-full max-w-3xl mb-0"
			>
				<CarouselContent>
					{USED_BY_LIST.map((item, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						<CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
							<div className="p-1">
								<Card className="hover:text-primary">
									<CardContent className="flex aspect-square items-center justify-center p-6">
										<span className="text-3xl font-semibold ">{item.icon}</span>
									</CardContent>
								</Card>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			<span className="mt-0 text-sm text-muted-foreground">
				yes, its fake noway
			</span>
		</div>
	);
};

export default UsedBy;
