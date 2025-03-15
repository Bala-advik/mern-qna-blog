import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./components/error/page.tsx";
import QnA from "./QnA/QnA.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import QnAAdd from "./QnA/QnAAdd.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import Login from "./login-modules/Login.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "qna",
        element: <QnA />,
      },
      {
        path: "qna/add",
        element: <QnAAdd isEdit={false} />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
