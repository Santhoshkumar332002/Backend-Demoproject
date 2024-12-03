// import express, { Request, Response } from "express";
// import dotenv from "dotenv";
// // import Queue from "bullmq";
// import authRoutes from "./routes/authRoutes";
// import connectDB from "../src/config/db";
// import path from "path";
// import productRoutes from "./routes/productRoutes";
// // import { sendEmail } from "./models/emailServer";
// import { verifyToken } from "./utils/jwtUtils";
// // import scheduleEmailJob from './cron/cronJob';
// import cors from "cors";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors({
//   origin: 'http://localhost:5173', 
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], 
//   credentials: true 
// }));

// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "*****" : "Not set");

// // const emailQueue = new Queue("email-queue", {
// //   redis: {
// //     host: process.env.REDIS_HOST || "127.0.0.1",
// //     port: parseInt(process.env.REDIS_PORT as string, 10) || 6379,
// //   },
// // });

// // emailQueue.process(async (job) => {
// //   const { to, subject, product, attachmentFilePaths } = job.data;
// //   try {
// //     await sendEmail(to, subject, product, attachmentFilePaths);
// //     console.log(`Email sent to ${to}`);
// //   } catch (error) {
// //     console.error(`Failed to send email to ${to}:`, error);
// //   }
// // });

// connectDB();


// app.get("/", (req: Request, res: Response) => {
//   res.send("Hello, world!");
// });

// //api
// app.use(express.json());
// app.use("/api/auth", authRoutes);
// app.use("/uploads", express.static(path.join(__dirname, "../../uploads")));
// app.use("/api/products", verifyToken, productRoutes);

// // scheduleEmailJob();

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


import express, { Request, Response } from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import connectDB from "../src/config/db";
import path from "path";
import productRoutes from "./routes/productRoutes";
import { verifyToken } from "./utils/jwtUtils";
import cors from "cors";
// import scheduleEmailJob from './cron/cronJob';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true 
}));

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "*****" : "Not set");

// Ensure the database connection
connectDB();

// Define the static files path
const uploadsPath = path.join(__dirname, "../uploads");
console.log("Uploads path:", uploadsPath);  // Log the uploads path

// Serve static files
app.use("/uploads", express.static(uploadsPath));

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, world!");
});

// API routes
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", verifyToken, productRoutes);

// scheduleEmailJob();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
