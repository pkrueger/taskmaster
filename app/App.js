import { TaskListsController } from "./Controllers/TaskListsController.js";
import { TasksController } from "./Controllers/TasksController.js";

class App {
  tasksController = new TasksController();
  taskListsController = new TaskListsController();
}

window["app"] = new App();
