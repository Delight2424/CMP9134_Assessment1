import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { UsersTable } from "../components/UsersTable";
import { api } from "../services/api";
import type { User } from "../types";
import { toast } from "react-toastify";
import { Radar } from "lucide-react";
import PageHelmet from "../components/PageHelmet ";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  const loadUsers = async () => {
    const result = (await api.getUsers()) as {
      success: boolean;
      data: User[];
    };
    setUsers(result.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRoleChange = async (id: string, role: "COMMANDER" | "VIEWER") => {
    const toastId = toast.loading("Loading...", {
      type: "info",
      theme: "colored",
    });

    const result = await api.updateUserRole(id, role);
    if (result.success) {
      toast.update(toastId, {
        render: result.message || "User role updated successfully",
        type: "success",
        autoClose: 3000,
        isLoading: false,
      });
    } else {
      toast.update(toastId, {
        render: result.message || "Failed to update user role",
        type: "error",
        autoClose: 3000,
        isLoading: false,
      });
    }
    loadUsers();
  };

  return (
    <>
     <PageHelmet
        title="User Management | Robot GCS"
        description="Manage users and their permissions."
      />
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-cyan-100 p-3 text-cyan-700">
              <Radar size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
              <p className="text-slate-500">
                Manage user accounts and permissions.
              </p>
            </div>
          </div>
        </div>
        <UsersTable users={users} onRoleChange={handleRoleChange} />
      </main>
    </div>
    </>

  );
};

export default Users;
