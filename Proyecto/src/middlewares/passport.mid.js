import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { usersManager } from "../data/mongo/manager.mongo.js";
import { createHash, verifyHash } from "../helpers/hash.helper.js";

passport.use(
  "register",
  new LocalStrategy(
    /* objeto de configuración de la estrategia */
    { passReqToCallback: true, usernameField: "email" },
    /* callback de la estrategia (lógica de autenticación/autorizacion) */
    async (req, email, password, done) => {
      try {
        /* la lógica del register está actualmente en la ruta del register */
        /* para mayor ordenamiento de la autenticación */
        /* esa lógica se viene para la estrategia */
        const data = req.body;
        /* validar propiedades obligatorias */
        if (!data.city) {
          const error = new Error("Invalid data");
          error.statusCode = 400;
          throw error;
        }
        /* validar el no re-registro del usuario */
        const user = await usersManager.readBy({ email });
        if (user) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
        }
        /* proteger la contraseña */
        data.password = createHash(password);
        /* crear al usuario */
        const response = await usersManager.createOne(data);
        /* el segundo parametro del done agrega al objeto de requerimientos */
        /* una propiedad user con los datos del usuario */
        done(null, response);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    /* objeto de configuración de la estrategia */
    { passReqToCallback: true, usernameField: "email" },
    /* callback de la estrategia (lógica de autenticación/autorizacion) */
    async (req, email, password, done) => {
      try {
        /* la lógica del login está actualmente en la ruta del register */
        /* para mayor ordenamiento de la autenticación */
        /* esa lógica se viene para la estrategia */
        /* validar si el usuario existe en la base de datos */
        const response = await usersManager.readBy({ email });
        if (!response) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
        }
        /* validar la contraseña */
        const verify = verifyHash(password, response.password);
        if (!verify) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
        }
        /* lo dejamos provisionalmente porque NO VAMOS A MANEJAR SESIONES CON PASSPORT */
        req.session.user_id = response._id;
        req.session.email = email;
        req.session.role = response.role;
        /* el segundo parametro del done agrega al objeto de requerimientos */
        /* una propiedad user con los datos del usuario */
        done(null, response);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;