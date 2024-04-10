const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET;

// Middleware to authenticate the user
const protect = async (req, res, next) => {
	let token;
	// check if user is logged in by checking for jwt cookie
	token = req.cookies.jwt;

	if (token) {
		// verify token
		const decoded = jwt.verify(token, secretKey);

		// check if user exists
		const user_data = await prisma.user.findFirst({
			where: {
				username: decoded.username,
			},
		});

		// if user does not exist, send error
		if (!user_data) {
			res.status(400).json({ message: 'Not authorized, token failed' });
		} else {
			// if user exists, set req.user to user data
			req.user = user_data;
			next();
		}
	} else {
		// if no token, send error
		res.status(401).json({ message: 'Not authorized, no token' });
	}
};

module.exports = { protect };
