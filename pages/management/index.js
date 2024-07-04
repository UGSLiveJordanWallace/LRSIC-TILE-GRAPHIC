import Link from "next/link";
import { useRouter } from "next/navigation";
import { getTokenPayload } from "pocketbase";
import { useEffect, useState } from "react";
import { logout } from "../../services/auth";
import db from "../../services/pdb";
import { updateUsers } from "../../services/utils";

export default function UsersPage() {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState();
    const [users, setUsers] = useState([]);
    const [error, setError] = useState();

    const router = useRouter();

    useEffect(() => {
        async function getUsers() {
            setLoading(true);
            const results = await db.collection("users").getFullList({
                $autoCancel: false,
                sort: "-created",
            });
            setUsers(results);
            setLoading(false);
        }
        async function getAdmin() {
            const data = db.authStore.model;
            if (data && getTokenPayload(db.authStore.token).type === "admin") {
                setCurrentUser(data);
                setLoading(false);
                return;
            }
            return router.replace("/auth/login/admin");
        }
        getAdmin();
        getUsers();
    }, [router]);

    function handleChange(e, key) {
        users[key]["tileEditor"] = e.target.checked;
        setUsers([...users]);
    }

    function handleLogout(e) {
        e.preventDefault();

        try {
            logout();
            router.push("/auth/login/admin");
        } catch (error) {
            console.error(error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError();
        const response = await updateUsers(users);
        if (response.error) {
            return setError(response.error);
        }
        router.refresh();
        return;
    }

    if (loading) {
        return <div className="loading"></div>;
    }

    return (
        <div className="flex flex-col w-full h-screen">
            <nav className="flex flex-initial flex-row justify-between p-7">
                <div className="flex flex-row justify-between items-center w-1/5 text-xl">
                    <Link
                        href="/"
                        className="p-2 hover:text-blue-400 hover:shadow hover:rounded-lg transition-all duration-500 ease-in-out"
                    >
                        Blocks
                    </Link>
                    <Link
                        href="/control-panel"
                        className="p-2 hover:text-blue-400 hover:shadow hover:rounded-lg transition-all duration-500 ease-in-out"
                    >
                        Control Panel
                    </Link>
                    <Link
                        href="/info/help"
                        className="p-2 hover:text-blue-400 hover:shadow hover:rounded-lg transition-all duration-500 ease-in-out"
                    >
                        Help
                    </Link>
                </div>
                <div>
                    {currentUser && (
                        <h2 className="inline text-lg mr-2">
                            {currentUser.email}
                        </h2>
                    )}
                    <button
                        className="inline-block p-3 bg-red-300 rounded text-lg active:bg-red-500"
                        onClick={handleLogout}
                        disabled={loading}
                    >
                        {loading ? "Logging Out" : "Logout"}
                    </button>
                </div>
            </nav>
            <div className="flex flex-auto flex-col items-center justify-center w-full">
                {error && (
                    <p className="block w-11/12 m-auto text-xl text-red-900 p-6 bg-red-200 border border-black rounded">
                        {error}
                    </p>
                )}
                <table className="table-auto w-4/5 border-collapse text-2xl border border-zinc-900">
                    <thead>
                        <tr>
                            <th className="border border-zinc-800">ID</th>
                            <th className="border border-zinc-800">Username</th>
                            <th className="border border-zinc-800">Email</th>
                            <th className="border border-zinc-800">Editor</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {users.map((val, key) => {
                            return (
                                <tr className="bg-slate-200" key={key}>
                                    <td className="border border-zinc-900 w-2/5 p-4">
                                        {val.id}
                                    </td>
                                    <td className="border border-zinc-900 w-1/5 p-4">
                                        {val.username}
                                    </td>
                                    <td className="border border-zinc-900 w-2/5 p-4">
                                        {val.email}
                                    </td>
                                    <td className="border border-zinc-900 p-4">
                                        <div className="flex flex-row items-center justify-center w-full relative">
                                            <input
                                                type="checkbox"
                                                className="peer bg-white border border-zinc-900 antialiased appearance-none size-8 rounded shrink-0 focus:outline-none checked:bg-blue-300"
                                                checked={val.tileEditor}
                                                onChange={(e) =>
                                                    handleChange(e, key)
                                                }
                                            />
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                pointerEvents={"none"}
                                                stroke="currentColor"
                                                className="absolute text-white top-0 size-8 hidden peer-checked:block"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="m4.5 12.75 6 6 9-13.5"
                                                />
                                            </svg>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                        <tr>
                            <td colSpan={"4"}>
                                <button
                                    className="w-full p-1 mobile:p-3 bg-green-400 border-black"
                                    type="submit"
                                    disabled={loading}
                                    onClick={handleSubmit}
                                >
                                    {loading ? "Submitting" : "Submit Changes"}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
