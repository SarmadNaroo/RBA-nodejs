const User = require('../models/user.model');

const createOrganizationAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new organization admin user
        const newUser = new User({
            username,
            password,
            role: 'organizationadmin' // Fixed role for organization admins
        });

        await newUser.save();

        res.status(201).json({ message: 'Organization admin created successfully', user: {
            id: newUser._id,
            username: newUser.username,
            role: newUser.role,
        } });
    } catch (error) {
        console.error('Error creating organization admin:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { createOrganizationAdmin };
