import io from 'socket.io-client';
import { useState } from 'react';

const App = () => {
  const [socket, setSocket] = useState('')
  const [tasks, setTasks] = useState([])
  
  useEffect(() => {
    const socket = io("http://localhost:8000")
    setSocket(socket);
  }, []);

  return (
    <div className="App">
      <header>
        <h1>ToDoList.app</h1>
      </header>

      <section className="tasks-section" id="tasks-section">
        <h2>Tasks</h2>

        <ul className="tasks-section__list" id="tasks-list">
          {tasks.map((task) => (
            <li className="task" key={task.id}>
              {task.name}
              <button className="btn btn--red" onClick={() => handleRemoveTask(task.id)}>Remove</button>
            </li>
          ))}
        </ul>

        <form id="add-task-form">
          <input className="text-input" autocomplete="off" type="text" placeholder="Type your description" id="task-name" />
          <button className="btn" type="submit">
            Add
          </button>
        </form>
      </section>
    </div>
  );
};

export default App;
