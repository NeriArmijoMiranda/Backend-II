import { Command } from "commander";

const args = new Command();
args
  .option("-p <port>", "port", 8080)
  .option("--mode <mode>", "mode", "dev")
  .option("--pers <persistence>", "persistence", "mongo");

args.parse();
export default args.opts();