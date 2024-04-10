import githubIcon from '../../assets/social/github-icon.png';
import redditIcon from '../../assets/social/reddit-icon.png';
import twitterIcon from '../../assets/social/twitter-icon.png';
import discordIcon from '../../assets/social/discord-icon.png';
import { MdDehaze } from 'react-icons/md';

const menuLinks = [
	{
		id: 1,
		text: 'Services',
		path: '/services',
	},
	{
		id: 2,
		text: 'Solutions',
		path: '/solutions',
	},
	{
		id: 3,
		text: 'Roadmap',
		path: '/roadmap',
	},
	{
		id: 4,
		text: 'Whitepaper',
		path: '/whitepaper',
	},
];

const socialLinks = [
	{
		id: 1,
		img: githubIcon,
	},

	{
		id: 2,
		img: discordIcon,
	},
	{
		id: 3,
		img: redditIcon,
	},
	{
		id: 4,
		img: twitterIcon,
	},
];

const Navbar = () => {
	return (
		<div className="bg-black font-poppins py-8">
			<div className="md:max-w-6xl 2xl:max-w-7xl mx-auto flex justify-between items-center">
				<h1 className="font-normal text-4xl text-white">Accelno</h1>
				<div className="flex justify-center px-3 md:hidden text-3xl text-white">
					<span>
						{' '}
						<MdDehaze />
					</span>
				</div>

				<div className="hidden md:flex  space-x-6">
					{menuLinks.map((item) => (
						<span key={item.id} className=" text-lg font-normal text-white">
							{item.text}
						</span>
					))}
				</div>
				<div className="hidden space-x-4 md:flex">
					{socialLinks.map((item) => (
						<img key={item.id} src={item.img} alt="social" className="h-5" />
					))}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
