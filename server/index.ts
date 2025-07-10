import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import flightsRouter from "./routes/flights.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/flights", flightsRouter);

app.get("/", (_, res) => {
  res.send("Travel Companion AI Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
