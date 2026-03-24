import { useState } from "react";
import { IoSearch } from "react-icons/io5";

interface SearchFilterProps {
    onSearch: (value: string) => void;
    placeholder?: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
    onSearch,
    placeholder = "Search..."
}) => {
    const [search, setSearch] = useState("");

    const handleSearch = (value: string) => {
        setSearch(value);
        onSearch(value);
    };

    return (
        <div className="flex items-center border rounded-md outline-none text-[14px] bg-white border-violet-500">
            <IoSearch className="text-violet-700 pl-1 text-xl"/>
            <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder={placeholder}
                className="px-3 py-1 outline-none text-black"
            />
        </div>
    );
};

export default SearchFilter;