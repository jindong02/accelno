import filetypeicon from '../../../assets/dashboard/icons/filetype.svg';

const FileType = () => {
	return (
		<div className=" flex justify-center space-x-6 items-center pt-20">
			<div className=" flex flex-col space-y-3">
				<div className="flex justify-center items-center w-[160px] h-[90px] border-2 border-[#7F9FE5] shadow-2xl rounded-md">
					<img src={filetypeicon} alt="" className="w-14" />
				</div>
				<span className="font-bold text-xl text-center">.XCXL</span>
			</div>
			<span> OR </span>
			<div className=" flex flex-col space-y-3">
				<div className="flex justify-center items-center w-[160px] h-[90px] border-2 border-[#7F9FE5] shadow-2xl rounded-md">
					<img src={filetypeicon} alt="" className="w-14" />
				</div>
				<span className="font-bold text-xl text-center ">.XCXL</span>
			</div>
		</div>
	);
};

export default FileType;
