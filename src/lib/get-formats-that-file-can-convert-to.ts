const CONVERT_TO_OPTIONS_IMAGE = [
	"jpg",
	"png",
	"webp",
	"gif",
	"bmp",
	"tiff",
	"svg",
];
const CONVERT_TO_OPTIONS_VIDEO = [
	"mp4",
	"webm",
	"ogg",
	"avi",
	"flv",
	"mov",
	"wmv",
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
	} else {
		return [];
	}
};
