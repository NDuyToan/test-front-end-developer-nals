import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/reset.css";
// import "antd/dist/reset.css";
import "./styles/index.scss";
// import App from "./App";
import Layout from "./layouts/Layout";
import reportWebVitals from "./reportWebVitals";
import NotFound from "./pages/NotFound";
import UpdateBlog from "./pages/UpdateBlog";
import DetailBlog from "./pages/DetailBlog";
import HomePage from "./pages/HomePage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/create" element={<UpdateBlog />}></Route>
          <Route path="/update" element={<UpdateBlog />}></Route>
          <Route path="/detail" element={<DetailBlog />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
