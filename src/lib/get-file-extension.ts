const regex = /(?:\.([^.]+))?$/;

export const getFileExtension = ({ fileName }: { fileName: string }) => {
	const match = regex.exec(fileName);
	if (match?.[1]) {
		match[1];
	}
	return "";
};
