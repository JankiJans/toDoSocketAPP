const express = require('express');
const socket = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();

let tasks = []

app.use(cors())

app.use(express.static(path.join(__dirname, '/client')));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running...');
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('I\'ve added a listener on message event \n');

  io.to(socket.id).emit('updateData', tasks);
  console.log(tasks)

  socket.on('newTask', (task) => {
    const newTask = { id: socket.id, name: task.title}
    tasks.push(newTask)
    console.log('New task added:', newTask);
    io.emit('updateData', tasks);
  })

  socket.on('removeTask', (taskId) => {
    tasks = tasks.filter((task) => task.id !== socket.id || task.id !== taskId);
    console.log('Task removed:', taskId);
    io.emit('updateData', tasks);
  });
  
})

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

