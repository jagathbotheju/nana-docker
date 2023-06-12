import Image from "next/image";
import AddUser from "./components/AddUser";
import UserList from "./components/UserList";
import { getUsers } from "./actions/getUsers";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col p-24">
      <AddUser />
      {/* <UserList /> */}
    </main>
  );
}
