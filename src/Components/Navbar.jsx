import React, { useRef } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { BsCloudUploadFill } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";

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

  return (
    <div className="navbar bg-blue-50 flex items-center justify-between p-1 w-[98.2%]">
      <div className="text-black flex justify-start m-2 font-mono font-extralight from-neutral-700 text-lg gap-3 items-center">
        Approach Junction
        <BsCloudUploadFill
          onClick={handleUploadClick}
          className="cursor-pointer"
          size={20}
          color="black"
          title="upload file"
        />
      </div>
      <div className="hidden">
        <input
          type="file"
          accept="*/*"
          onChange={handleFileChange}
          ref={chooseFileRef}
        />
      </div>
      <div className=" gap-5 flex justify-start items-center mr-2">
        <FormControl sx={{ minWidth: 120 }} size="small" className="text-white">
          <Select
            value={props.userLang}
            onChange={handleChange}
            displayEmpty
            className="bg-blue-50"
          >
            <MenuItem value="">
              <em>Language</em>
            </MenuItem>
            {languages.map((language) => {
              return (
                <MenuItem key={language.label} value={language.value}>
                  {language.label}
                </MenuItem>
              );
            })}
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
    </div>
  );
};

export default Navbar;
