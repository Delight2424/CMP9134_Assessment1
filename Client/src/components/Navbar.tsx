import { Link, useLocation, useNavigate } from "react-router-dom";
import { clearAuth, getUser } from "../utils/auth";
import { useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = getUser();

  const navClass = (path: string) =>
    pathname === path
      ? "rounded-lg bg-blue-600 px-4 py-2 text-white"
      : "rounded-lg px-4 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900";

  const handleLogout = () => {
    setIsLoggedIn(true);

    setTimeout(() => {
      clearAuth();
      navigate("/signin");
    }, 500);
  };

  return (
    <header className="border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <img src="/pngwing.com.png" alt="Robot Image" className="h-[40px] w-[40px]"/>
          <span className="text-lg font-bold text-slate-900">GCS</span>

          <nav className="flex items-center gap-2">
            <Link to="/dashboard" className={navClass("/dashboard")}>
              Dashboard
            </Link>
            <Link to="/sensors" className={navClass("/sensors")}>
              Sensors
            </Link>
            {user?.role === "COMMANDER" && (
              <>
                <Link to="/logs" className={navClass("/logs")}>
                  Logs
                </Link>
                <Link to="/users" className={navClass("/users")}>
                  Users
                </Link>
              </>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right text-sm">
            <p className="font-medium text-slate-900">
              {user?.forename || "User"}
            </p>
            <p className="text-slate-500">{user?.role || "--"}</p>
          </div>

          <button
            onClick={handleLogout}
            disabled={isLoggedIn}
            className="rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700
            w-[8rem] flex items-center justify-center disabled:cursor-not-allowed">
            {isLoggedIn ? (
              <div className="animate-spin rounded-full h-[1.5rem] w-[1.5rem] border-b-2 border-white" />
            ) : (
              "Sign Out"
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
