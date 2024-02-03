const CONVERT_TO_OPTIONS_IMAGE = [
	"jpg",
	"jpeg",
	"png",
	"gif",
	"bmp",
	"webp",
	"ico",
	"tif",
	"tiff",
	"svg",
	"raw",
	"tga",
];
const CONVERT_TO_OPTIONS_VIDEO = [
	"mp4",
	"m4v",
	"mp4v",
	"avi",
	"mov",
	"wmv",
	"mkv",
	"flv",
	"ogv",
	"webm",
	"hevc",
];

const CONVERT_TO_OPTIONS_AUDIO = [
	"mp3",
	"wav",
	"ogg",
	"aac",
	"wma",
	"flac",
	"m4a",
];

export const getFormatsThatCanConvertTo = (originalFile: File) => {
	if (originalFile.type.includes("image")) {
		return CONVERT_TO_OPTIONS_IMAGE.filter(
			(format) => format !== originalFile.type.split("/")[1],
		);
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else if (originalFile.type.includes("video")) {
		return CONVERT_TO_OPTIONS_VIDEO.filter(
			(format) => format !== originalFile.type.split("/")[1],
		);
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else if (originalFile.type.includes("audio")) {
		return CONVERT_TO_OPTIONS_AUDIO.filter(
			(format) => format !== originalFile.type.split("/")[1],
		);
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else {
		return [];
	}
};
