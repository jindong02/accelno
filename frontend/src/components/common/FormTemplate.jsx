import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types

const FormTemplate = ({ formType, inputs, submitHandler }) => {
	// initialing yup schema and registration object for react-hook-form
	// Same component renders for both login and register form with different schema and inputs
	// so we need to initialize schema and registration object based on formType
	// formType and inputs are passed as props from parent component
	// submitHandler is also passed as props from parent component and handles related logic

	let schema;
	let registration = {};

	if (formType === 'Register') {
		schema = yup.object().shape({
			username: yup.string().required(),
			email: yup.string().email().required(),
			password: yup.string().min(6).required(),
			retypePassword: yup
				.string()
				.oneOf([yup.ref('password'), null], 'Passwords must match')
				.min(6)
				.required(),
		});
	} else {
		schema = yup.object().shape({
			username: yup.string().required(),
			password: yup.string().min(6).required(),
		});
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	inputs.forEach((el) => {
		registration[el.value] = register(el.value);
	});

	return (
		<div className="h-screen w-full flex justify-center items-center ">
			<div className="  w-[450px] space-y-2 font-poppins">
				<form onSubmit={handleSubmit(submitHandler)} className="space-y-10 flex flex-col">
					{inputs.map((el) => (
						<input
							key={el.id}
							type={el.type}
							{...registration[el.value]}
							className={`px-6 py-3 text-darkGrey font-poppins bg-inputGrey placeholder-darkGrey text-sm rounded-md ${
								errors[el.value] ? 'border-red-500 border-2' : ''
							}`}
							placeholder={el.placeholder}
						/>
					))}

					<input
						type="submit"
						value={formType === 'Login' ? 'Login' : 'Register'}
						className="bg-darkNavy text-white  py-3 text-md font-semibold cursor-pointer rounded-md"
					/>
				</form>
				<p className="text-center text-xs font-normal">
					{formType === 'Login' ? 'Dont have an account? Register here' : 'Already have an account? Login here'}
				</p>
			</div>
		</div>
	);
};

export default FormTemplate;
