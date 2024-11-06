import jwt from "jsonwebtoken"; // Importa el módulo jsonwebtoken para crear y verificar tokens JWT
import { TOKEN_SECRETO } from "../config/config.js"; // Importa la clave secreta usada para firmar el token

// Función que crea un token de acceso
export function createAccesToken(payload) {
    // Retorna una nueva promesa, que se resolverá con el token generado
    return new Promise((resolve, reject) => {
        // Usa la función sign de jwt para generar el token
        jwt.sign(
            payload, // El contenido (payload) que se va a incluir en el token, generalmente un objeto con información del usuario
            TOKEN_SECRETO, // La clave secreta que se utiliza para firmar el token y asegurar su autenticidad
            {
                expiresIn: "1d" // Configuración para que el token expire en 1 día (24 horas)
            },
            (err, token) => { // Callback que se ejecuta después de intentar generar el token
                if (err) reject(err); // Si ocurre un error al crear el token, rechaza la promesa con el error
                resolve(token); // Si el token se genera correctamente, resuelve la promesa con el token generado
            }
        );
    });
};
