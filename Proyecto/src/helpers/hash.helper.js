import { genSaltSync, hashSync, compareSync } from "bcrypt";

/**
 * @createHash
 * recibe una contraseña cruda (sin proteccion)
 * devuelve una contraseña hasheada
 */
function createHash(password) {
    const salt = genSaltSync(10)
    const hashPassword = hashSync(password, salt)
    return hashPassword
}

/**
 * @verifyHash
 * recibir una contraseña cruda (la del formulario) y la contraseña de la base de datos
 * las va a comparar
 * y devuelve el booleano correspondiente
 */
function verifyHash(password, mongoPassword) {
    //console.log({password, mongoPassword});
    const verify = compareSync(password, mongoPassword)
    return verify
}

export { createHash, verifyHash }