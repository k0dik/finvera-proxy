const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const FINVERA_API_KEY = "finvera_8fc72443ab2bea7631fb24bdce49611bd041071db2fd4efb15f2fd18e0243793"; // Вставь свой ключ!

app.get("/finvera", async (req, res) => {
  try {
    const url = "https://api.finvera.ai/reference-data/search-for-securities?q=*&limit=10";
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${FINVERA_API_KEY}`,
        Accept: "application/json"
      }
    });
    // Логируем статус ответа API
    console.log('Finvera API status:', response.status);
    // Получаем сырой текст
    const text = await response.text();
    console.log('Finvera API response:', text);

    // Пробуем парсить результат как JSON
    let data;
    try {
      data = JSON.parse(text);
      res.json(data);
    } catch (e) {
      // Ловим ошибку парсинга JSON
      console.error('JSON parse error:', e);
      res.status(response.status).send(text);
    }
  } catch (err) {
    // Логируем ошибки запроса
    console.error('Proxy error details:', err);
    res.status(500).send("Proxy error");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy started on port " + PORT));
