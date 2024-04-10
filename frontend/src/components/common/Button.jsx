import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const Button = ({ title, textColor, customClassName, register }) => {
	const navigate = useNavigate();

	if (!customClassName) {
		return <button className={` text-${textColor} font-normal text-lg py-4 px-6  md:text-xl md:py-5 md:px-8 rounded-lg `}>{title}</button>;
	}
	return (
		<button
			onClick={() => {
				register && navigate('/register');
			}}
			className={` ${customClassName} text-${textColor} font-normal text-lg py-4 px-6  md:text-xl md:py-5 md:px-8 rounded-lg`}
		>
			{title}
		</button>
	);
};

export default Button;
