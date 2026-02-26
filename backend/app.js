import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { createClient } from "redis";

const app = express();
app.use(cors());
app.use(express.json());

/* ==============================
   🔴 CONFIG REDIS
============================== */

const redisClient = createClient({
  url: "redis://localhost:6379",
});

redisClient.on("error", (err) =>
  console.log("❌ Redis Client Error", err)
);

await redisClient.connect();

console.log("✅ Conectado a Redis");

/* ==============================
   🔵 GET PRODUCTS (con cache)
============================== */

app.get("/products", async (req, res) => {
  const start = Date.now();

  try {
    const cachedData = await redisClient.get("products");

    if (cachedData) {
      const end = Date.now();
      return res.json({
        source: "CACHE",
        serverTime: end - start,
        data: JSON.parse(cachedData),
      });
    }

    // Simulamos base lenta
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const response = await fetch(
      "https://692cdd51e5f67cd80a495f17.mockapi.io/proyectoFinal/videogames"
    );

    const data = await response.json();

    await redisClient.set("products", JSON.stringify(data), {
      EX: 60, // cache por 60 segundos
    });

    const end = Date.now();

    res.json({
      source: "DATABASE",
      serverTime: end - start,
      data,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error obteniendo productos" });
  }
});

/* ==============================
   🧹 INVALIDAR CACHE
============================== */

app.post("/cache/invalidate", async (req, res) => {
  await redisClient.del("products");
  res.json({ message: "Cache invalidada correctamente" });
});

/* ==============================
   🚀 SERVER
============================== */

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});