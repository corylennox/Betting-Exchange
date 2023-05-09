import React, { useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/outline";

const Tooltip = ({ type }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      <InformationCircleIcon
        className="h-6 w-6  stroke-sky-500"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      />

      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded bg-gray-700 px-2 py-1 text-sm text-white shadow-md">
          {type === "cancelled_by_user"
            ? "Cancelled by User"
            : type === "cancelled_by_exchange"
            ? "Cancelled by Exchange"
            : "an error occurred..."}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
