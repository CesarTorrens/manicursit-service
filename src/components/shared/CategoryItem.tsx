"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RiSubtractFill } from "react-icons/ri";

import ServiceCard from "./ServiceCard";
import { Category } from "../../types/Category";

export default function CategoryItem({ category }: { category: Category }) {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div
      style={{
        transition: "all 0.3s ease-in-out",
        maxHeight: !open ? "40px" : "530px",
      }}
      className={open ? "overflow-auto" : "overflow-hidden"}
    >
      <div
        id="accordion-collapse"
        data-accordion="collapse"
        className="bg-bgCategoryItem"
        onClick={toggleOpen}
      >
        <button
          type="button"
          className="flex justify-between items-center w-full py-1 px-2 text-left"
          data-accordion-target="#accordion-collapse-body-1"
          aria-expanded="true"
          aria-controls="accordion-collapse-body-1"
        >
          <span className="text-fontColor font-semibold">{category.name}</span>
          {!open ? (
            <FaPlus className="text-iconPlus" />
          ) : (
            <RiSubtractFill className="text-iconPlus" />
          )}
        </button>
      </div>
      <div className={open ? "mb-2" : ""}>
        {category.services.map((service) => (
          <ServiceCard service={service} key={service.id} />
        ))}
      </div>
    </div>
  );
}
