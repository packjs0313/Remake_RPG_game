import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App.jsx";

// rootElement : index.html 안에서 리액트 앱 붙일 DOM
const rootElement = document.getElementById("root");

// App : 전체 화면 시작 컴포넌트
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
