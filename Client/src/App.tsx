import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Logs from "./pages/Logs";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";
import { ToastContainer } from "react-toastify";
import Sensors from "./pages/Sensors";
import { useTelemetry } from "./hooks/useTelemetry";

export default function App() {
  const { telemetry, connected, socketError, lastUpdated, isLoading } =
    useTelemetry();

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="text-white text-center font-medium !font-montserrat"
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup" element={<SignUp />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard
                  telemetry={telemetry}
                  connected={connected}
                  socketError={socketError}
                  lastUpdated={lastUpdated}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sensors"
            element={
              <ProtectedRoute>
                <Sensors
                  telemetry={telemetry}
                  socketError={socketError}
                  isLoading={isLoading}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/logs"
            element={
              <ProtectedRoute>
                <Logs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
