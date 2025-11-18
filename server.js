import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

// 🧩 Routes
import authRoutes from "./routes/authRoutes.js";
import entrepreneurRoutes from "./routes/entrepreneurRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import districtRoutes from "./routes/districtRoutes.js";

dotenv.config();

// 🔗 Connect MongoDB
connectDB();

const app = express();

/* ==========================================================
   🌍 CORS Middleware
========================================================== */
const allowedOrigins = [
  "http://localhost:5173",           // Local dev
  "https://btl-bhj.pages.dev",
  "https://5fddbd90.btl-bhj.pages.dev",
  "https://solarenterprenuer.pages.dev",
  "https://brihaspathitech.com",     // Frontend live
  "https://api.brihaspathitech.com"  // 🔥 Backend API subdomain (required for Contabo)
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow Postman/cURL
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ CORS blocked origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

/* ==========================================================
   🧭 Route Mounting
========================================================== */
app.use("/api/auth", authRoutes);
app.use("/api/entrepreneur", entrepreneurRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/district-coordinator", districtRoutes);

/* ==========================================================
   🩵 Health Check
========================================================== */
app.get("/", (req, res) =>
  res.send("☀️ Brihaspathi Solar Onboarding API is running...")
);

/* ==========================================================
   ⚙️ Global Error Handler
========================================================== */
app.use((err, req, res, next) => {
  console.error("❌ Uncaught Error:", err);
  res.status(500).json({ message: err.message || "Server Error" });
});

/* ==========================================================
   🚀 Server Start (IMPORTANT CHANGE)
========================================================== */
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log("🌍 API running:");
  console.log(`   ▶ Local:  http://localhost:${PORT}`);
  console.log(`   ▶ Public: http://173.249.6.61:${PORT}`);
  console.log(`   ▶ Secure: https://api.brihaspathitech.com `);
  console.log("🔓 Allowed CORS origins:", allowedOrigins);
});
