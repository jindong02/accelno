const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { createSubscription, updateSubscription, cancelSubscription } = require('../../services/stripeService.js');

// @desc Create a new subscription for a user
// @route POST /api/v1/createsubscription
// @access Private

const stripeSubscriptionController = asyncHandler(async (req, res) => {
	// get user data from req.user which is set by the protect middleware
	const user_data = req.user;
	const { email, username } = user_data;
	const { planId, paymentMethodId } = req.body;
	// check if the planId coming from user is valid by checking if it exists in the database
	// if not, send error
	const plan = await prisma.plan.findFirst({
		where: {
			id: parseInt(planId),
		},
	});
	if (!plan) {
		res.status(400).json({ message: 'Invalid plan' });
	} else {
		// Now based on the planId, we can get the priceId from the database that matches the priceId in Stripe dashboard
		const priceId = plan.price_id;

		// check if user already has a stripe customer id stored in the database
		// if not, create a new stripe customer
		const customer = await prisma.user.findFirst({
			where: {
				username: username,
			},
		});

		if (!customer.stripe_customer_id) {
			try {
				// create a new stripe customer and subscription for the user
				// get the client secret and subscription id to be used in the frontend
				const { clientSecret, subscriptionId, status, subscriptionExpiry, customerId } = await createSubscription({
					email,
					username,
					priceId,
					paymentMethodId,
				});

				const UpdatedExpiry = new Date(subscriptionExpiry * 1000);

				// update the user's subscription_id in the database as stripe_customer_id
				const updateUser = await prisma.user.update({
					where: {
						id: user_data.id,
					},
					data: {
						plan_id: planId,
						stripe_customer_id: customerId,
						stripe_subscription_status: status,
						stripe_subscription_id: subscriptionId,
						stripe_subscription_expiry: UpdatedExpiry,
					},
				});
				res.status(201).json({ clientSecret, status });
			} catch (error) {
				res.status(400).json({ message: error.message });
			}
		} else {
			// send back error if user already has a stripe_customer_id
			res.status(400).json({ message: 'User already has a subscription' });
		}
	}
});

// @desc Update subscription for a user
// @route POST /api/v1/updatesubscription
// @access Private

const stripeUpdateSubscriptionController = asyncHandler(async (req, res) => {
	// get user data from req.user which is set by the protect middleware
	const user_data = req.user;
	const { email, username } = user_data;
	// get new planId from the request body
	const { planId } = req.body;
	// check if the planId coming from user is valid by checking if it exists in the database
	// if not, send error
	const plan = await prisma.plan.findFirst({
		where: {
			id: parseInt(planId),
		},
	});
	if (!plan) {
		res.status(400).json({ message: 'Invalid plan' });
	} else {
		const priceId = plan.price_id;

		// get the user subscription id from the database

		const user = await prisma.user.findFirst({
			where: {
				username: username,
			},
		});
		const subscriptionId = user.stripe_customer_id;

		try {
			// update the subscription
			const newSubscription = await updateSubscription({ subscriptionId, priceId });

			res.status(201).json({ data: newSubscription, status: 'success' });
		} catch (error) {
			res.status(400).json({ message: error.message, status: 'failed' });
		}
	}
});

// @desc Cancel subscription for a user
// @route POST /api/v1/cancelsubscription
// @access Private

const stripeCancelSubscriptionController = asyncHandler(async (req, res) => {
	// get user data from req.user which is set by the protect middleware
	const user_data = req.user;
	const { username } = user_data;
	// get the user subscription id from the database
	const user = await prisma.user.findFirst({
		where: {
			username: username,
		},
	});
	const subscriptionId = user.stripe_customer_id;
	// cancel the subscription
	try {
		const canceledSubscription = await cancelSubscription({ subscriptionId });
		res.status(200).json({ data: canceledSubscription, status: 'success' });
	} catch (error) {
		res.status(400).json({ message: error.message, status: 'failed' });
	}
});

module.exports = { stripeSubscriptionController, stripeUpdateSubscriptionController, stripeCancelSubscriptionController };
