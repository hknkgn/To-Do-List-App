import './App.css';
import TaskForm from "./TaskForm";
import Task from "./Task";
import {useEffect, useState} from "react";

function App() {
  const [tasks,setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    setTasks(tasks || []);
  }, []);

  function ekleTask(name) {
    if(name===""){
      return;
    }
    setTasks(prev => {
      return [...prev, {name:name,done:false}];
    });
  }

  function silTask(indexToRemove) {
    setTasks(prev => {
      return prev.filter((taskObject,index) => index !== indexToRemove);
    });
  }

  function updateTaskDone(taskIndex, newDone) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }
  const tdate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const numberComplete = tasks.filter(t => t.done).length;
  const numberTotal = tasks.length;
  const dateformatted = tdate.toLocaleDateString("tr-TR", options);

  function adiniDegistirTask(index,newName) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    })
  }

  return (
    <main>
      <img src="logo192.jpeg" alt="" className='resim'/>
      <h1>To Do List</h1>
      <TaskForm onAdd={ekleTask} />
      {tasks.map((task,index) => (
        <Task {...task}
              onRename={newName => adiniDegistirTask(index,newName)}
              onTrash={() => silTask(index)}
              onToggle={done => updateTaskDone(index, done)} />
      ))}
      <h3 style={{color:"#61DAFB", fontSize: "12px" }}>{dateformatted}</h3>
      <h2>{numberComplete}/{numberTotal} Bitirildi</h2>
    </main>
  );
}

export default App;
