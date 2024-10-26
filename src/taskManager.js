const fs = require("fs");
const { loadTask, saveTask } = require("./fileHandler");
const addTask = (description) => {
  const tasks = loadTask();
  const count = tasks.length > 0 ? tasks.length + 1 : 1;
  const task = {
    id: count,
    description: description,
    status: "todo",
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  tasks.push(task);
  saveTask(tasks);
  console.log("Task added");
};

const updateTask = (id, newStatus) => {
  const tasks = loadTask();

  const updateTaskOperation = (task) => {
    if (task.id === id) {
      return {
        ...task,
        status: newStatus,
        updatedAt: Date.now(),
      };
    }
    return task;
  };

  const updatedTasks = tasks.map(updateTaskOperation);
  const taskFound = tasks.some((task) => task.id === id);

  if (JSON.stringify(updatedTasks) !== JSON.stringify(tasks)) {
    saveTask(updatedTasks);
    console.log(`Task updated: ID ${id} - New status: "${newStatus}"`);
  } else {
    console.log(`Task with ID ${id} not found.`);
  }
};

const filterTasks = (status) => {
  const tasks = loadTask();
  if (status === "alltasks") {
    console.log(tasks);
  } else if (["todo", "done", "in-progress"].includes(status)) {
    const filteredTasks = tasks.filter((task) => task.status === status);
    console.log(filteredTasks);
  } else {
    console.log(
      `Invalid status: "${status}". Valid statuses are "todo", "done", "in-progress", or "alltasks".`
    );
  }
};

const listTasks = (list = "alltasks") => {
  switch (list) {
    case "done":
      filterTasks("done");
      break;
    case "todo":
      filterTasks("todo");
      break;
    case "in-progress":
      filterTasks("in-progress");
      break;

    case "alltasks":
    default:
      filterTasks("alltasks");
  }
};

module.exports = {
  addTask,
  updateTask,
  listTasks,
};
