const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const FINVERA_API_KEY = "finvera_8fc72443ab2bea7631fb24bdce49611bd041071db2fd4efb15f2fd18e0243793"; // Сюда вставь свой API ключ

app.get("/finvera", async (req, res) => {
  try {
    const url = "https://api.finvera.ai/reference-data/search-for-securities?q=*&limit=10";
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${FINVERA_API_KEY}`,
        Accept: "application/json"
      }
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).send("Proxy error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy started on port " + PORT));
