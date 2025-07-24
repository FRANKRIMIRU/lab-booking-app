import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'; // Adjust the path if needed
import { sendEmail } from '../utils/sendEmail.js';

const emailRouter = express.Router();

// TEST EMAIL ROUTE (still useful for basic testing)
emailRouter.post('/test-email', async (req, res) => {
  try {
    await sendEmail(
      'yourrealemail@gmail.com', // Replace with a real email
      'Test Email',
      '<h2>Hello from Lab Booking</h2><p>This is a test email.</p>'
    );
    res.json({ message: 'Email sent successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Email failed', error: err.message });
  }
});

// FORGOT PASSWORD ROUTE
emailRouter.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Generate token valid for 15 minutes
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    // Construct frontend reset link (replace URL with your frontend)
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    // Email content
    const html = `
      <h2>Password Reset</h2>
      <p>Hello ${user.name},</p>
      <p>You requested to reset your password. Click the link below to reset it:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
    `;

    await sendEmail(user.email, 'Reset your Lab Booking password', html);
    res.json({ message: 'Reset email sent' });
  } catch (err) {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
  }
});


// RESET PASSWORD
emailRouter.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = password;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});
export default emailRouter;
