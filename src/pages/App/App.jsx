import "@picocss/pico/css/pico.css";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { getUser } from "../../utilities/users-service";
import AuthPage from "../AuthPage/AuthPage";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import LoginForm from "../../pages/AuthPage/LoginForm";

export default function App() {
  const [user, setUser] = useState(getUser());

  if (user === null) {
    return (
      <main className="container">
        <NavBar user={user} setUser={setUser} />
        <AuthPage setUser={setUser} />
      </main>
    );
  } else
    return (
      <main className="container">
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/orders" Component={OrderHistoryPage} />
          <Route path="/orders/new" element={<NewOrderPage />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </main>
    );
}
