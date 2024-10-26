const path = require("path");

const TASK_FILE = path.join(__dirname, "tasks.json");
const loadTask = () => {
  if (!fs.existsSync(TASK_FILE)) {
    console.log("You don't have any Task to do.");
    return [];
  }
  try {
    const tasks = fs.readFileSync(TASK_FILE);
    return JSON.parse(tasks);
  } catch (error) {
    console.error("Error reading tasks:", error);
    return [];
    
  }
};

const saveTask = (tasks) => {
    const spaceBetweenWords = 4;
    fs.writeFileSync(TASK_FILE, JSON.stringify(tasks, null, spaceBetweenWords));
  };

  module.exports = {
    loadTask,saveTask
  }