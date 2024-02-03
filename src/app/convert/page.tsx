"use client";

import Dropzone, { FileRejection, useDropzone } from "react-dropzone";

import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { File, FileUp, Image, Trash2, Video } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import loadFfmpeg from "@/lib/load-ffmpeg";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toast } from "sonner";

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

const getFormatsThatCanConvertTo = (originalFile: File) => {
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

type FileInList = {
	file: File;
	convertTo: string;
	startedConverting: boolean;
	converted: boolean;
	progress: number;
};

const ConvertPage = () => {
	const [isFFmpegLoaded, setIsFFmpegLoaded] = useState(false);
	const [ffmpeg, setFfmpeg] = useState<FFmpeg | null>(null);
	const [files, setFiles] = useState<FileInList[]>([]);

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

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			if (acceptedFiles.length <= 0) return;

			const filesToAdd: FileInList[] = [];

			for (const file of acceptedFiles) {
				if (files.some((f) => f.file.name === file.name)) {
					toast.error(`File ${file.name} already exists`);
					return;
				}
				filesToAdd.push({
					file,
					convertTo: "",
					startedConverting: false,
					converted: false,
					progress: 0,
				});
			}

			setFiles((prevFiles) => [...prevFiles, ...filesToAdd]);
		},
		[files],
	);

	const { getRootProps, getInputProps, isDragActive, isDragReject } =
		useDropzone({
			accept: {
				"image/jpeg": [],
				"image/png": [],
				"video/mp4": [],
			},
			onDrop,
		});

	const willAccept = isDragActive && !isDragReject;
	const willReject = isDragActive && isDragReject;

	const removeFile = (file: File) => {
		setFiles(files.filter((f) => f.file !== file));
	};

	return (
		<main>
			<Container className="min-h-[60vh]">
				<div
					{...getRootProps()}
					className={cn(
						"w-full border-4 border-dashed rounded-lg flex items-center justify-center h-96 cursor-pointer",
						willAccept && "border-primary",
						willReject && "border-red-500",
					)}
				>
					<input {...getInputProps()} />
					{isDragActive ? (
						<>
							{willAccept && <p>Drop the files here ...</p>}
							{willReject && <p>Some files will be rejected</p>}
						</>
					) : (
						<div className="flex flex-col items-center justify-center gap-2">
							<FileUp size={48} />
							<p className="font-medium">
								Drag 'n' drop some files here, or click to select files
							</p>
						</div>
					)}
				</div>

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
						{/* <div className="flex flex-col gap-2 mt-10"> */}
						{files.length > 0 &&
							files.map((file) => (
								<TableRow key={`${file.file.name}-${file.file.size}`}>
									<TableCell className="">
										<div className="flex gap-2 items-center">
											{file.file.type.includes("image") ? (
												<Image />
											) : file.file.type.includes("video") ? (
												<Video />
											) : (
												<File />
											)}

											<h2 className="font-semibold truncate">
												{file.file.name}
											</h2>
										</div>
									</TableCell>

									<TableCell className="text-right items-center">
										<Select
											onValueChange={(value) => {
												const fileFound = files.find(
													(fileInArray) => fileInArray.file === file.file,
												);
												if (fileFound) fileFound.convertTo = value;
												else console.error("File not found");
											}}
										>
											<SelectTrigger className="">
												<SelectValue placeholder="Select format convert to" />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectLabel>Formats</SelectLabel>
													{getFormatsThatCanConvertTo(file.file).map(
														(format) => (
															<SelectItem key={format} value={format}>
																{format}
															</SelectItem>
														),
													)}
												</SelectGroup>
											</SelectContent>
										</Select>
									</TableCell>

									<TableCell className="text-right flex items-center justify-end gap-2">
										<Button>Convert</Button>
										<Button
											variant="destructive"
											size="icon"
											onClick={() => removeFile(file.file)}
										>
											<Trash2 />
										</Button>
									</TableCell>
								</TableRow>
							))}
						{/* </div> */}
					</TableBody>
				</Table>
			</Container>
		</main>
	);
};

{
	/* <Card
									className="flex flex-row items-center justify-between p-6 w-full"
									key={`${file.name}-${file.size}`}
								>
									<TableRow className="">
										<TableCell>
											<div className="flex gap-2 items-center">
												{file.type.includes("image") ? (
													<Image />
												) : file.type.includes("video") ? (
													<Video />
												) : (
													<File />
												)}

												<h2 className="font-semibold max-w-[200px] truncate">
													{file.name}
												</h2>
											</div>
										</TableCell>

										<TableCell>
											<Select>
												<SelectTrigger className="w-[200px] h-10">
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
										</TableCell>
										<TableCell>
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
								</Card> */
}

export default ConvertPage;
