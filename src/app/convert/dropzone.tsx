import { cn } from "@/lib/utils";
import { useFilesStore } from "@/store/file-store";
import { FileUp } from "lucide-react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

export const Dropzone = () => {
	const { files, addFile } = useFilesStore();

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			if (acceptedFiles.length <= 0) return;

			for (const file of acceptedFiles) {
				if (files.some((f) => f.file.name === file.name)) {
					toast.error(`File ${file.name} already exists`);
					return;
				}

				addFile({
					file,
					convertTo: "",
					startedConverting: false,
					converted: false,
					progress: 0,
				});
			}
		},
		[files, addFile],
	);
	const { getRootProps, getInputProps, isDragActive, isDragReject } =
		useDropzone({
			accept: {
				"image/*": [
					".jpg",
					".jpeg",
					".png",
					".gif",
					".bmp",
					".webp",
					".ico",
					".tif",
					".tiff",
					".raw",
					".tga",
				],
				"audio/*": [],
				"video/*": [],
			},
			onDrop,
		});

	const willAccept = isDragActive && !isDragReject;
	const willReject = isDragActive && isDragReject;
	return (
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
						Drag &apos;n&apos; drop some files here, or click to select files
					</p>
				</div>
			)}
		</div>
	);
};
