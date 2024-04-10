const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @desc Add user profile information
// @route POST /api/v1/userprofile
// @access Private
// ADDS USER PROFILE INFORMATION TO DATABASE

const addUserProfile = asyncHandler(async (req, res) => {
	const { username } = req.user;
	const { fullName, website, companyLogo, requireLogoOnBranding } = req.body;

	try {
		const addProfile = await prisma.user.update({
			where: {
				username,
			},
			data: {
				fullName,
				website,
				companyLogo,
				requireLogoOnBranding,
			},
		});
		res.status(201).json({ message: 'User profile added', status: 'success' });
	} catch (error) {
		res.status(500).json({ message: 'Internal server error', error: error.message });
	}
});

// @desc Get user profile information
// @route GET /api/v1/userprofile
// @access Private
// GETS USER PROFILE INFORMATION FROM DATABASE

const getUserProfile = asyncHandler(async (req, res) => {
	const { username } = req.user;
	try {
		const userProfile = await prisma.user.findFirst({
			where: {
				username,
			},
			select: {
				fullName: true,
				website: true,
				companyLogo: true,
				requireLogoOnBranding: true,
			},
		});
		res.status(201).json({ message: 'User profile retrieved', status: 'success', userProfile });
	} catch (error) {
		res.status(500).json({ message: 'Internal server error', error: error.message });
	}
});

module.exports = { addUserProfile, getUserProfile };
