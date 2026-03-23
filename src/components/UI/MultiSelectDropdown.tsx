import { useState, useRef, useEffect } from "react";

interface MultiSelectDropdownProps {
    options: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
    width?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
    options,
    onChange,
    placeholder = "Filter",
    width = "w-40",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<string[]>([]);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleOption = (option: string) => {
        let updated: string[];

        if (selected.includes(option)) {
            updated = selected.filter((item) => item !== option);
        } else {
            updated = [...selected, option];
        }

        setSelected(updated);
        onChange(updated);
    };

    const displayText = selected.length === 0 ? placeholder : selected.length === 1 ? selected[0] : `${selected[0]}...`;

    return (
        <div className={`relative ${width ?? "w-40"}`} ref={ref}>

            <div
                onClick={() => setIsOpen(!isOpen)}
                className="border px-3 py-1 rounded-md cursor-pointer border-violet-400 text-[14px]"
            >
                {displayText}
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div className="absolute mt-1 w-full border rounded-md shadow-md z-10 max-h-60 overflow-auto">
                    {options.map((option) => (
                        <label
                            key={option}
                            className="flex items-center gap-2 px-3 py-2 cursor-pointer text-[14px] text-[#222] hover:bg-violet-300! hover:text-white"
                        >
                            <input
                                type="checkbox"
                                checked={selected.includes(option)}
                                onChange={() => toggleOption(option)}
                                className="accent-violet-500 w-4 h-4"
                            />
                            {option}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelectDropdown;