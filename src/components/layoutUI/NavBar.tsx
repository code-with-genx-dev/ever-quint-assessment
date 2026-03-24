
import { useLocation } from 'react-router-dom';
import TimeIndicator from '../UI/TimeIndicator';
import Avatar from '../UI/Avatar';
import Button from '../UI/Button';
import { useTaskStore } from '../../store/useTaskStore';

const Navbar = () => {
    const location = useLocation();
    const { reset } = useTaskStore();
    const pageTitle = location.pathname.replace("/", "").toUpperCase() || "HOME";

    return (
        <nav className="h-14 bg-white shadow flex items-center justify-between px-6">
            <TimeIndicator pageTitle={pageTitle} />
            <div className="flex items-center gap-4">
                <Avatar src='https://i.pravatar.cc/40?img=4' size='md' alt={'User'} />
                <Button name='Reset' onClick={() => reset()} />
            </div>
        </nav>
    );
};

export default Navbar;