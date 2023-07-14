import logo from './logo.svg';
import './App.css';
import {useState , useEffect} from "react"

function App() {
    const [users, setUsers] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const fetchData = async () => {
    try {
      const response = await fetch("https://reqres.in/api/users?page=2");
      const data = await response.json();
      setUsers(data.data);
      console.log(data.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredUsers = users?.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
      <div className="App">
        <nav className="nav">
          <div className="heading">User List</div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by first name"
          />
        </nav>
        <hr />
        <div className="main">
          {filteredUsers?.length > 0 ? (
            <div className="list">
              {filteredUsers?.map((user) => (
                <li key={user.id}>
                  <div className="user-id">{user.id}</div>
                  <div className="image">
                    <img src={user.avatar} />
                  </div>

                  <h3>{user.first_name}</h3>
                </li>
              ))}
            </div>
          ) : (
            <div className="edge-case">
              <div className="message">
                <h3>No Results Found!</h3>
                <p>Please search from the bellow names</p>
              </div>

              <div className="list">
                {users?.map((user) => (
                  <li key={user.id}>
                    <div className="user-id">{user.id}</div>
                    <div className="image">
                      <img src={user.avatar} />
                    </div>

                    <h3>{user.first_name}</h3>
                  </li>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
  );
}

export default App;
