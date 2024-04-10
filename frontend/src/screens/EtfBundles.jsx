import StockTicker from '../components/dashboard/stockticker/StockTicker';
import smallCompanyImg from '../assets/dashboard/icons/small-company.svg';
import defaultBundleImg from '../assets/dashboard/icons/default-bundle.svg';
import Bundle from '../components/dashboard/bundles/Bundle';

const bundlesData = [
	{
		id: 1,
		img: smallCompanyImg,
		desc: 'Small companies growing quickly',
	},
	{
		id: 2,
		img: defaultBundleImg,
		title: 'Dividend Kings',
		desc: 'Small companies growing quickly',
	},
	{
		id: 3,
		img: defaultBundleImg,
		title: 'Emerging Bluechip',
		desc: 'Small companies growing quickly',
	},
	{
		id: 4,
		img: defaultBundleImg,
		title: 'Expanders',
		desc: 'Small companies growing quickly',
	},
	{
		id: 5,
		img: smallCompanyImg,
		desc: 'Small companies growing quickly',
	},
	{
		id: 6,
		img: defaultBundleImg,
		title: 'Cash Cows',
		desc: 'Small companies growing quickly',
	},
	{
		id: 7,
		img: defaultBundleImg,
		title: 'Dividend Kings',
		desc: 'Small companies growing quickly',
	},
	{
		id: 8,
		img: defaultBundleImg,
		title: 'Institutional Icon',
		desc: 'Small companies growing quickly',
	},
];

const EtfBundles = () => {
	return (
		<div className="bg-primarySilver">
			<StockTicker />
			<div className=" w-[1150px] mx-auto py-6">
				<div className="py-4 font-poppins">
					<h1 className="font-bold text-lg">ETF Bundles</h1>
					<p className="text-sm">Take a look at our professionally curated stock bundles for investment strategies</p>
				</div>
				<div className="flex flex-wrap p-10 bg-white shadow-lg rounded-lg justify-center items-center">
					{bundlesData.map((bundle) => (
						<Bundle key={bundle.id} bundleTitle={bundle.title} bundleImg={bundle.img} bundleDesc={bundle.desc} />
					))}
				</div>
			</div>
		</div>
	);
};

export default EtfBundles;
