const User = require('../models/user.model');

const getMe = async (req, res) => {
    console.log('Received req.user:', req.user); // Debugging
    try {
        if (!req.user || !req.user.userId) {
            return res.status(400).json({ message: 'User not found in token' });
        }

        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Role-specific route for superadmin
const superadminOnly = (req, res) => {
    res.json({ message: 'Superadmin access granted' });
};

// Role-specific route for organizationadmin
const organizationAdminOnly = (req, res) => {
    res.json({ message: 'Organization admin access granted' });
};

module.exports = { getMe, superadminOnly, organizationAdminOnly };
