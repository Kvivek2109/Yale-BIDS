import React, {useState} from 'react';
import './App.css';

function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [taskIds, setTaskIds] = useState([]);

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
            const searchTermArray = searchTerm.split(' ');
            fetch(`http://localhost:8000/search/?term=${searchTermArray.join('+')}`)
                .then(response => response.json())
                .then(data => {
                    setResponseData(data);
                    setTaskIds(prevTaskIds => [...prevTaskIds, data.task_id]);
                })
                .catch(error => console.error('Error fetching data:', error));
        } else {
            console.log('Please enter a search term.');
        }
    };

    const handleTaskIdClick = (taskId) => {
        fetch(`http://localhost:8000/fetch/${taskId}`)
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error fetching data:', error));
    };

  return (
      <div className="App">
        <div>
            <h1> alzheimer disease</h1>
          <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Enter search term"
          />
          <button onClick={handleSearch}>Search</button>
        </div>
          {responseData && (
              <div>
                  <h2>Response Data</h2>
                  <pre>{JSON.stringify(responseData, null, 2)}</pre>
                  <p>
                      <strong>Task IDs:</strong>{" "}
                      {taskIds.map((taskId, index) => (
                          <span key={index}>
                              {/* eslint-disable-next-line no-script-url,jsx-a11y/anchor-is-valid */}
                                <a href="javascript:void(0)" onClick={() => handleTaskIdClick(taskId)}>
                                    {taskId}
                                </a>
                              {index < taskIds.length - 1 && ", "} {/* Add comma separator if not the last item */}
                            </span>
                      ))}
                  </p>
              </div>
          )}
      </div>
  );
}

export default App;
