import express from "express";
import { conectDb } from "./src/config/db.js";
import userRoutes from "./src/routes/usuario.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
const port = 4758;

conectDb();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`servidor corriendo en http://localhost:${port}`);
});
