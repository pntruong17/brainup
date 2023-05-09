import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-full h-screen font-Inter flex justify-center items-center">
      <div className="text-center">
        <h3 className="p-2 font-bold text-4xl">Oooooops...</h3>
        <h3 className="p-2 font-semibold text-3xl">
          That page cannot be found.
        </h3>
        <h3 className="p-2 text-xl">
          Go back to the{" "}
          <Link href={"/"} className="text-_blue">
            Homepage
          </Link>
        </h3>
      </div>
    </div>
  );
};

export default NotFound;
