import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../models/authStore";
import { useUserStore } from "../models/userStore";

const Users = () => {
  const { user } = useAuthStore();
  const { users, profile,fetchProfile, fetchUsers, addUser, updateUser, deleteUser } = useUserStore();
  const navigate = useNavigate();
  const [profileName, setProfileName] = useState("");
  const [profileEmail, setProfileEmail] = useState("");
  const [profilePassword, setProfilePassword] = useState("");
  const [message, setMessage] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState(""); 

  useEffect(() => {
    if (!user || !user.success) {
      navigate("/");
    } else {
      fetchUsers();
      fetchProfile();
    }
  }, [user, navigate, fetchUsers, fetchProfile]);

  useEffect(() => {
    if (profile) {
      setProfileName(profile.name || ""); 
      setProfileEmail(profile.email || ""); 
    }
  }, [profile]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = { name: profileName, email: profileEmail, password: profilePassword };
      await updateUser(user._id, updatedProfile);
      setMessage("Profile updated successfully");
    } catch (error) {
      setMessage(error.response ? error.response.data.message : "Server error");
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const newUser = { 
        name: newUserName, 
        email: newUserEmail, 
        password: newUserPassword 
      };
      await addUser(newUser);
      setMessage("User added successfully");
      setNewUserName("");
      setNewUserEmail("");
      setNewUserPassword("");
    } catch (error) {
      setMessage(error.response ? error.response.data.message : "Server error");
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setMessage("User deleted successfully");
    } catch (error) {
      setMessage(error.response ? error.response.data.message : "Server error");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6">Manage Users</h2>
      <p className="mb-4 text-gray-600">Here you can manage all users.</p>
      {message && <div className="mb-4 text-green-600">{message}</div>}

      <div className="flex flex-wrap gap-8">
      <div className="p-6 flex-grow bg-white rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4">Update Your Profile</h3>
        <form onSubmit={handleProfileUpdate}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              value={profileEmail}
              onChange={(e) => setProfileEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              className="mt-1 p-2 border border-gray-300 rounded w-full"
              value={profilePassword}
              onChange={(e) => setProfilePassword(e.target.value)}
            />
          </div>
          <button className="mt-4 bg-blue-600 text-white p-2 rounded w-full">Update Profile</button>
        </form>
      </div>

      <div className="flex-grow p-6 bg-white rounded shadow-md">
          <h3 className="text-xl font-semibold mb-4">Add New User</h3>
          <form onSubmit={handleAddUser}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Name:</label>
              <input
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Password:</label>
              <input
                type="password"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                value={newUserPassword}
                onChange={(e) => setNewUserPassword(e.target.value)}
              />
            </div>
            <button className="mt-4 bg-green-600 text-white p-2 rounded w-full">Add User</button>
          </form>
        </div>
        </div>
            <div className="p-6 bg-white rounded shadow-md">
        <h3 className="text-xl font-semibold mb-4">All Users</h3>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="min-w-full border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">Name</th>
                <th className="py-2 px-4 border-b text-left">Email</th>
                <th className="py-2 px-4 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">
                    <button
                      className="bg-red-600 text-white p-1 rounded"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Users;
