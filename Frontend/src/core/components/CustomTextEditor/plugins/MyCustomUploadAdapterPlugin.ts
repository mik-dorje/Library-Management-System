function uploadAdapter(loader: any) {
	return {
		upload: () => {
			return new Promise((resolve, reject) => {
				loader.file.then((file: any) => {
					const reader = new FileReader();
					reader.onloadend = () => {
						const dataUri = reader.result as string;
						console.log({ dataUri });
						resolve({ default: dataUri });
					};
					reader.readAsDataURL(file);
				});
			});
		},
	};
}

export function MyCustomUploadAdapterPlugin(editor: any) {
	const { plugins } = editor;
	plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
		return uploadAdapter(loader);
	};
}
