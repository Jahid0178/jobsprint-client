import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
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
import { store } from "./store/store.ts";
import { Toaster } from "react-hot-toast";
import GuardLayout from "./layouts/GuardLayout.tsx";
import RoleLayout from "./layouts/RoleLayout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<ClientLayout />}>
            <Route
              path="/"
              element={<App />}
            />
            <Route path="auth">
              <Route element={<GuardLayout />}>
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
          </Route>
          <Route
            path="/dashboard"
            element={<DashboardLayout />}
          >
            <Route element={<RoleLayout role={"admin"} />}>
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
            </Route>
            <Route element={<RoleLayout role="user" />}>
              <Route
                path="/dashboard/applied-jobs"
                element={<AppliedJobsPage />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </Provider>
  </StrictMode>
);
