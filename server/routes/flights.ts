import express from "express";
import fetch from "node-fetch";
import { airportCodes } from "../utils/airportCodes";

import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.get("/", async (req, res) => {
  const { source, destination, date } = req.query;

  if (!source || !destination || !date) {
    return res.status(400).json({ error: "Missing query parameters" });
  }

  const apiKey = process.env.SERPAPI_API_KEY;
  const sourceCode =
    airportCodes[(source as string).toLowerCase()] || source.toString().toUpperCase();
  const destCode =
    airportCodes[(destination as string).toLowerCase()] || destination.toString().toUpperCase();

  const url = `https://serpapi.com/search.json?engine=google_flights&type=2&departure_id=${sourceCode}&arrival_id=${destCode}&outbound_date=${date}&currency=USD&hl=en&api_key=${apiKey}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`SerpAPI error: ${response.statusText}`);
    }

    const data = (await response.json()) as { best_flights?: any[] }; // ✅ Type assertion
    res.json(data.best_flights || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
});

export default router;
