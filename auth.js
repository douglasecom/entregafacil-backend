const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/registro", async (req, res) => {
  const { nome, email, senha, tipo } = req.body;
  const hash = await bcrypt.hash(senha, 10);
  const user = await prisma.usuario.create({ data: { nome, email, senha: hash, tipo } });
  res.json(user);
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  const user = await prisma.usuario.findUnique({ where: { email } });
  if (!user) return res.status(401).json({ erro: "Usuário não encontrado" });

  const valido = await bcrypt.compare(senha, user.senha);
  if (!valido) return res.status(401).json({ erro: "Senha inválida" });

  const token = jwt.sign({ id: user.id, tipo: user.tipo }, process.env.JWT_SECRET, { expiresIn: "8h" });
  res.json({ token });
});

module.exports = router;
