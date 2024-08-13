import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", (req, res) => {
  res.status(200).json({ message: "Hello Hend" });
});

app.listen(PORT, () => {
  console.log("server running on port", PORT);
});
