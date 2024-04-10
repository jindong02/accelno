const Bundle = ({ bundleImg, bundleTitle, bundleDesc }) => {
	return (
		<div className="shadow-lg font-poppins bg-white border-2 border-[#7F9FE5] px-1 py-4 m-4 h-[270px] w-[220px] space-y-2 rounded-md flex flex-col items-center text-center">
			<img src={bundleImg} alt="ETF bundle Picture" className="h-24" />
			{bundleTitle && <h1 className="text-lg font-bold text-darkGrey"> {bundleTitle} </h1>}
			<p className="text-sm"> {bundleDesc} </p>
			<button className="bg-dashboardBlue text-white p-2 rounded-md font-semibold"> Click to unlock </button>
		</div>
	);
};

export default Bundle;
