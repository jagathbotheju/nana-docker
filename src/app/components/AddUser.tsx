"use client";
import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const AddUser = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [userList, setUserList] = useState<User[] | null>(null);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    axios.get("/api/user").then((response) => {
      console.log(response.data);
      setUserList(response.data);
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, email, address);
    axios
      .post("/api/user", {
        name,
        email,
        address,
      })
      .then(() => {
        toast.success("User Created");
        getUserList();
      })
      .catch((error) => {
        toast.error("Internal Error");
      })
      .finally(() => {});
  };

  const handleDelete = (id: string) => {
    axios
      .delete(`/api/user/${id}`)
      .then(() => {
        toast.success("User Deleted");
        getUserList();
      })
      .catch(() => {
        toast.error("Error deleting user");
      });
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col max-w-lg">
        <h1 className="text-2xl font-bold my-4">Adding User</h1>

        <form onSubmit={handleSubmit}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 outline-none rounded mb-4"
            type="text"
            placeholder="Name"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 outline-none rounded mb-4"
            type="text"
            placeholder="Email"
          />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 outline-none rounded mb-4"
            type="text"
            placeholder="Address"
          />

          <button type="submit" className="py-2 px-4 bg-yellow-700 rounded">
            Submit
          </button>
        </form>
      </div>

      {/* user list */}
      <div className="flex mt-10 w-fll py-5 flex-col w-full">
        {userList &&
          userList.map((user) => (
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
                <AiTwotoneDelete
                  onClick={() => handleDelete(user.id)}
                  className="text-red-400 cursor-pointer"
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddUser;
