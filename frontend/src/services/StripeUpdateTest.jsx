import React from 'react';
import axios from 'axios';
const StripeUpdateTest = () => {
	const handleSubmit = async () => {
		axios
			.post(
				'http://localhost:3005/api/v1/updatesubscription',
				{
					planId: 6,
				},
				{ withCredentials: true }
			)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div>
			<button onClick={handleSubmit}>Update Payment</button>
		</div>
	);
};

export default StripeUpdateTest;
