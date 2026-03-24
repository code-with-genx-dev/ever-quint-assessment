import React from "react";


interface TagsProps {
  items: any;
}

const colors = [
  "bg-red-100 text-red-700",
  "bg-green-100 text-green-700",
  "bg-blue-100 text-blue-700",
  "bg-yellow-100 text-yellow-700",
  "bg-purple-100 text-purple-700",
  "bg-pink-100 text-pink-700",
  "bg-indigo-100 text-indigo-700",
  "bg-orange-100 text-orange-700",
  "bg-teal-100 text-teal-700",
  "bg-cyan-100 text-cyan-700",
];

const Tags: React.FC<TagsProps> = ({ items }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((tag:any, index:any) => {
        const colorClass = colors[index % colors.length];

        return (
          <span
            key={tag}
            className={`px-3 text-[10px] rounded-md font-medium ${colorClass}`}
          >
            {tag}
          </span>
        );
      })}
    </div>
  );
};

export default Tags;