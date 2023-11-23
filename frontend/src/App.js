import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './Navbar';
import ListComponent from "./components/ListComponent/ListComponent";
import { TaskStatus } from './constants/constants';
import { DragDropContext } from "react-beautiful-dnd";
import { onDragEnd } from "./utils/dndUtils";

function App() {
  const [lists, setLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [selectedList, setSelectedList] = useState(lists?.length > 0 ? lists[0].id : null);

  const onTaskStatusChange = (listIndex) => (taskIndex) => {
    const newListDefinitionArray = [...lists];
    const currentListDefinition = newListDefinitionArray[listIndex];
    const currentTask = currentListDefinition.Tasks[taskIndex];

    currentTask.taskStatus = currentTask.taskStatus === TaskStatus.Completed ? TaskStatus.In_Progress : TaskStatus.Completed;
    currentListDefinition.Tasks[taskIndex] = currentTask;
    newListDefinitionArray[listIndex] = currentListDefinition;
    setLists(newListDefinitionArray);

    updateTaskStatus(lists[listIndex]?.Tasks[taskIndex]?.id, currentTask.taskStatus);
  }

  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await axios.get('http://localhost:5001/lists');
      setLists(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createList = async () => {
    if (newListTitle) {
      try {
        const response = await axios.post('http://localhost:5001/lists', { title: newListTitle });
        setLists([...lists, response.data]);
        setNewListTitle('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const createTask = async () => {
    if (newTaskTitle && selectedList) {
      try {
        await axios.post('http://localhost:5001/create/task', { title: newTaskTitle, listId: selectedList, taskStatus: TaskStatus.In_Progress });
        fetchLists();
        setNewTaskTitle('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.post('http://localhost:5001/update/task/taskStatus', { id: taskId, taskStatus: newStatus });
      fetchLists();
      setNewTaskTitle('');
    } catch (error) {
      console.error(error);
    }
  }

  const updateTaskParentList = async (taskId, newParentListId) => {
    try {
      await axios.post('http://localhost:5001/update/task/listId', { id: taskId, listId: newParentListId });
      fetchLists();
      setNewTaskTitle('');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Navbar/>
      <div class="container">
        <div>
          <input
            type="text"
            placeholder="Add title to list"
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
          />
          <button onClick={createList}>Create List</button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Create tasks for list"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
          <select value={selectedList} onChange={(e) => setSelectedList(e.target.value)}>
            <option value="" disabled>Select a list</option>
            {lists.map((list) => (
              <option key={list.id} value={list.id}>{list.title}</option>
            ))}
          </select>
          <button onClick={createTask}>Add Task</button>
        </div>
        <div>
          <h3>Lists</h3>
          <div class="list-component-parent-container">
            <DragDropContext onDragEnd={(result) => onDragEnd(result, lists, setLists, updateTaskParentList)}>
              {lists?.map((listDefinition, listIndex) => (
                <div class="list-component-parent-item">
                  <ListComponent listDefinition={listDefinition} onTaskStatusChange={onTaskStatusChange(listIndex)} listIndex={listIndex} />
                </div>
              ))}
            </DragDropContext>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
