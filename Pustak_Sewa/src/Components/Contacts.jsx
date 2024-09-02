import React, { useEffect, useState } from "react";
export default function Contacts() {
  const [contact, setContact] = useState({});
  async function fetchContact() {
    try {
      const response = await fetch("https://pustaksewa.onrender.com/contact");
      console.log(response);
      if (!response.ok) {
        throw new Error("Check you internet connection and try again");
      }
      const data = await response.json();
      setContact(data[0]);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  useEffect(() => {
    fetchContact();
  }, []);

  return (
    <div className="text-black  w-full flex-col h-5/6 flex font-light justify-evenly items-center cursor-pointer my-1">
      <span className="flex px-2 justify-center items-center ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="2.5rem"
          height="2.5rem"
          viewBox="0 0 50 50"
        >
          <path d="M 17 5 C 14.250484 5 12 7.2504839 12 10 L 12 12 L 10 12 C 7.2504839 12 5 14.250484 5 17 L 5 40 C 5 42.749516 7.2504839 45 10 45 L 33 45 C 35.749516 45 38 42.749516 38 40 L 38 38 L 40 38 C 42.749516 38 45 35.749516 45 33 L 45 10 C 45 7.2504839 42.749516 5 40 5 L 17 5 z M 17 7 L 40 7 C 41.668484 7 43 8.3315161 43 10 L 43 33 C 43 34.668484 41.668484 36 40 36 L 38 36 L 36 36 L 17 36 C 15.331516 36 14 34.668484 14 33 L 14 23 C 14 21.883334 14.883334 21 16 21 L 19 21 L 19 27 C 19 29.197334 20.802666 31 23 31 L 29 31 L 31 31 L 34 31 C 36.197334 31 38 29.197334 38 27 L 38 17 C 38 14.250484 35.749516 12 33 12 L 14 12 L 14 10 C 14 8.3315161 15.331516 7 17 7 z M 10 14 L 12 14 L 14 14 L 33 14 C 34.668484 14 36 15.331516 36 17 L 36 27 C 36 28.116666 35.116666 29 34 29 L 31 29 L 31 23 C 31 20.802666 29.197334 19 27 19 L 21 19 L 19 19 L 16 19 C 13.802666 19 12 20.802666 12 23 L 12 33 C 12 35.749516 14.250484 38 17 38 L 36 38 L 36 40 C 36 41.668484 34.668484 43 33 43 L 10 43 C 8.3315161 43 7 41.668484 7 40 L 7 17 C 7 15.331516 8.3315161 14 10 14 z M 21 21 L 27 21 C 28.116666 21 29 21.883334 29 23 L 29 29 L 23 29 C 21.883334 29 21 28.116666 21 27 L 21 21 z"></path>
        </svg>{" "}
        <span className="flex px-2 justify-center items-center text-3xl">
          Pustak Sewa
        </span>
      </span>

      <p className="description lg:w-1/2 w-10/12 text-center">
        Reach out to us for more information on how to donate or receive books
        for free. Contact us via email or phone, and we’ll guide you through the
        process.
      </p>
      <div className="w-full flex justify-center flex-col items-center">
        <span className="flex details w-5/6 sm:w-1/2 justify-between flex-row bg-gray-200 rounded-lg px-5 py-3 m-2">
          <span className="pr-5 flex flex-row items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1rem"
              viewBox="0 -960 960 960"
              width="1rem"
              fill="rgb(168, 85, 247)"
            >
              <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
            </svg>
            <span className="pl-2 ">Mobile</span>
          </span>
          <span className="text-purple-500">{contact.phone || ""}</span>
        </span>
        <span className="flex details w-5/6 sm:w-1/2 justify-between flex-row bg-gray-200 rounded-lg px-5 py-3 m-2">
          <span className="pr-5 flex flex-row items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1rem"
              viewBox="0 -960 960 960"
              width="1rem"
              fill="rgb(168, 85, 247)"
            >
              <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
            </svg>
            <span className="pl-2 ">Email</span>
          </span>
          <span className="text-purple-500">{contact.email || ""}</span>
        </span>
      </div>
    </div>
  );
}
