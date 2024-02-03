import { File, Image, Video } from "lucide-react";

const GetProperIconForAFile = ({ file }: { file: File }) => {
	if (file.type.includes("image")) return <Image />;
	if (file.type.includes("video")) return <Video />;
	return <File />;
};

export default GetProperIconForAFile;
