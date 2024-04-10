import FormTemplate from '../components/common/FormTemplate';
import { useRegisterMutation } from '../api/endpoints/authApi';
import show from '../utils/toastNotifications';
import { useNavigate } from 'react-router-dom';
import AuthTemplate from '../components/common/AuthTemplate';

const inputs = [
	{
		id: 1,
		type: 'text',
		placeholder: 'Username',
		value: 'username',
	},
	{
		id: 2,
		type: 'email',
		placeholder: 'Email',
		value: 'email',
	},
	{
		id: 3,
		type: 'password',
		placeholder: 'Password',
		value: 'password',
	},
	{
		id: 4,
		type: 'password',
		placeholder: 'Retype Password',
		value: 'retypePassword',
	},
];

const Register = () => {
	const [register] = useRegisterMutation();
	const navigate = useNavigate();
	const submitHandler = (data) => {
		// eslint-disable-next-line no-unused-vars

		const { retypePassword, ...rest } = data;

		register(rest)
			.unwrap()
			.then((response) => {
				if (response.status === 'success') {
					show('User Registered Successfully', 'success');
				}
				setTimeout(() => {
					navigate('/login');
				}, 2000);
			})
			.catch((err) => {
				show(err.data.message, 'error');
			});
	};
	return (
		<div className="flex">
			<AuthTemplate title="JOIN US" />
			<FormTemplate formType="Register" inputs={inputs} submitHandler={submitHandler} />;
		</div>
	);
};

export default Register;
