import dotenv from "dotenv"
import argsUtil from "./args.util.js"

const { mode } = argsUtil
const path = mode === "dev" ? "./.env" : `./.env.${mode}`
dotenv.config({ path })