"use client";
import { User } from "@prisma/client";
import { getUsers } from "../actions/getUsers";
import { useEffect, useState } from "react";
import axios from "axios";
import { AiTwotoneDelete } from "react-icons/ai";

const UserList = () => {
  const [userList, setUserList] = useState<User[] | null>(null);

  useEffect(() => {
    axios.get("/api/user").then((response) => {
      console.log(response.data);
      setUserList(response.data);
    });
  }, []);

  if (!userList) {
    return (
      <div className="max-w-md bg-red-200 p-5 mx-auto">
        <h1 className="text-2xl font-semibold">Users Not Found</h1>
      </div>
    );
  }

  return (
    <div className="flex mt-10 w-fll py-5 flex-col">
      {userList.map((user) => (
        <div
          key={user.id}
          className="p-5 shadow-md my-5 flex flex-col gap-2 bg-neutral-800 rounded"
        >
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p>{user.email}</p>
              <p>{user.address}</p>
            </div>
            <AiTwotoneDelete className="text-red-400 cursor-pointer" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
