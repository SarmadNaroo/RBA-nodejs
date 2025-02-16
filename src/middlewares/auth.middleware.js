const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    console.log('Authenticating User...');
    console.log('Request Headers:', req.headers);
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', verified); // Log the decoded token
        req.user = verified; // Attach user object to request
        next();
    } catch (err) {
        console.error('JWT Verification Error:', err.message);
        res.status(400).json({ message: 'Invalid Token' });
    }
};

module.exports = authenticate;
