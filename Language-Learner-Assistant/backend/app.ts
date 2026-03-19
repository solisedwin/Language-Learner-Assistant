import helmet from "helmet";
import "./envconfig.ts";
import express from "express";
import cors from "cors";
import ConversationRouter from "./routes/ConversationRoutes.ts";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(helmet());

// Database connection
try {
  async function connectDB() {
    const mongoURI = process.env.MONGO_DB_URI;
    if (!mongoURI) {
      throw new Error("Mongo URL is not set !");
    }
    const conn = await mongoose.connect(mongoURI);
    console.log(`~~~ Database connected: ${conn.connection.host}`);
  }
  connectDB();
} catch (error) {
  console.error("Error when connecting to MongoDb: ", error);
}

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

app.use("/api/converse", ConversationRouter);

app.listen(3000, () => {
  console.log("### Server is running on http://localhost:3000");
});
