import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [id, setId] = useState(0);
  const [isUpdate, setIsUpdate] = useState(false);

  // Load data from local storage when the component mounts
  useEffect(() => {
    const savedData = localStorage.getItem("employeeData");
    if (savedData) {
      setData(JSON.parse(savedData));
    }
  }, []);

  // Save data to local storage whenever it changes
  useEffect(() => {
    if (data.length > 0) {
      localStorage.setItem("employeeData", JSON.stringify(data));
    }
  }, [data]);

  const handleEdit = (id) => {
    const dt = data.find((item) => item.id === id);
    if (dt) {
      setIsUpdate(true);
      setId(id);
      setFirstName(dt.firstName);
      setLastName(dt.lastName);
      setAge(dt.age);
    }
  };

  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure you want to delete this data?")) {
        const dt = data.filter((item) => item.id !== id);
        setData(dt);
        localStorage.setItem("employeeData", JSON.stringify(dt)); // Update storage
      }
    }
  };

  const handleUpdate = () => {
    const updatedData = data.map((item) =>
      item.id === id ? { id, firstName, lastName, age } : item
    );
    setData(updatedData);
    localStorage.setItem("employeeData", JSON.stringify(updatedData)); // Update storage
    handleClear();
  };

  const handleSave = (e) => {
    e.preventDefault();
    let error = "";
    if (!firstName) error += "First name is required. ";
    if (!lastName) error += "Last name is required. ";
    if (!age) error += "Age is required. ";

    if (!error) {
      const newObject = {
        id: data.length + 1,
        firstName,
        lastName,
        age,
      };
      const updatedData = [...data, newObject];
      setData(updatedData);
      localStorage.setItem("employeeData", JSON.stringify(updatedData)); // Save to storage
      handleClear();
    } else {
      alert(error);
    }
  };

  const handleClear = () => {
    setId(0);
    setFirstName("");
    setLastName("");
    setAge("");
    setIsUpdate(false);
  };

  return (
    <div className="App">
      <div style={{ display: "flex", justifyContent: "center", margin: "10px 0" }}>
        <div>
          <label>
            First Name:
            <input
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:
            <input
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Age:
            <input
              type="text"
              placeholder="Enter age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
        </div>
        <div>
          {!isUpdate ? (
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>
          )}
          <button className="btn btn-danger" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <td>Sr No.</td>
            <td>Id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleEdit(item.id)}>
                  Edit
                </button>
                &nbsp;
                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
