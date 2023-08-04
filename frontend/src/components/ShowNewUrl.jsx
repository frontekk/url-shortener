import React from "react";
import { MdOutlineSettings, MdOpenInNew, MdContentCopy } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowNewUrl = ({ originalUrl, newUrl }) => {
  const maxLength = 13;
  const truncatedText =
    originalUrl.length > maxLength
      ? originalUrl.slice(0, maxLength) + "..."
      : originalUrl;

  const deployedBackendUrl = "https://url-shortener-tfec.onrender.com"; // Replace this with the actual deployed backend URL

  const completeShortenedUrl = deployedBackendUrl + "/" + newUrl;
  const notify = () =>
    toast.success("Link Copied", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(completeShortenedUrl);
      // alert("Copied to clipboard!");
      notify();
      console.log("copied to clipboard");
    } catch (error) {
      console.log("Failed to copy:", error);
    }
  };

  return (
    <div className="container mx-auto bg-slate-300 w-full h-14 px-2 mt-3 rounded-lg flex flex-row items-center">
      {/* LINK */}
      <div className="flex flex-row  w-5/6 items-center">
        <div className="text-lg text-slate-500 overflow-hidden w-1/4">
          {truncatedText}
        </div>
        <a
          href={`https://url-shortener-tfec.onrender.com/${newUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg text-gray-700 hover:text-blue-500"
        >
          {`https://url-shortener-tfec.onrender.com/${newUrl}`}
        </a>
      </div>
      {/* ICONS */}
      <div className="flex flex-row justify-between space-x-4 text-2xl mx-auto">
        {/* <MdOutlineSettings className="cursor-pointer" /> */}
        <a
          href={`https://url-shortener-tfec.onrender.com/${newUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MdOpenInNew className="cursor-pointer hover:text-blue-500" />
        </a>
        <MdContentCopy
          className="cursor-pointer ml-auto hover:text-blue-500"
          onClick={handleCopyToClipboard}
        />
      </div>

      <ToastContainer />
    </div>
  );
};

export default ShowNewUrl;
