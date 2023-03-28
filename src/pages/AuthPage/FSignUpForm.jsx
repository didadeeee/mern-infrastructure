import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, signUp } from "../../utilities/users-service";

export default function FSignUpForm({ setUser }) {
  //? const [name, setName] = useState("")
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("No Error");
  const navigate = useNavigate();

  const disable = state.password !== state.confirm;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signUp(state);
      setUser(getUser());
      navigate("/orders");
    } catch (error) {
      setError(error.message);
    }
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
          {error}
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
