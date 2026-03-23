import { IoIosAdd } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
import TimeIndicator from '../UI/TimeIndicator';
import Avatar from '../UI/Avatar';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const pageTitle = location.pathname.replace("/", "").toUpperCase() || "HOME";

    return (
        <nav className="h-14 bg-white shadow flex items-center justify-between px-6">
            <TimeIndicator pageTitle={pageTitle} />
            <div className="flex items-center gap-4">
                <Avatar src='https://i.pravatar.cc/40?img=5' size='md' alt={'User'} />
            </div>
        </nav>
    );
};

export default Navbar;