import { useState } from "react";
import "./App.css";
import { SiConvertio } from "react-icons/si";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import ShowNewUrl from "./components/ShowNewUrl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [url, setUrl] = useState("");
  const [newUrlData, setNewUrlData] = useState(null);
  const notify = () =>
    toast.error("Add an URL first", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifydelete = () =>
    toast.info("🦄 Wow so easy!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const handleSaveUrl = () => {
    if (!url) return notify();
    const completeUrl = url; // Adding the "https://" prefix
    const data = { url: completeUrl };

    axios
      .post("https://url-shortener-tfec.onrender.com/url", data)
      .then((response) => {
        console.log("success");
        setUrl("");
        setNewUrlData(response.data); // Save the response data with original and new URLs
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //handle detele all url
  const handleDeleteUrl = () => {
    axios
      .delete("https://url-shortener-tfec.onrender.com/url")
      .then((response) => {
        console.log("success");
        setUrl("");
        notifydelete();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="bg-gradient-to-t from-blue-900 to-blue-300 h-screen flex items-center justify-center font-customFont">
        <div className="container mx-auto flex flex-col items-center px-2">
          <h1 className="text-white text-4xl mb-20">URL Shortener</h1>
          <div className="container mx-auto flex flex-row justify-between">
            {/* <h1 className="bg-gray-400 text-white text-lg flex items-center my-auto h-20 rounded-tl-lg rounded-bl-lg px-2 shadow-md font-semibold">
              https://
            </h1> */}
            <input
              className=" h-20 w-full p-3 text-lg focus:outline-none shadow-md rounded-tl-lg rounded-bl-lg"
              type="text"
              placeholder="yoururl.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              className="bg-red-400 px-2 hover:bg-red-700 py-1  font-semibold shadow-md"
              onClick={handleSaveUrl}
            >
              <SiConvertio className="w-16 h-16 hover:text-white" />
            </button>
            <button
              className="bg-red-400 px-2 hover:bg-red-700 py-1 rounded-tr-lg rounded-br-lg font-semibold shadow-md"
              onClick={handleDeleteUrl}
            >
              <FaTrashAlt className="w-16 h-16 hover:text-white" />
            </button>
          </div>
          {/* <ShowNewUrl /> */}
          {newUrlData && (
            <ShowNewUrl
              originalUrl={newUrlData.url}
              newUrl={newUrlData.shortUrl}
            />
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
