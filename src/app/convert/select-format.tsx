import { getFormatsThatCanConvertTo } from "@/lib/get-formats-that-file-can-convert-to";
import { useFilesStore } from "@/store/file-store";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const SelectFormat = ({ file }: { file: File }) => {
	const { files } = useFilesStore();
	const setFileConvertTo = (file: File, convertTo: string) => {
		const fileFound = files.find((fileInArray) => fileInArray.file === file);
		if (fileFound) fileFound.convertTo = convertTo;
		else console.error("File not found");
	};
	return (
		<Select onValueChange={(value) => setFileConvertTo(file, value)}>
			<SelectTrigger>
				<SelectValue placeholder="Select format convert to" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Formats</SelectLabel>
					{getFormatsThatCanConvertTo(file).map((format) => (
						<SelectItem key={format} value={format}>
							{format}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default SelectFormat;
