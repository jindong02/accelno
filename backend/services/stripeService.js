const Stripe = require('stripe');
const STRIPE_API_KEY = process.env.STRIPE_API_KEY;
const stripe = new Stripe(STRIPE_API_KEY);

const createSubscription = async (clientData) => {
	// create a stripe customer
	const customer = await stripe.customers.create({
		email: clientData.email,
		name: clientData.username,
	});

	// attach the payment method to the customer
	await stripe.paymentMethods.attach(clientData.paymentMethodId, {
		customer: customer.id,
	});

	// set the payment method as the customer's default payment method
	await stripe.customers.update(customer.id, {
		invoice_settings: {
			default_payment_method: clientData.paymentMethodId,
		},
	});

	// get the price id from the client data
	const priceId = clientData.priceId;

	// create a subscription
	const subscription = await stripe.subscriptions.create({
		customer: customer.id,
		items: [{ price: priceId }],
		payment_settings: {
			save_default_payment_method: 'on_subscription',
		},
		expand: ['latest_invoice.payment_intent'],
	});

	// return the client secret and subscription id
	return {
		clientSecret: subscription.latest_invoice.payment_intent.client_secret,
		subscriptionId: subscription.id,
		status: subscription.status,
		customerId: customer.id,
		subscriptionExpiry: subscription.current_period_end,
	};
};

const updateSubscription = async (clientData) => {
	const updatedSubscription = await stripe.subscriptions.update(clientData.subscriptionId, { items: [{ price: clientData.priceId }] });

	return updatedSubscription;
};

const cancelSubscription = async (clientData) => {
	const canceledSubscription = await stripe.subscriptions.del(clientData.subscriptionId);

	return canceledSubscription;
};

module.exports = { createSubscription, updateSubscription, cancelSubscription };
