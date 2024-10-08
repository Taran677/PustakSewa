import React, { useState } from "react";
import { toast } from "react-toastify";

function UpdateContact() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleUpdate = async () => {
    try {
      const response = await fetch(`https://pustaksewa.onrender.com/contacts`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          phone,
          password,
        }),
      });

      if (response.status === 204) {
        toast("No content to display");
        return;
      }

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText);
        throw new Error(errorText);
      }

      const updatedContact = await response.json();
      toast.success(`Contact updated: ${JSON.stringify(updatedContact)}`);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md relative mx-auto justify-self-center self-center mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold mb-4">Update Contact</h2>
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />{" "}
      <input
        required
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 mb-4 border  border-gray-300 rounded-md"
      />
      <input
        required
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Phone"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute inset-y-0 right-5 bottom-3 px-3 py-2 text-gray-500"
      >
        {showPassword ? "Hide" : "Show"}
      </button>
      <button
        onClick={handleUpdate}
        className="w-full p-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
      >
        Update Contact
      </button>
    </div>
  );
}

export default UpdateContact;
