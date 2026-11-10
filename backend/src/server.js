import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import authRoutes from './modules/auth/auth.routes.js'
import membersRoutes from "./modules/members/members.routes.js"
import clientsRoutes from "./modules/clients/clients.routes.js"
import clientStoriesRoutes from "./modules/client-stories/clientstories.routes.js"
import servicesRoutes from "./modules/services/services.routes.js"
import lawFirmRoutes from "./modules/law-firm/law-firm.routes.js"
import blogsRoutes from "./modules/blogs/blogs.routes.js"
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { ENV } from "./config/env.js";
import { routeLogger } from "./utils/logging.utils.js";
import "./config/s3Client.js"

const app = express();
const PORT = ENV.PORT
const baseRoute = ENV.BASE_ROUTE
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(routeLogger);
app.use(baseRoute+"auth", authRoutes);
app.use(baseRoute+"members", membersRoutes);
app.use(baseRoute+"clients", clientsRoutes);
app.use(baseRoute+"client-stories", clientStoriesRoutes);
app.use(baseRoute+"services", servicesRoutes);
app.use(baseRoute+"law-firm",lawFirmRoutes);
app.use(baseRoute+"blogs",blogsRoutes);
app.get("/", (req, res) => {res.json({ message: "API is running" })});
app.use(errorHandler);
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();