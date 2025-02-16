const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// Register User
const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Ensure username and password are provided before enabling required: true again
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Prevent non-superadmin users from assigning admin roles
        const allowedRoles = ['user']; // Default allowed role
        if (req.user?.role === 'superadmin') {
            allowedRoles.push('organizationadmin'); // Superadmin can create org admins
        }

        if (role && !allowedRoles.includes(role)) {
            return res.status(403).json({ message: 'You are not authorized to assign this role' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({
            username,
            password,
            role: role || 'user', // Assign 'user' as the default role
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login User
const login = async (req, res) => {
    console.log(req.body);
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const logout = async (req, res) => {
    try {
        res.status(200).json({ message: 'User logged out' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { register, login, logout };
