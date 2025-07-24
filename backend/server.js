import express from 'express'
import { connectDB } from './config/db.js';
import cors from 'cors'
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv'
import testRouter from './routes/test.routes.js';
import adminRouter from './routes/adminRoutes.js';
import bookingsRouter from "./routes/bookings.routes.js";
import emailRouter from './routes/testEmail.routes.js';

dotenv.config();
const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({extended:false}))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/tests', testRouter)
app.use('/api/v1/admin',adminRouter)
app.use("/api/v1/bookings", bookingsRouter);
app.use("/api/email",emailRouter)
app.get("/", (req, res) => {
  res.send('server is ready')
})


app.listen(5000, () => {
  connectDB();
  console.log('server started at http://localhost:5000')
})