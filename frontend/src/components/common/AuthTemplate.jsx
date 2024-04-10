import bgImg from '../../assets/backgrounds/looperbg.svg';

const AuthTemplate = (props) => {
	return (
		<div className="h-screen w-full auth-container">
			<div className="auth-wrapper h-full w-full flex justify-center items-center font-poppins text-white text-lg font-normal">
				<h1>{props.title}</h1>
			</div>
		</div>
	);
};

export default AuthTemplate;
