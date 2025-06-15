const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/", async (req, res) => {
  const { endereco } = req.body;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(endereco)}&key=${process.env.GOOGLE_MAPS_API_KEY}`;
  const resposta = await axios.get(url);
  const coords = resposta.data.results[0]?.geometry.location;
  res.json(coords || { erro: "Endereço não encontrado" });
});

module.exports = router;
