export const removeFileExtension = ({ fileName }: { fileName: string }) => {
	const lastDotIndex = fileName.lastIndexOf(".");
	if (lastDotIndex !== -1) {
		return fileName.slice(0, lastDotIndex);
	}
	return fileName;
};
