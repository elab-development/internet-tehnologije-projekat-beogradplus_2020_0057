import React from "react";

function SideBar() {
  return (
    <div className="absolute inset-0 flex justify-left items-center z-10 bg-blue max-w-20 ml-4 my-2 rounded-xl">
      <p className="text-2xl text-white font-bold">
        This should be on top of the map
      </p>
    </div>
  );
}

export default SideBar;
