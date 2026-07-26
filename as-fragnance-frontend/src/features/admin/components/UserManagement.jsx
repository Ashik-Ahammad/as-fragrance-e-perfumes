"use client";
import React, { useState, useEffect } from "react";
import { FiShield, FiUsers, FiUser } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";
import { toast } from "sonner";
import { getUsers, updateUserRole } from "@/services/userService";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Role update state
  const [roleEmail, setRoleEmail] = useState("");
  const [selectedRole, setSelectedRole] = useState("admin");
  const [isUpdatingRole, setIsUpdatingRole] = useState(false);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    if (!roleEmail) return toast.error("Enter an email");
    setIsUpdatingRole(true);
    try {
      const res = await updateUserRole(roleEmail, selectedRole);
      toast.success(res.message || "Role updated!");
      setRoleEmail("");
      fetchUsers();
    } catch {
      toast.error("Failed to update role");
    } finally {
      setIsUpdatingRole(false);
    }
  };

  const inp = "w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-400";
  const lbl = "text-[10px] font-bold text-stone-500 uppercase tracking-widest block mb-1.5";

  if (isLoading) return <div className="p-10 text-center">Loading Users...</div>;

  return (
    <div className="flex flex-col h-full">
      <div className="mb-6 shrink-0">
        <h1 className="text-2xl sm:text-3xl font-serif text-stone-900">
          User Management
        </h1>
        <p className="text-sm text-stone-500 mt-1">
          Assign or revoke admin roles
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
        {/* Role Update Form */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-stone-200 rounded-2xl shadow-sm p-6 space-y-5">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <FiShield className="text-amber-600" /> Update User Role
            </h2>
            <form onSubmit={handleUpdateRole} className="space-y-4">
              <div>
                <label className={lbl}>User Email</label>
                <input
                  type="email"
                  required
                  value={roleEmail}
                  onChange={(e) => setRoleEmail(e.target.value)}
                  placeholder="user@example.com"
                  className={inp}
                />
              </div>
              <div>
                <label className={lbl}>Assign Role</label>
                <div className="flex gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => setSelectedRole("admin")}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${selectedRole === "admin" ? "bg-amber-600 text-white border-amber-600" : "bg-stone-50 text-stone-600 border-stone-200 hover:border-amber-400"}`}
                  >
                    👑 Admin
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedRole("user")}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${selectedRole === "user" ? "bg-stone-900 text-white border-stone-900" : "bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-400"}`}
                  >
                    👤 User
                  </button>
                </div>
              </div>
              <button
                type="submit"
                disabled={isUpdatingRole}
                className="w-full py-3 bg-stone-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-amber-600 transition-colors disabled:opacity-50"
              >
                {isUpdatingRole ? "Updating..." : "Update Role"}
              </button>
            </form>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs text-amber-700 space-y-1">
              <p className="font-bold">⚠️ Important:</p>
              <p>
                🛡️ Promoting a user to <b>Admin</b> grants full dashboard
                access.
              </p>
              <p>
                👤 Assigning the <b>User</b> role will revoke
                administrative privileges.
              </p>
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="lg:col-span-2 bg-white border border-stone-200 rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-stone-100 flex items-center">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <FiUsers className="text-amber-600" /> All Users
            </h2>
            <span className="ml-auto bg-stone-100 text-stone-700 text-xs font-bold px-2.5 py-1 rounded-full">
              {users.length} total
            </span>
          </div>
          <div className="overflow-y-auto flex-1">
            {users.length === 0 ? (
              <div className="p-12 text-center text-stone-400">
                <p>No users found.</p>
              </div>
            ) : (
              <table className="w-full text-left">
                <thead className="bg-stone-50 sticky top-0">
                  <tr className="text-stone-500 text-[10px] uppercase tracking-widest">
                    <th className="px-6 py-4 font-bold">User</th>
                    <th className="px-6 py-4 font-bold">Email</th>
                    <th className="px-6 py-4 font-bold">Role</th>
                    <th className="px-6 py-4 font-bold">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {users.map((u) => (
                    <tr key={u._id} className="hover:bg-stone-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm shrink-0">
                            {u.name ? u.name.charAt(0).toUpperCase() : "?"}
                          </div>
                          <p className="font-semibold text-stone-900 text-sm">
                            {u.name || "—"}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-stone-500 text-xs">
                        {u.email}
                      </td>
                      <td className="px-6 py-4">
                        {u.role === "admin" ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                            <MdAdminPanelSettings /> Admin
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-stone-600 bg-stone-100 border border-stone-200 px-2.5 py-1 rounded-full">
                            <FiUser className="text-xs" /> User
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-stone-400 text-xs">
                        {u.createdAt
                          ? new Date(u.createdAt).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
