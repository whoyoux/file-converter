import { create } from "zustand";

export type FileToConvert = {
	file: File;
	convertTo: string;
	startedConverting: boolean;
	converted: boolean;
	progress: number;
};

type FileState = {
	files: FileToConvert[];
	addFile: (file: FileToConvert) => void;
	removeFile: (file: FileToConvert) => void;
};

export const useFilesStore = create<FileState>((set) => ({
	files: [],
	addFile: (file: FileToConvert) =>
		set((state) => ({ files: [...state.files, file] })),
	removeFile: (file: FileToConvert) =>
		set((state) => ({ files: state.files.filter((f) => f !== file) })),
}));
