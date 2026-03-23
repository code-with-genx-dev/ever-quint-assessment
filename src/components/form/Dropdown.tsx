import { useEffect, useRef, useState } from "react";

interface DropdownProps {
    options: string[];
    value: string;
    onChange: (val: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange }) => {
    const [open, setOpen] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <div
                onClick={() => setOpen(!open)}
                className="border border-violet-400 px-2 py-1 text-[14px] rounded-md cursor-pointer"
            >
                {value || "Select"}
            </div>

            {open && (
                <div className="absolute w-full bg-white border border-violet-400 mt-1 rounded-md z-10">
                    {options.map((opt) => (
                        <div
                            key={opt}
                            onClick={() => {
                                onChange(opt);
                                setOpen(false);
                            }}
                            className="px-2 py-1 hover:bg-violet-300 hover:text-white text-[#222] cursor-pointer text-[14px]"
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;