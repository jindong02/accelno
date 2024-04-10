const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const generateToken = require('../../utils/generateToken.js');

// @desc Register a new user
// @route POST /api/v1/registeruser
// @access Public
// CHECKS IF USER EXISTS, IF NOT, CREATES USER

const registerUserController = asyncHandler(async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const checkUser = await prisma.user.findFirst({
			where: {
				OR: [{ email }, { username }],
			},
		});
		if (checkUser) {
			res.status(400).json({ message: 'User already exists' });
		} else {
			const hashedPassword = await bcrypt.hash(password, 10);
			const addUser = await prisma.user.create({
				data: {
					username,
					email,
					password: hashedPassword,
				},
			});
			res.status(201).json({ message: 'User created', status: 'success' });
		}
	} catch (err) {
		res.status(500).json({ message: 'Internal server error', error: err.message });
	}
});

// @desc Login an existing user
// @route POST /api/v1/loginuser
// @access Public
// CHECKS IF USER EXISTS, IF SO, CHECKS PASSWORD, IF CORRECT, GENERATES TOKEN AND SENDS TO CLIENT AS COOKIE

const loginUserController = asyncHandler(async (req, res) => {
	const { username, password } = req.body;
	try {
		const checkUser = await prisma.user.findFirst({
			where: {
				username,
			},
		});
		if (!checkUser) {
			res.status(400).json({ message: 'User does not exist' });
		} else {
			const checkPassword = await bcrypt.compare(password, checkUser.password);
			if (!checkPassword) {
				res.status(400).json({ message: 'Username or Pasword Incorrect' });
			} else {
				// util function to generate token and send to client
				generateToken(res, username);
				const token = res.token;
				// check if the user has active subscription and send it to client
				const isActive = checkUser.stripe_subscription_status === 'active' ? true : false;
				res.status(200).json({ message: 'Logged in', status: 'success', token, isActive });
			}
		}
	} catch (err) {
		res.status(500).json({ message: 'Internal server error', error: err.message });
	}
});

module.exports = { registerUserController, loginUserController };
