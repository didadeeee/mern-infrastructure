import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import AuthPage from "../AuthPage/AuthPage";
import NewOrderPage from "../NewOrderPage/NewOrderPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import NavBar from "../../components/NavBar/NavBar";
import classes from "./App.module.css";

export default function App() {
  const [user, setUser] = useState(null);

  if (user === null) {
    return (
      <main className="App">
        <NavBar />
        <AuthPage />
      </main>
    );
  } else
    return (
      <main className="App">
        <NavBar />
        <button type="button" className={classes.red}>
          Primary
        </button>
        <Routes>
          <Route path="/orders" Component={OrderHistoryPage} />
          <Route path="/orders/new" element={<NewOrderPage />} />
        </Routes>
      </main>
    );
}
