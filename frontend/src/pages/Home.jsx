import HeroHeader from '../components/Header/HeroHeader';
import adidasLogo from '../assets/logos/adidas.svg';
import motogpLogo from '../assets/logos/motogp.svg';
import amazonLogo from '../assets/logos/amazon.svg';
import robinhoodLogo from '../assets/logos/robinhood.svg';
import Button from '../components/common/Button';
import Pricing from '../components/common/Pricing';
import Testimonials from '../components/common/Testimonial/Testimonials';
import investorLogo from '../assets/logos/investorLogo.png';

const clientLogo = [
	{
		id: 1,
		img: amazonLogo,
	},
	{
		id: 2,
		img: motogpLogo,
	},
	{
		id: 3,
		img: robinhoodLogo,
	},
	{
		id: 4,
		img: adidasLogo,
	},
];

const Home = () => {
	return (
		<>
			<HeroHeader />;
			<div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-7 lg:space-x-14">
				<h4 className="text-3xl font-medium font-poppins text-darkGrey">
					THEY <br />
					TRUST US
				</h4>
				{clientLogo.map((logo) => (
					<div key={logo.id} className="h-16 w-56  flex justify-center items-center shadow-2xl">
						<img src={logo.img} alt="logo" className="w-28 h-20 " />
					</div>
				))}
			</div>
			<div className="space-y-6 md:space-y-0   my-12 md:my-16 flex flex-col md:flex-row md:justify-center md:items-center md:space-x-8">
				<div className="space-y-4 px-6 py-8 max-w-xs mx-auto md:mx-0 md:max-w-xl md:py-20 md:px-24 shadow-2xl">
					<h5 className="font-medium text-2xl">About Us</h5>
					<p className="text-darkGrey">
						{' '}
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, a? Repellendus fuga vel, ut harum aut vero saepe? Omnis eum
						distinctio enim, non quae ducimus exercitationem provident blanditiis sed amet?
					</p>
					<Button textColor={'white'} title={'Get Started'} customClassName="gradient-button-bg" />
				</div>
				<div className="max-w-xs mx-auto md:mx-0 md:max-w-lg md:px-16 space-y-10">
					<div className="gradient-about-bg rounded text-6xl md:text-7xl text-white py-12 text-center font-poppins font-normal">
						Accelno
					</div>
					<p className="text-sm font-medium text-center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa a vitae ea illo</p>
				</div>
			</div>
			<div className="w-full py-6 px-8 md:px-20 gradient-about-bg">
				<h6 className="text-3xl font-bold font-poppins text-white"> Pricing </h6>
			</div>
			<div className="bg-lightGrey py-10 px-6 flex md:flex-row flex-col justify-center items-center md:space-x-7 md:space-y-0 space-y-4 ">
				<Pricing title="Basic" price="50" isDumb={true} />
				<Pricing title="Standard" price="79" isDumb={true} />
				<Pricing title="Professional" price="99" isDumb={true} />
			</div>
			<div className=" py-16 space-y-8">
				<h6 className="text-2xl md:text-3xl font-medium font-poppins text-darkGrey text-center"> What Our Members Say </h6>
				<p className="font-normal text-sm md:text-base text-darkGrey font-poppins text-center px-4 md:px-0 ">
					{' '}
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, sequi voluptate. <br /> In eius hic consectetur quaerat magnam
					unde iusto saepe neque molestiae, non eaque
				</p>
				<Testimonials />
			</div>
			<div className=" text-lg md:text-xl font-bold font-poppins py-16 px-6 md:px-20 bg-lightGrey">
				<span className="ml-2 md:ml-4">Accelno is a</span>
				<img src={investorLogo} alt="Morning Investor Logo" className="md:w-72 w-56" />
				<span className="ml-2 md:ml-4">Company</span>
			</div>
		</>
	);
};

export default Home;
