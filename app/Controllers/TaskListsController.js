import { appState } from "../AppState.js";
import { setHTML } from "../Utils/Writer.js";

function _drawTaskLists() {
  let template = "";
  for (let list of appState.taskLists) {
    template += list.ListTemplate;
  }
  setHTML("taskLists", template);
}

export class TaskListsController {
  constructor() {
    appState.on("taskLists", _drawTaskLists);
  }
}
