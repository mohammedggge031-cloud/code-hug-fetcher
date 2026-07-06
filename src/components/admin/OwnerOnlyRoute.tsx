import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { isPrimaryOwnerEmail } from "@/lib/ownerConfig";

/**
 * Route guard that restricts a nested admin route to the primary owner
 * account email exclusively. Non-owner authenticated users are redirected
 * back to /admin (the dashboard home). Assumes it is rendered inside the
 * existing ProtectedRoute chain, so `user` is already loaded.
 */
const OwnerOnlyRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  if (!isPrimaryOwnerEmail(user?.email)) return <Navigate to="/admin" replace />;
  return <>{children}</>;
};

export default OwnerOnlyRoute;
