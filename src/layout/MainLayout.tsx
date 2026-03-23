import { useState } from 'react'
import Sidebar from '../components/layoutUI/SideBar';
import Navbar from '../components/layoutUI/NavBar';

interface MainLayout {
    children: React.ReactNode
}

const MainLayout = ({ children }: MainLayout) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

   
    return (
        <div className="bg-[#f3f3f3]! min-h-screen flex">
           <Sidebar isOpen={isOpen} onToggle={()=>{setIsOpen(!isOpen)}}/>
            <div className='flex flex-col h-screen flex-1'>
              <Navbar/>
                <div className="flex-1 h-screen  overflow-y-scroll p-4">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default MainLayout