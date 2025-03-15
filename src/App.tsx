import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/shared/Header";
import "./styles/App.css";

const App: React.FC = () => {
  useEffect(() => {
    const htmlElement: any = document.querySelector("html");
    htmlElement.setAttribute("data-bs-theme", "dark");
  }, []);

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
