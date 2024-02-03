import { Button } from "@/components/ui/button";

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

import GetProperIconForAFile from "@/app/convert/get-proper-icon-for-file";
import useFfmpeg from "@/hooks/use-ffmpeg";
import { convertFile } from "@/lib/convert-file";
import { FileToConvert, useFilesStore } from "@/store/file-store";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { useState } from "react";
import SelectFormat from "./select-format";

const FilesTable = () => {
	const { files, removeFile } = useFilesStore();
	const { ffmpeg, isFFmpegLoaded } = useFfmpeg();

	return (
		<Table>
			<TableCaption>Your files</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="max-w-[200px]">Name</TableHead>
					<TableHead className="text-right">Format</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{files.length > 0 &&
					files.map((file) => (
						<FileTableRow
							file={file}
							removeFile={removeFile}
							ffmpeg={ffmpeg}
							key={`${file.file.name}-${file.file.size}`}
						/>
					))}
			</TableBody>
		</Table>
	);
};

type FileTableRowProps = {
	file: FileToConvert;
	removeFile: (file: FileToConvert) => void;
	ffmpeg: FFmpeg | null;
};

const FileTableRow = ({ file, removeFile, ffmpeg }: FileTableRowProps) => {
	const [isConverting, setConverting] = useState(false);

	const download = ({ url, fileName }: { url: string; fileName: string }) => {
		const a = document.createElement("a");
		a.style.display = "none";
		a.href = url;
		a.download = fileName;
		document.body.appendChild(a);
		a.click();
		window.URL.revokeObjectURL(url);
	};

	const convert = async () => {
		console.log("Converting file...");
		if (!ffmpeg) return;
		setConverting(true);
		try {
			const res = await convertFile({
				fileObj: file,
				ffmpeg,
			});
			console.log("File converted successfully!");
			console.log(res.url);
			download({
				url: res.url,
				fileName: res.convertedFileName,
			});
		} catch (err) {
			console.error("Error converting file", err);
		} finally {
			setConverting(false);
		}
	};
	return (
		<TableRow>
			<TableCell className="max-w-[200px]">
				<div className="flex gap-2 items-center">
					<GetProperIconForAFile file={file.file} />

					<h2 className="font-semibold truncate">{file.file.name}</h2>
				</div>
			</TableCell>

			<TableCell className="text-right items-center">
				<SelectFormat file={file.file} />
			</TableCell>

			<TableCell className="text-right flex items-center justify-end gap-2">
				<Button onClick={convert}>Convert</Button>
				<Button
					variant="destructive"
					size="icon"
					onClick={() => removeFile(file)}
					disabled={isConverting || !ffmpeg}
				>
					<Trash2 />
				</Button>
			</TableCell>
		</TableRow>
	);
};

export default FilesTable;
