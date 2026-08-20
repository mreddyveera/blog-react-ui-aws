import React from "react";
import loadingIcon from "../assets/images/loadingIcon.svg";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <img
        src={loadingIcon}
        alt="Loading"
        className="w-24 h-24 object-contain"
      />
    </div>
  );
};

export default Loading;
