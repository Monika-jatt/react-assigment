const express = require('express');
const cors = require('cors');
const Sequelize = require('sequelize');
const app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'monik@123',
  database: 'task',
});

//user table
const User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey:true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const List = sequelize.define('List', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const Task = sequelize.define('Task', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  taskStatus: {    
    type: Sequelize.STRING,
    allowNull: false
  }
});
List.hasMany(Task);
Task.belongsTo(List);

// Sync Sequelize models with the database
sequelize.sync().then(()=>{
  console.log("database synced");
})

// users
app.post('/register', async (req, res) => {
  const { rusername, rpassword } = req.body;
  try {
    const user = await User.create({ username: rusername, password: rpassword });
    res.json(user);
  } catch (error) {
    console.error(error);
  }
});

app.post('/login', async (req, res) => {
  const { lusername: username, lpassword: password } = req.body;
  try {
    const user = await User.findOne({ where: { username, password } });
    if (user) {
      res.json( 'Login successful');
    } else {
      res.status(401).json({ error });
    }
  } catch (error) {
    console.log(error);
  }
});

//lists
app.get('/lists', async (req, res) => {
  const lists = await List.findAll({ include: Task });
  res.json(lists);
});

app.post('/lists', async (req, res) => {
  const { title } = req.body;
  try{
  const newList = await List.create({ title });
  res.json(newList);
  }catch{
    console.error(error);
  }
});

//todo tasks
app.post('/create/task', async (req, res) => {
  try {
    const { title, listId, taskStatus } = req.body;
    const newTask = await Task.create({ title, ListId: listId, taskStatus });
    res.json(newTask.rows);
  } catch(error) {
    console.log(error);
  }
});

app.post('/update/task/taskStatus', async (req, res) => {
  try {
    const { id, taskStatus } = req.body;
    const newTask = await Task.update({ taskStatus }, { where: { id } });
    res.json(newTask.rows);
  } catch(error) {
    console.log(error);
  }
});

app.post('/update/task/listId', async (req, res) => {
  try {
    const { id, listId } = req.body;
    const newTask = await Task.update({ ListId: listId }, { where: { id } });
    res.json(newTask.rows);
  } catch(error) {
    console.log(error);
  }
});

app.listen(5001, () => {
  console.log('Server has started.');
});
