import { FaChalkboardUser, FaCircleArrowLeft } from 'react-icons/fa6';
import { MdDashboard } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
}

const navItems = [
    {
        name: "Board",
        Icon: MdDashboard,
        path: "/"
    }
];

const Sidebar = ({ isOpen, onToggle }: SidebarProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <aside className={`${isOpen ? "w-50" : "w-20"} h-screen border-r border-[#e6e6e6] bg-white transition-all duration-500 ease-in flex flex-col`}>
            <div className="flex flex-col">
                <div className={`font-bold text-[18px] text-violet-600 flex items-center p-4 gap-2 cursor-pointer ${!isOpen ? "justify-center" : ""}`} onClick={() => navigate("/")}>
                    {isOpen && <FaChalkboardUser />}
                    {isOpen ? <span>WORKFLOW</span> : <span>WFLO</span>}
                </div>

                {navItems.map(({ Icon, name, path }, index) => {
                    const isActive = location.pathname === path;
                    return (
                        <div
                            key={index}
                            className={`p-2 rounded-lg text-violet-600 m-1.5 mt-4.5 text-[14px] font-semibold flex items-center gap-1 cursor-pointer transition-all duration-300 ease-in
                                ${isActive ? "bg-violet-600 text-white" : "hover:bg-violet-300 hover:text-white"}
                                ${!isOpen ? "justify-center" : ""}`}
                            onClick={() => navigate(path)}
                        >
                            <Icon />
                            {isOpen && <span>{name}</span>}
                        </div>
                    );
                })}
            </div>

            <div className="mt-auto flex justify-center m-3">
                <div className="border-t w-full mx-auto flex justify-center">
                    <button
                        onClick={onToggle}
                        className="text-[24px] rounded-2xl text-violet-600 px-4 py-1 cursor-pointer flex items-center gap-1"
                    >
                        <FaCircleArrowLeft
                            className={`transition-transform duration-300 ${!isOpen ? "rotate-180" : ""}`}
                        />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;