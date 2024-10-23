// server.js
import express from 'express';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import { auth } from './firebase.js'; // Adjust Firebase import
import authRoutes from './routes/auth.js'; // Ensure correct import

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));

// Use authentication routes
app.use('/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
