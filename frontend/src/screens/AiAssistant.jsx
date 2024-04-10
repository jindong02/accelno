import FileType from '../components/dashboard/AiAssistant/FileType';
import FileUploader from '../components/dashboard/AiAssistant/FileUploader';
import Timeline from '../components/dashboard/AiAssistant/Timeline';

import StockTicker from '../components/dashboard/stockticker/StockTicker';

const AiAssistant = () => {
	return (
		<div className="custom-bg bg-black">
			<StockTicker />
			<div className="mt-20 w-[550px] mx-auto space-y-4 font-poppins flex flex-col justify-center items-center">
				<div className=" w-full h-[300px] bg-white border-2 border-[#CBD2E3] rounded-md">
					<div className="h-[260px] ">
						<FileType />
					</div>
					<div className="flex justify-center space-x-1 pt-1">
						<span className="h-3 w-3 rounded-full bg-black"></span>
						<span className="h-3 w-3 rounded-full bg-gray-400"></span>
						<span className="h-3 w-3 rounded-full bg-gray-400"></span>
						<span className="h-3 w-3 rounded-full bg-gray-400"></span>
					</div>
				</div>
				<button className=" text-white bg-[#0066FF] w-[500px] text-md font-semibold py-3 rounded-md">Generate </button>
			</div>
		</div>
	);
};

export default AiAssistant;
