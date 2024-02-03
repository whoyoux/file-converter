import loadFfmpeg from "@/lib/load-ffmpeg";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { useEffect, useState } from "react";

const useFfmpeg = () => {
	const [ffmpeg, setFfmpeg] = useState<FFmpeg | null>(null);
	const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);

	useEffect(() => {
		const load = async () => {
			setIsFFmpegLoaded(false);
			const ffmpegWasm = await loadFfmpeg();
			console.log("Loaded ffmpeg!");
			setFfmpeg(ffmpegWasm);
			setIsFFmpegLoaded(true);
		};

		load();
	}, []);

	return { ffmpeg, isFFmpegLoaded };
};

export default useFfmpeg;
