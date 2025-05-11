const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ 
                success: false,
                error: 'User already exists' 
            });
        }

        // Create new user (role defaults to 'tourist' if not provided)
        user = new User({
            name,
            email,
            password,
            role: role || 'tourist'
        });

        // Save user (password hashing happens in pre-save hook)
        await user.save();

        // Generate token
        const token = user.generateAuthToken();

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ 
                success: false,
                error: 'Invalid credentials' 
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false,
                error: 'Invalid credentials' 
            });
        }

        // Generate token
        const token = user.generateAuthToken();

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};

// @desc    Get current user
// @route   GET /api/auth/user
// @access  Private
exports.getUser = async (req, res) => {
    try {
        res.json({
            success: true,
            data: req.user
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
};