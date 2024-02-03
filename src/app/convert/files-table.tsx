import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Trash2 } from "lucide-react";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { getFormatsThatCanConvertTo } from "@/lib/get-formats-that-file-can-convert-to";
import GetProperIconForAFile from "@/lib/get-proper-icon-for-file";
import { useFilesStore } from "@/store/file-store";

const FilesTable = () => {
	const { files, removeFile } = useFilesStore();

	return (
		<Table>
			<TableCaption>Your files</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="">Name</TableHead>
					<TableHead className="text-right">Format</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{files.length > 0 &&
					files.map((file) => (
						<TableRow key={`${file.file.name}-${file.file.size}`}>
							<TableCell>
								<div className="flex gap-2 items-center">
									<GetProperIconForAFile file={file.file} />

									<h2 className="font-semibold truncate">{file.file.name}</h2>
								</div>
							</TableCell>

							<TableCell className="text-right items-center">
								<SelectFormat file={file.file} />
							</TableCell>

							<TableCell className="text-right flex items-center justify-end gap-2">
								<Button>Convert</Button>
								<Button
									variant="destructive"
									size="icon"
									onClick={() => removeFile(file)}
								>
									<Trash2 />
								</Button>
							</TableCell>
						</TableRow>
					))}
			</TableBody>
		</Table>
	);
};

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

export default FilesTable;
