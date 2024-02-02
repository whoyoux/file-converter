export const siteConfig = {
	name: "File Converter",
	description:
		"Do you wanna safely convert your files? You are in the right place! We support a lot of formats, such as: JPG, PNG, GIF, MP4, MP3, WAV, AVI, MOV, and many others! We are the best online file converter!",
	keywords: [
		"file converter",
		"convert files",
		"file conversion",
		"jpg to png",
		"png to jpg",
		"jpg to gif",
		"gif to jpg",
		"png to gif",
		"gif to png",
		"mp4 to mp3",
		"mp3 to mp4",
		"wav to mp3",
		"mp3 to wav",
		"avi to mp4",
	],
	url:
		process.env.NODE_ENV === "development"
			? "http://localhost:3000"
			: "https://company-whx.vercel.app",
	ogImage: "",
	authors: [
		{
			name: "whoyoux",
			url: "https://github.com/whoyoux",
		},
	],
	creator: "whoyoux",
};
