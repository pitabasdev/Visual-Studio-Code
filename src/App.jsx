import "./App.css";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";


function App() {
  const [userCode, setUserCode] = useState("");
  const [userLang, setUserLang] = useState("");
  const [fontSize, setFontSize] = useState(16);
  const [userInput, setUserInput] = useState("");
  const [userOutput, setUserOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const options = {
    fontSize: fontSize,
    scrollbar: {
      vertical: "hidden",
    },
    formatOnType: true,
    formatOnPaste: true,
    dragAndDrop: true,
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const compile = async () => {
    setIsLoading(true);
    setUserOutput("");
    if (userLang === "") {
      alert("Please select a language!");
      setIsLoading(false);
    }
    if (userCode === "") {
      setIsLoading(false);
      return;
    }
    const backendUrl="http://localhost:3001/compile"
    const response = await axios.post(backendUrl, {
      code: userCode,
      lang: userLang,
      input: userInput,
    });
    setUserOutput(response.data.stderr || response.data.stdout);
    setIsLoading(false);
  };
  return (
    <div className="App flex w-[100%] h-[100vh] border">
      <div className="left-component relative w-[70%]">
        <Navbar
          compile={compile}
          userLang={userLang}
          setUserLang={setUserLang}
          setUserCode={setUserCode}
        />
        <Editor
          height="100vh"
          width="100%"
          theme="vs-dark"
          language={userLang}
          defaultLanguage="python"
          defaultValue="# Enter your code here"
          value={
            !userCode
              ? userLang != "python"
                ? "// write your code here"
                : "# write your code here"
              : userCode
          }
          onChange={(value) => {
            setUserCode(value);
          }}
          options={options}
        />
      </div>
      <div className="right-component relative w-[30%]">
        <h3>Input:</h3>
        <div className="input h-1/3">
          <textarea
            name=""
            id=""
            value={userInput}
            onChange={handleInputChange}
            className="flex-[50%] w-full h-full border-none outline-none resize-none p-2"
          ></textarea>
        </div>
        <h3 className="pl-2">Output</h3>
        {isLoading ? (
          <div className="output border h-2/3 bg-white flex justify-center text-black p-2 font-medium overflow-auto">
            <img src="/loader.svg" alt="...loading" />
          </div>
        ) : (
          <div className="output border h-2/3 bg-white text-black p-2 font-medium overflow-auto whitespace-pre">
            {userOutput.includes("error") ? (
              <div>Error: {userOutput.split("error")[1]}</div>
            ) : (
              userOutput?.split("\n").map((line, index) => (
                <div key={index}>
                  {line}
                  <br />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
