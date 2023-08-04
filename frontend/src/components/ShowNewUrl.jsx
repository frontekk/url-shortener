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
    <div className="container mx-auto bg-slate-300 w-full h-14 px-2 mt-3 rounded-lg flex flex-row justify-between items-center">
      <div className="text-lg text-slate-500 overflow-hidden">
        {truncatedText}
      </div>
      <a
        href={`http://localhost:5000/${newUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lg text-gray-700"
      >
        {`http://localhost:5000/${newUrl}`}
      </a>
      <div className="flex flex-row justify-between space-x-3 text-2xl">
        {/* <MdOutlineSettings className="cursor-pointer" /> */}
        <a
          href={`http://localhost:5000/${newUrl}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <MdOpenInNew className="cursor-pointer" />
        </a>
        <MdContentCopy
          className="cursor-pointer"
          onClick={handleCopyToClipboard}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default ShowNewUrl;
