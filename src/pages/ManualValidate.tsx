import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  id: number;
  kyId: string;
  accommodation: boolean;
  food: boolean;
  singleEvent: boolean;
  multiEvent: boolean;
  tshirt: boolean;
  amount: number;
  upload: string;
  accepted: boolean;
  rejected: boolean;
  d1: boolean;
  d2: boolean;
  d3: boolean;
}

// toast.configure();

const ManualValidate: React.FC = () => {
  const [users, setUsers] = useState<any>([]);

  const fetchUsers = async () => {
    let authToken: any = localStorage.getItem("authTokens");

    if (!authToken) {
      toast.error("Unauthorized Access: No token found!");
      return;
    }

    authToken = authToken ? JSON.parse(authToken) : null;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/payments/get_all_requests`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken.access}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data: any = await response.json();
      const formattedUsers = data.result.map((user: any) => ({
        id: user.ID,
        accepted: false,
        rejected: false,
        kyId: user.ky_ids,
        accommodation: user.selected_items.includes("Accomodation"),
        food: user.selected_items.includes("Food"),
        singleEvent: user.selected_items.includes("Single Event"),
        multiEvent: user.selected_items.includes("Multi Event"),
        tshirt: user.selected_items.includes("T-Shirt"),
        amount: user.amount,
        upload: user.upload,
        d1: user.selected_items.includes("Event_1"),
        d2: user.selected_items.includes("Event_2"),
        d3: user.selected_items.includes("Event_3"),
      }));

      setUsers(formattedUsers);
      toast.success("Users fetched successfully!");
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCheckboxChange = (id: number, field: keyof User) => {
    setUsers(
      users.map((user: any) =>
        user.id === id
          ? { ...user, [field]: !user[field], rejected: false }
          : user
      )
    );
  };

  const handleRejectionChange = (id: number, field: keyof User) => {
    setUsers(
      users.map((user: any) =>
        user.id === id
          ? { ...user, [field]: !user[field], accepted: false }
          : user
      )
    );
  };

  const handleValidate = async () => {
    const checkRequests: any = users
      .filter((user: any) => user.accepted || user.rejected)
      .map((user: any) => {
        return { request_id: user.id, is_accepted: user.accepted };
      });
    console.log(checkRequests);

    if (checkRequests.length === 0) {
      toast.warn("No users selected for validation!");
      return;
    }

    let authToken: any = localStorage.getItem("authTokens");
    if (!authToken) {
      toast.error("Unauthorized Access: No token found!");
      return;
    }

    authToken = authToken ? JSON.parse(authToken) : null;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/payments/batch_validate`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken.access}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: checkRequests }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to validate users");
      }

      await fetchUsers();
      toast.success("Users validated successfully!");
    } catch (error) {
      console.error("Error validating users:", error);
      toast.error("Error validating users");
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Manual Validation
      </h1>
      <ul className="space-y-4">
        {users.map((user: any) => (
          <li
            key={user.id}
            className="flex items-center p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition flex-wrap"
          >
            <button
              title="checkbox"
              type="button"
              onClick={() => handleCheckboxChange(user.id, "accepted")}
              className={`mr-4 px-2 w-24 text-white ${
                user.accepted
                  ? "bg-gray-500 hover:bg-gray-800"
                  : "bg-green-500 hover:bg-green-800"
              } rounded focus:ring-green-500`}
            >
              {!user.accepted ? "Accept" : "Accepted"}
            </button>
            <button
              title="rejected_checkbox"
              type="button"
              onClick={() => handleRejectionChange(user.id, "rejected")}
              className={`mr-4 px-2 w-24 text-white ${
                user.rejected
                  ? "bg-gray-500 hover:bg-gray-800"
                  : "bg-red-500 hover:bg-red-800"
              } rounded focus:ring-red-500`}
            >
              {!user.rejected ? "Reject" : "Rejected"}
            </button>
            <span className="mr-4 font-semibold text-gray-700">
              {user.kyId}
            </span>
            <span className="mr-4 text-gray-600">
              Accommodation:{" "}
              <strong>{user.accommodation ? "Yes" : "No"}</strong>
            </span>
            <span className="mr-4 text-gray-600">
              Food: <strong>{user.food ? "Yes" : "No"}</strong>
            </span>
            <span className="mr-4 text-gray-600">
              Single Event: <strong>{user.singleEvent ? "Yes" : "No"}</strong>
            </span>
            <span className="mr-4 text-gray-600">
              Multi Event: <strong>{user.multiEvent ? "Yes" : "No"}</strong>
            </span>
            <span className="mr-4 text-gray-600">
              T-Shirt: <strong>{user.tshirt ? "Yes" : "No"}</strong>
            </span>
            <span className="mr-4 text-gray-600">
              D1: <strong>{user.d1 ? "Yes" : "No"}</strong>
            </span>
            <span className="mr-4 text-gray-600">
              D2: <strong>{user.d2 ? "Yes" : "No"}</strong>
            </span>
            <span className="mr-4 text-gray-600">
              D3: <strong>{user.d3 ? "Yes" : "No"}</strong>
            </span>

            <span className="mr-4 text-gray-600">
              Amount: <strong>{user.amount}</strong>
            </span>
            <span className="mr-4 text-gray-600">
              Upload:{" "}
              <a
                href={user.upload}
                className="text-blue-500 underline"
                target="_blank"
              >
                {user.upload}
              </a>
            </span>
          </li>
        ))}
      </ul>
      <button
        onClick={handleValidate}
        className="mt-6 w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Validate
      </button>
    </div>
  );
};

export default ManualValidate;