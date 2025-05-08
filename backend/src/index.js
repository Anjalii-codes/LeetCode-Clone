import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.get('/', (req, res) => {
    res.send('Hello World welcome to leetcode clone ! 🔥');
})
app.use("/api/v1/auth",authRoutes)
app.listen(8080, () => {
    console.log(`Server is listening on port : ${8080}`);
});