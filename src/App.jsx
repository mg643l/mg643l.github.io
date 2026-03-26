import { useState } from 'react';
import './App.css';

function App() {
  const [todos, setTodos] = useState(['Learn React', 'Pet a dog']);
  
  const [inputValue, setInputValue] = useState('');
  const [deleteValue, setDeleteValue] = useState('');
  const [deleteError, setDeleteError] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, inputValue]);
      setInputValue(''); 
    }
  };

  const handleDeleteTodo = () => {
    const trimmedValue = deleteValue.trim();

    if (!/^\d+$/.test(trimmedValue)) {
      setDeleteError('Please enter a valid integer task number.');
      return;
    }

    const taskNumber = Number(trimmedValue);

    if (taskNumber < 1 || taskNumber > todos.length) {
      setDeleteError('That task number does not exist in the list.');
      return;
    }

    setTodos(todos.filter((_, index) => index !== taskNumber - 1));
    setDeleteValue('');
    setDeleteError('');
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      
      <div>
        <input 
          type="text" 
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleAddTodo();
            }
          }}
          placeholder="Add a new task..."
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <div>
        <input
          type="text"
          value={deleteValue}
          onChange={(event) => {
            setDeleteValue(event.target.value);
            setDeleteError('');
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleDeleteTodo();
            }
          }}
          placeholder="Enter task number to delete..."
        />
        <button onClick={handleDeleteTodo}>Delete</button>
      </div>

      {deleteError && <p>{deleteError}</p>}

      <ol>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ol>
    </div>
  );
}

export default App;