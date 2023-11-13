import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Error from "./components/error/Error";
import Dashboard from "./components/dashboard/Dashboard";
import Nav from "./components/nav/Nav";
import Protected from "./components/protected/Protected";
import { useAuth } from "./components/services/authContext/AuthContext";
import Reviews from "./components/reviews/Reviews";

function App() {
  const { isAuthenticated, login, logout } = useAuth();

  const predefinedUsers = [
    { username: "sysadmin", password: "sysadmin123", type: "Developer" },
    { username: "admin", password: "admin123", type: "Admin" },
  ];

  useEffect(() => {
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(predefinedUsers));
    }
  }, []);
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/registrarse",
      element: <Register />,
    },
    {
      path: "*",
      element: <Error />,
    },
    {
      path: "/dashboard",
      element: (
        <Protected isAuthenticated={isAuthenticated}>
          <Dashboard />
        </Protected>
      ),
    },
    {
      path: "/reviews/:gameId",
      element: <Reviews />,
    },
  ]);

  return (
    <RouterProvider router={router}>
      <div className="App">
        <Nav />
      </div>
    </RouterProvider>
  );
}

export default App;
