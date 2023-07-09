import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const secretKey = process.env["JWT_SECRET"] || "test";
const port = process.env["PORT"] || 8000;

app.post("/api/validate", (req, res) => {
  try {
    const { token } = req.body;
    const claims = jwt.verify(token, secretKey);
    return res.json(claims).status(200).send();
  } catch (error) {
    return res.json({ error }).status(401).send();
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
