// components/TaskManager.js
import React, { useState, useEffect } from 'react';
import styles from './TaskManager.module.css';

// Main TaskManager component
const TaskManager = () => {
  // State for tasks, filter, and new task input
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newTask, setNewTask] = useState('');

  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to add a new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  // Function to toggle task completion status
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Filter tasks based on the selected filter
  const filteredTasks = tasks.filter(task => 
    filter === 'all' ? true : filter === 'active' ? !task.completed : task.completed
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Task Manager</h1>
      <div className={styles.inputContainer}>
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="Add a new task" 
          className={styles.input}
        />
        <button onClick={addTask} className={styles.addButton}>Add Task</button>
      </div>
      <div className={styles.filters}>
        <button onClick={() => setFilter('all')} className={styles.filterButton}>All</button>
        <button onClick={() => setFilter('active')} className={styles.filterButton}>Active</button>
        <button onClick={() => setFilter('completed')} className={styles.filterButton}>Completed</button>
      </div>
      <ul className={styles.taskList}>
        {filteredTasks.map(task => (
          <li key={task.id} className={styles.taskItem}>
            <div>
              <input 
                type="checkbox" 
                checked={task.completed} 
                onChange={() => toggleTaskCompletion(task.id)} 
                className={styles.checkbox}
              />
              {task.text}
            </div>
            <button onClick={() => deleteTask(task.id)} className={styles.deleteButton}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
