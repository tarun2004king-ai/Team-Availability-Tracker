require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const User = require("./models/User");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

// ---- middleware ----
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

// ---- routes ----
app.use("/api/users", userRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

/**
 * Drops in three sample team members the first time the database is empty,
 * so the dashboard isn't blank on a fresh install. Matches the reference layout:
 * one senior dev, one designer, one PM, one marketing lead.
 */
async function seedIfEmpty() {
  const count = await User.countDocuments();
  if (count > 0) return;

  await User.insertMany([
    { name: "Alex Rivers", role: "Senior Developer", isAvailable: true },
    { name: "Samantha Chen", role: "UX Designer", isAvailable: false },
    { name: "Jordan Taylor", role: "Project Manager", isAvailable: true },
    { name: "Maria Garcia", role: "Marketing Lead", isAvailable: false },
  ]);

  console.log("[seed] inserted 4 sample team members");
}

async function start() {
  await connectDB(process.env.MONGO_URI);
  await seedIfEmpty();

  app.listen(PORT, () => {
    console.log(`[server] running on http://localhost:${PORT}`);
  });
}

start();
