import React from "react";

function SideBar() {
  return (
    <div className="absolute inset-0 flex justify-left items-center z-10 bg-blue max-w-16 ml-6 mt-24 mb-2 rounded-2xl">
      <p className="text-2xl text-white font-bold">
        This should be on top of the map
      </p>
    </div>
  );
}

export default SideBar;
