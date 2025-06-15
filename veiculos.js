const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const lista = await prisma.veiculo.findMany({
    include: { loja: true }
  });
  res.json(lista);
});

router.post("/", async (req, res) => {
  const { lojaId, quantidade } = req.body;
  const veiculo = await prisma.veiculo.create({
    data: { lojaId, quantidade }
  });
  res.json(veiculo);
});

module.exports = router;
