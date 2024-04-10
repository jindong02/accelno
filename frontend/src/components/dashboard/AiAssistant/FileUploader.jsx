import { useDropzone } from 'react-dropzone';
import fileIcon from './../../../assets/dashboard/icons/file.svg';

const FileUploader = () => {
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

	const files = acceptedFiles.map((file) => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	));

	return (
		<div className="flex flex-col space-y-4 pt-3">
			<div className="w-10/12 mx-auto bg-searchbarGrey text-white px-6 py-3 text-sm font-poppins rounded-md">Ticker</div>
			<div className="border-dashed border-4 border-primaryGrey w-[260px] mx-auto ">
				<div {...getRootProps({ className: 'dropzone' })}>
					<input {...getInputProps()} />
					<div className="flex flex-col justify-center items-center space-y-4 text-center p-3">
						<img src={fileIcon} />
						<p className=" font-semibold">
							Drag & drop file or <span className="text-primaryGreen cursor-pointer">browse media on your device</span>
						</p>
					</div>
				</div>
			</div>
			<span className="text-xs mx-auto list-none">{files}</span>
		</div>
	);
};

export default FileUploader;
