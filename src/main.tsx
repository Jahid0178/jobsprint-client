import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import Header from "./components/Header/Header.tsx";
import Footer from "./components/Footer/Footer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          index
          element={<App />}
        />
        <Route path="auth">
          <Route
            path="login"
            element={<LoginPage />}
          />
          <Route
            path="register"
            element={<RegisterPage />}
          />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>
);
