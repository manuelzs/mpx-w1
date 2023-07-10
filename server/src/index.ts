import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const secretKey = process.env["JWT_SECRET"] || "test";
const port = process.env["PORT"] || 8000;

app.post("/api/generate", (req, res) => {
  const { uid } = req.body;
  const token = jwt.sign({ uid }, secretKey);
  return res.json({ token }).status(200).send();
});

app.listen(port, () => console.log(`Listening on port ${port}`));
