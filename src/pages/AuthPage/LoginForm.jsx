export default async function LoginForm() {
  // const [error, setError] = useState("No error");

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    console.log(data);

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      const token = await response.json();
      if (token.token) {
      }
    } catch (error) {
      // setError(error.message);
    }
  };

  const handleSecret = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY0MjJhMzJkNTViMTM2OWQ5ZTY5OTEzYyIsIm5hbWUiOiJzaW1vbiIsImVtYWlsIjoic2ltb24yQGdhLmNvbSIsIl9fdiI6MH0sImlhdCI6MTY3OTk5MTYwOSwiZXhwIjoxNjc5OTkxNjY5fQ.bCPxXXm901FAaIeIbW8CN-F-0G3p90QGk_9OKYCgJSg";
    try {
      const response = await fetch("/api/secret", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      // setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <fieldset>
          <legend>Login</legend>
          <label>
            Email: <input name="email" />
          </label>
          <label>
            Password: <input name="password" />
          </label>
          <button>Login</button>
        </fieldset>
      </form>
      <button onClick={handleSecret}>Secret</button>
    </>
  );
}
