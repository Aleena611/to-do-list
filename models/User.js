// routes/auth.js (Firebase-based Authentication)
const express = require('express');
const router = express.Router();
const { firebase, db } = require('../firebase'); // Import Firebase and Firestore

// Register User (Firebase Authentication + Firestore)
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Create user with Firebase Authentication
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(username, password);
        const user = userCredential.user;

        // Save additional user details in Firestore
        await db.collection('users').doc(user.uid).set({
            username: username,
            createdAt: new Date().toISOString()
        });

        res.status(201).send(`User ${username} registered successfully`);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Login User (Firebase Authentication)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(username, password);
        const user = userCredential.user;
        res.status(200).send(`User ${username} logged in successfully`);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Logout User
router.post('/logout', (req, res) => {
    firebase.auth().signOut()
        .then(() => res.status(200).send('User logged out successfully'))
        .catch((error) => res.status(400).send(error.message));
});

module.exports = router;
