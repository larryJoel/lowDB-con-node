const { getConnection } = require("../database");
// const { v4:uuidv4 } = require("uuid");
const uniqid = require("uniqid");
const getTasks = (req, res) => {
  const tasks = getConnection().get("tasks").value();
  res.json(tasks);
};

const getTask = (req, res) => {
  const task = getConnection().get("tasks").find({ id: req.params.id }).value();
  res.json(task);
};

const createTasks = (req, res) => {
  console.log(req.body);
  const newTask = {
    id: uniqid(),
    name: req.body.name,
    description: req.body.description,
  };
  console.log(newTask);
  getConnection().get("tasks").push(newTask).write();
  res.send(newTask);
};

const updateTask = async (req, res) => {
  const result = await getConnection()
    .get("tasks")
    .find({ id: req.params.id })
    .assign(req.body)
    .write();
  res.json(result);
};

const deleteTask = (req,res) => {
    const result = getConnection().get('tasks').remove({id: req.params.id}).write();
    res.json(result);
};

module.exports = {
  getTasks,
  createTasks,
  getTask,
  updateTask,
  deleteTask
};
