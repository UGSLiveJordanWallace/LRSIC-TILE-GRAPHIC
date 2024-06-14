import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout } from "../../services/auth";
import db from "../../services/pdb";
import clsx from "clsx";

export default function ControlPanelPage() {
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [tab, setTab] = useState("north");

    useEffect(() => {
        async function getUser() {
            const data = await db.authStore.model;
            if (data) {
                setCurrentUser(data);
                setLoading(false);
                return;
            }
            router.push("/auth/login");
        }
        getUser();
    }, []);

    function handleLogout(e) {
        e.preventDefault();

        try {
            logout();
            router.push("/auth/login");
        } catch (error) {
            console.error(error);
        }
    }

    if (loading) {
        return <div className="loading">...loading</div>;
    }

    return (
        <div>
            <nav className="flex relative flex-row flex-wrap justify-center gap-4 w-full h-15 shadow-md text-5xl">
                <TabButton tab={tab} setTab={setTab}>
                    north
                </TabButton>
                <TabButton tab={tab} setTab={setTab}>
                    south
                </TabButton>
                <TabButton tab={tab} setTab={setTab}>
                    east
                </TabButton>
                <TabButton tab={tab} setTab={setTab}>
                    west
                </TabButton>
                {currentUser && (
                    <div className="absolute flex right-0 h-full items-center text-xl mr-3">
                        <p>{currentUser.email}</p>
                    </div>
                )}
            </nav>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

function TabButton({ tab, setTab, children }) {
    return (
        <button
            onClick={(e) => setTab(children)}
            className={clsx(
                "bg-none p-6 w-44",
                tab === children && "bg-slate-300 border-b-2 border-black",
                tab !== children && "border-none",
            )}
        >
            {children}
        </button>
    );
}

function TabView({ tab }) {}
