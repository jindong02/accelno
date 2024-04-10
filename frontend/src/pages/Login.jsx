import FormTemplate from '../components/common/FormTemplate';
import { useLoginMutation } from '../api/endpoints/authApi';
import show from '../utils/toastNotifications';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/slices/authSlice';
import AuthTemplate from '../components/common/AuthTemplate';
import { useNavigate } from 'react-router-dom';

const inputs = [
	{
		id: 1,
		type: 'text',
		placeholder: 'Username',
		value: 'username',
	},
	{
		id: 2,
		type: 'password',
		placeholder: 'Password',
		value: 'password',
	},
];

const Login = () => {
	const [login] = useLoginMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const submitHandler = (data) => {
		login(data)
			.then((response) => {
				console.log(response);
				if (response.data.status === 'success') {
					show('Logged In Successfully', 'success');
					dispatch(loginSuccess({ ...response.data }));
					response.data.isActive === true ? navigate('/dashboard') : navigate('/plans');
				}
			})
			.catch((err) => {
				show(err.data.message, 'error');
			});
	};

	return (
		<div className="flex">
			<AuthTemplate title="WELCOME BACK" />
			<FormTemplate formType="Login" inputs={inputs} submitHandler={submitHandler} />;
		</div>
	);
};

export default Login;
