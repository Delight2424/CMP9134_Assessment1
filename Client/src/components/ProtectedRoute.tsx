import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
}
