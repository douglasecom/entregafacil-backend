const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const lojas = await prisma.loja.findMany();
  res.json(lojas);
});

router.post("/", async (req, res) => {
  const loja = await prisma.loja.create({ data: req.body });
  res.json(loja);
});

module.exports = router;
