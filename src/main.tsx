import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import "./index.css";
import App from "./App.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import JobListingsPage from "./pages/JobListingsPage.tsx";
import AddJobPage from "./pages/AddJobPage.tsx";
import DashboardLayout from "./layouts/DashboardLayout.tsx";
import ClientLayout from "./layouts/ClientLayout.tsx";
import AppliedJobsPage from "./pages/AppliedJobsPage.tsx";
import EditJobPage from "./pages/EditJobPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<ClientLayout />}>
          <Route
            path="/"
            element={<App />}
          />
          <Route path="auth">
            <Route
              path="/auth/login"
              element={<LoginPage />}
            />
            <Route
              path="/auth/register"
              element={<RegisterPage />}
            />
          </Route>
        </Route>
        <Route
          path="dashboard"
          element={<Navigate to="/dashboard/job-listings" />}
        />
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard/job-listings"
            element={<JobListingsPage />}
          />
          <Route
            path="/dashboard/job-listings/add"
            element={<AddJobPage />}
          />
          <Route
            path="/dashboard/job-listings/:id/edit"
            element={<EditJobPage />}
          />
          <Route
            path="/dashboard/applied-jobs"
            element={<AppliedJobsPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
