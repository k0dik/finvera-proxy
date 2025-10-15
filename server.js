const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const FINVERA_API_KEY = "finvera_8fc72443ab2bea7631fb24bdce49611bd041071db2fd4efb15f2fd18e0243793"; // Ключ!

app.get("/finvera", async (req, res) => {
  try {
    // ПРИМЕР ЗАПРОСА С ПОИСКОМ ПО SYMBOL "AAPL"
    const url = `https://api.finvera.news/search/api/v1/securities?apikey=${FINVERA_API_KEY}&search=AAPL&search_type=symbol`;
    const response = await fetch(url, {
      headers: {
        Accept: "application/json"
      }
    });
    console.log('Finvera API status:', response.status);
    const text = await response.text();
    console.log('Finvera API response:', text);

    let data;
    try {
      data = JSON.parse(text);
      res.json(data);
    } catch (e) {
      console.error('JSON parse error:', e);
      res.status(response.status).send(text);
    }
  } catch (err) {
    console.error('Proxy error details:', err);
    res.status(500).send("Proxy error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy started on port " + PORT));
