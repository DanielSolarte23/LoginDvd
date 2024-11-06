import User from "../models/usuario.model.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRETO } from "../config/config.js";

export const registrar = async (req, res) => {
  const { nombre, correo, contraseña } = req.body;

  try {
    const contraProtegida = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = new User({
      nombre,
      correo,
      contraseña: contraProtegida,
    });

    const guardarUsuario = await nuevoUsuario.save();

    const token = await createAccesToken({ id: guardarUsuario._id });

    res.cookie("token", token);

    res.json({
      id: guardarUsuario._id,
      nombre: guardarUsuario.nombre,
      correo: guardarUsuario.correo,
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

export const login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuarioExistente = await User.findOne({ correo });
    if (!usuarioExistente)
      return res.status(400).json({ mensaje: "Usuario no encontrado" });

    const compararContraseña = await bcrypt.compare(
      contraseña,
      usuarioExistente.contraseña
    );
    if (!compararContraseña)
      return res.status(400).json({ mensaje: "Contraseña incorrecta" });

    const token = await createAccesToken({ id: usuarioExistente._id });

    res.cookie("token", token);

    res.json({
      id: usuarioExistente._id,
      nombre: usuarioExistente.nombre,
      correo: usuarioExistente.correo,
    });
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
};

// Verificar token
export const vericarToken = async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, TOKEN_SECRETO, async (err, user) => {
    if (err) return res.status(401).json({ message: "No autorizado" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "No autorizado" });

    return res.json({
      id: userFound._id,
      nombre: userFound.nombre,
      correo: userFound.email,
    });
  });
};
