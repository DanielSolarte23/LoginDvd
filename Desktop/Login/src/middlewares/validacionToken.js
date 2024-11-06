import { jwt } from "jsonwebtoken";
import { TOKEN_SECRETO } from "../config/config";

export const authRequire = (req, res, next) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(401).json({ mensaje: "No autorizacion de token" });

  jwt.verify(token, TOKEN_SECRETO, (err, user) => {
    if (err) return res.status(403).json({ mensaje: "Token invalido" });
    req.user = user;

    next();
  });
};
