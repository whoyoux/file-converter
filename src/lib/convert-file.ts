import { FileToConvert } from "@/store/file-store";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { toast } from "sonner";
import { removeFileExtension } from "./remove-file-extension";

export const convertFile = async ({
	fileObj,
	ffmpeg,
}: { fileObj: FileToConvert; ffmpeg: FFmpeg }) => {
	if (!fileObj.convertTo) {
		toast.error("No conversion type provided");
		throw new Error("No conversion type provided");
	}

	const convertedFileName = `${removeFileExtension({
		fileName: fileObj.file.name,
	})}.${fileObj.convertTo}`;

	console.log("Converting file", fileObj.file.name, "to", convertedFileName);

	await ffmpeg.writeFile(fileObj.file.name, await fetchFile(fileObj.file));

	const ffmpegCommand = ["-i", fileObj.file.name, convertedFileName];
	console.log(ffmpegCommand);

	const result = await ffmpeg.exec(ffmpegCommand);
	if (result === 0) {
		const convertedFile = await ffmpeg.readFile(convertedFileName);

		const data = new Uint8Array(convertedFile as ArrayBuffer);

		const blob = new Blob([data.buffer], {
			type: fileObj.file.type.split("/")[0],
		});

		const url = URL.createObjectURL(blob);
		return {
			url,
			convertedFileName,
		};
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else {
		throw new Error("Failed to convert file");
	}
};
