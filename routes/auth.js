// routes/auth.js
import express from 'express';
import { auth } from '../firebase.js'; // Adjust as needed
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, username, password);
    const user = userCredential.user;
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, username, password);
    const user = userCredential.user;
    res.status(200).json({ message: 'User logged in', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Export the router as default
export default router;
