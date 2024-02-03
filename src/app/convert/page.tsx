"use client";

import Container from "@/components/container";

import useFfmpeg from "@/hooks/use-ffmpeg";

import { Dropzone } from "./dropzone";
import FilesTable from "./files-table";

const ConvertPage = () => {
	const { ffmpeg, isFFmpegLoaded } = useFfmpeg();

	return (
		<main>
			<Container className="min-h-[60vh]">
				<Dropzone />
				<FilesTable />
			</Container>
		</main>
	);
};

export default ConvertPage;
