import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader';

const Passwords = () => {
	const [isLoading, setIsLoading] = useState(false);

	const schema = yup.object().shape({
		currentPassword: yup.string().required('*This is a required field'),
		newPassword: yup
			.string()
			.required('*This is a required field')
			.min(6, '*Password must be at least 6 characters')
			.notOneOf([yup.ref('currentPassword')], '*New password cannot be the same as old password'),
		confirmPassword: yup
			.string()
			.required('*This is a required field')
			.oneOf([yup.ref('newPassword'), null], '*Passwords must match'),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const firstInputUpdate = watch('currentPassword', '');

	const onSubmit = async (data) => {
		setIsLoading(true);

		// Simulating an API call or some asynchronous operation
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
	};

	const override = {
		display: 'block',
		margin: '60px auto',
		borderColor: '#2151C0',
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			{isLoading ? (
				<ClipLoader color="#fff" loading={isLoading} cssOverride={override} size={50} aria-label="Loading Spinner" data-testid="loader" />
			) : (
				<div className="flex flex-col">
					<div className="border-t border-[#A7A8AB] py-4 flex justify-start space-x-16 items-center">
						<h4 className="text-xs font-medium ">Current Password</h4>
						<input
							type="password"
							placeholder="Enter your old password"
							{...register('currentPassword')}
							className={`w-[400px] border border-[#A4A5AC] rounded-md py-1 px-3 text-sm ${
								errors['currentPassword'] ? 'border-red-600' : ''
							}`}
						/>
						{errors['currentPassword'] && <span className="text-xs font-medium text-red-700"> {errors['currentPassword'].message} </span>}
					</div>
					<div className=" py-4 flex justify-start space-x-16 items-center">
						<h4 className="text-xs font-medium ">New Password</h4>
						<input
							type="password"
							placeholder="Enter new password"
							{...register('newPassword')}
							className={`w-[400px] border border-[#A4A5AC] rounded-md py-1 px-3 text-sm ${errors['newPassword'] ? 'border-red-600' : ''}`}
						/>
						{errors['newPassword'] && <span className="text-xs font-medium text-red-700"> {errors['newPassword'].message} </span>}
					</div>
					<div className="py-4 flex justify-start space-x-16 items-center">
						<h4 className="text-xs font-medium ">Confirm Password</h4>
						<input
							type="password"
							placeholder="Confirm new password"
							{...register('confirmPassword')}
							className={`w-[400px] border border-[#A4A5AC] rounded-md py-1 px-3 text-sm ${
								errors['confirmPassword'] ? 'border-red-600' : ''
							}`}
						/>
						{errors['confirmPassword'] && <span className="text-xs font-medium text-red-700"> {errors['confirmPassword'].message} </span>}
					</div>
				</div>
			)}

			<div className="absolute bottom-6 right-8 flex gap-3 text-sm font-normal">
				<button className="border border-[#A7A8AB] py-2 px-4 rounded-md">Cancel</button>
				<input
					type="submit"
					disabled={!firstInputUpdate}
					value="Save"
					className={` ${
						firstInputUpdate ? 'bg-[#381EDA] text-white cursor-pointer' : 'bg-lightGrey text-yellow-50 cursor-not-allowed'
					}   py-2 px-4 rounded-md `}
				/>
			</div>
		</form>
	);
};

export default Passwords;
