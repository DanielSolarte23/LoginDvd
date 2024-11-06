import { Router } from "express";
import { login, registrar, vericarToken } from "../controllers/usuario.controller.js";

const router = Router();

router.post('/registro', registrar);
router.post('/inicio', login);
router.get('/verificar', vericarToken)

export default router;