import React from "react";
import { useState } from "react";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [edit, setEdit] = useState(false);
  const [active, setActive] = useState(null);

  const [users, setUsers] = useState([]);

  const addUser = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      address,
    };

    if (edit) {
      // update user
      let copy = users;
      Object.assign(copy[active], user);
      setUsers([...copy]);
      setEdit(false);
      setActive(null);
    } else {
      // adduser
      setUsers([...users, user]);
    }

    setName("");
    setEmail("");
    setAddress("");
  };

  const onEditClick = (index) => {
    const user = users[index];

    setName(user.name);
    setEmail(user.email);
    setAddress(user.address);

    setActive(index);
    setEdit(true);
  };

  const deleteUser = (user) => {
    if (window.confirm("Are you sure you want to delete ?")) {
      let copy = users.filter((item) => item !== user);

      setUsers([...copy]);
    }
  };

  return (
    <div>
      <form onSubmit={addUser}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Address</label>
          <input
            type="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className="btn btn-success">{edit ? "update" : "Add"} </button>
      </form>
      <table className="table table-bordered mt-5">
        <thead>
          <tr>
            <th>Name</th><br/>
            <th>Email</th>
            <th>Address</th><br/>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => {
            return (
              <tr>
                <td> {user.name} </td>
                <td> {user.email} </td>
                <td> {user.address} </td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => onEditClick(index)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteUser(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
