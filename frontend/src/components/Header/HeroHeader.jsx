import Button from '../common/Button';

const HeroHeader = () => {
	return (
		<div className="bg-black pt-12 custom-header-cover ">
			<div className="text-center  mt-28 space-y-2">
				<h2 className=" font-poppins text-transparent gradient-text text-5xl md:text-7xl font-normal text-red-800 py-2">
					Fast Financial Intelligence.
				</h2>
				<h3 className="font-grotesk text-5xl md:text-7xl text-white"> Scalable AI.</h3>
			</div>
			<div className="mt-14 space-x-3 mx-auto w-ful text-center">
				<Button textColor={'white'} title={'Get Started'} customClassName="gradient-button-bg" register={true} />
				<Button textColor={'black'} title={'Features'} customClassName="gradient-button-bg-2" />
			</div>
		</div>
	);
};

export default HeroHeader;
