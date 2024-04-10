import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Testimonial.css';
import memberOne from '../../../assets/images/member1.svg';
import memberTwo from '../../../assets/images/member2.svg';
import memberThree from '../../../assets/images/member3.svg';
import memberFour from '../../../assets/images/member4.svg';
import memberFive from '../../../assets/images/member5.svg';

const Testimonials = () => {
	// Generate an array of six random image URLs
	const images = [memberOne, memberTwo, memberThree, memberFour, memberFive];

	const settings = {
		dots: true,
		centerMode: true,
		centerPadding: '80px',
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		initialSlide: 0,
		autoplay: true,
		autoplaySpeed: 3000,
		responsive: [
			{
				breakpoint: 990,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					dots: false,
					centerMode: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2,
					centerMode: true,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					centerMode: true,
				},
			},
		],
	};

	return (
		<div className="space-x-2 overflow-hidden">
			<Slider {...settings}>
				{images.map((image, index) => (
					<div key={index} className="h-full py-16 ">
						<img src={image} alt={`Image ${index + 1}`} className="h-32" />
					</div>
				))}
			</Slider>
		</div>
	);
};

export default Testimonials;
