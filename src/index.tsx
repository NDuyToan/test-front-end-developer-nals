import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import "./styles/reset.css";
import "./styles/index.scss";

import Layout from "./layouts/Layout";
import reportWebVitals from "./reportWebVitals";
import store from "./store";

const DetailBlog = React.lazy(() => import("./pages/DetailBlog"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const UpdateBlog = React.lazy(() => import("./pages/UpdateBlog"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#00b96b",
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                path="/"
                element={
                  <React.Suspense fallback={<>...</>}>
                    <HomePage />
                  </React.Suspense>
                }
              ></Route>
              <Route
                path="/create"
                element={
                  <React.Suspense fallback={<>...</>}>
                    <UpdateBlog />
                  </React.Suspense>
                }
              ></Route>
              <Route
                path="/edit/:id"
                element={
                  <React.Suspense fallback={<>...</>}>
                    <UpdateBlog />
                  </React.Suspense>
                }
              ></Route>
              <Route
                path="/detail/:id"
                element={
                  <React.Suspense fallback={<>...</>}>
                    <DetailBlog />
                  </React.Suspense>
                }
              ></Route>
              <Route
                path="*"
                element={
                  <React.Suspense fallback={<>...</>}>
                    <NotFound />
                  </React.Suspense>
                }
              ></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
