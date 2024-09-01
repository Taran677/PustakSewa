import React, { useState } from "react";

function UpdateContact() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/contacts`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          phone,
        }),
      });

      // Check if response is empty
      if (response.status === 204) {
        setMessage("No content to display.");
        return;
      }

      // Check if response is OK
      if (!response.ok) {
        const errorText = await response.text(); // Use text() to get the raw error message
        throw new Error(errorText);
      }

      // Try parsing JSON if response is not empty
      const updatedContact = await response.json();
      setMessage(`Contact updated: ${JSON.stringify(updatedContact)}`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto justify-self-center self-center mt-8 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold mb-4">Update Contact</h2>
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
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
        onClick={handleUpdate}
        className="w-full p-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
      >
        Update Contact
      </button>
      {message && <p className="mt-4 text-purple-500">{message}</p>}
    </div>
  );
}

export default UpdateContact;
