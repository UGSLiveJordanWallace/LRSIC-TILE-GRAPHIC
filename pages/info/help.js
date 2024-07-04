import { useEffect, useState } from "react";
import db from "../../services/pdb";
import SideNav from "../../components/SideNav";
import LayoutPage from "./Layout";
import FindPaverPage from "./FindPaver";
import ControlPanelPage from "./ControlPanel";
import MenuPage from "./Menu";
import SpreadsheetPage from "./Spreadsheet";
import UploadPage from "./Upload";

export default function HelpPage() {
    const [currentUser, setCurrentUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState("upload");

    useEffect(() => {
        function getUser() {
            const data = db.authStore.model;
            if (data) {
                setCurrentUser(data);
                setLoading(false);
                return;
            }
            setCurrentUser(undefined);
            setLoading(false);
        }
        getUser();
    }, []);

    if (loading) {
        return <div className="loading"></div>;
    }

    return (
        <div className="block grid grid-cols-5 w-full h-screen overflow-hidden relative">
            <SideNav view={view} setView={setView} isUser={currentUser} />
            <div className="block h-screen overflow-y-auto col-span-4">
                <RenderView
                    view={view}
                    components={{
                        layout: LayoutPage,
                        "find paver": FindPaverPage,
                        "control panel": ControlPanelPage,
                        spreadsheet: SpreadsheetPage,
                        menu: MenuPage,
                        upload: UploadPage,
                    }}
                />
            </div>
        </div>
    );
}

function RenderView({ view, components }) {
    const Component = components[view];
    return Component();
}
