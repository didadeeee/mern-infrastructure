import { useState } from "react";

export default function FSignUpForm() {
  //? const [name, setName] = useState("")
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const disable = state.password !== state.confirm;

  const handleSubmit = (event) => {
    event.preventDefault();
    window.alert(JSON.stringify(state));
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <div className="form-container">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            required
          />
          <label>Confirm</label>
          <input
            type="password"
            name="confirm"
            value={state.confirm}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={disable}>
            SIGN UP
          </button>
        </form>
      </div>
      <p className="error-message">&nbsp;{state.error}</p>
    </div>
  );
}
