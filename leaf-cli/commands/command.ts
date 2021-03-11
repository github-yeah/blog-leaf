import commander = require("commander");
import { Action } from "../actions/action";

export type Command = (program: commander.CommanderStatic) => void;

