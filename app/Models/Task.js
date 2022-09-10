import { generateId } from "../Utils/generateId.js";

export class Task {
  /**
   *
   * @param {{taskID:string, taskName:string, taskColor:string}} data
   */
  constructor(data) {
    this.taskID = data.taskID || generateId();
    this.taskName = data.taskName;
    this.taskColor = data.taskColor;
  }
}
