import React, { useRef, useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { BsCloudUploadFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import logo from "../../public/pngwing.com (3).png";

const Navbar = (props) => {
  const chooseFileRef = useRef(null);
  const languages = [
    { value: "c", label: "C" },
    { value: "cpp", label: "C++" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "Javascript" },
  ];

  const handleChange = (event) => {
    props.setUserLang(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const allowedExtensions = [
      "txt",
      "cpp",
      "c",
      "py",
      "js",
      "ts",
      "jsx",
      "tsx",
      "java",
    ];

    // Check if a file is selected
    if (file) {
      const fileExtension = file.name.split(".").pop();
      if (!allowedExtensions.includes(fileExtension)) {
        alert("Please upload a valid file");
        return;
      }

      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target.result;
        props.setUserCode(fileContent);
      };

      reader.readAsText(file);
    }
  };

  const handleUploadClick = () => {
    // Trigger the file input's click event
    chooseFileRef.current.click();
  };

  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth > 880);

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth > 880);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="navbar bg-blue-50 flex flex-wrap items-center justify-between p-2">
      <div className="text-black flex items-center gap-2">
        <span>
          <img src={logo} style={{ height: 50 }} alt="Logo" />
        </span>
        {isWideScreen && (
          <span className="font-mono font-extralight text-lg">Visual Studio Code</span>
        )}
      </div>
      <div className="hidden">
        <input
          type="file"
          accept="*/*"
          onChange={handleFileChange}
          ref={chooseFileRef}
        />
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <FormControl sx={{ minWidth: 120 }} size="small" className="text-white">
          <Select
            value={props.userLang}
            onChange={handleChange}
            displayEmpty
            className="bg-blue-50"
          >
            <MenuItem value="" disabled>
              Language
            </MenuItem>
            {languages.map((language) => (
              <MenuItem key={language.label} value={language.value}>
                {language.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          className="focus:outline-none flex gap-2"
          onClick={props.compile}
        >
          <FaPlay />
          Run
        </Button>
      </div>
      <div className={`${isWideScreen ? "flex-row-reverse" : "text-center mt-2"}`}>
        <BsCloudUploadFill
          onClick={handleUploadClick}
          className={`cursor-pointer ${isWideScreen ? "float-right ml-2 mr-3" : "mx-auto"}`}
          size={30}
          color="black"
          title="upload file"
        />
        <span className="text-black font-semibold ml-2 cursor-pointer" onClick={handleUploadClick}>
          Upload File
        </span>
      </div>

    </div>
  );
};

export default Navbar;
