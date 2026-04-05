import { settingsSetup } from "./lib/Settings.js";
import { generateGrid } from "./ui/grid.js";
import { uiRun } from "./ui/interaction.js";


generateGrid();
settingsSetup();

uiRun();