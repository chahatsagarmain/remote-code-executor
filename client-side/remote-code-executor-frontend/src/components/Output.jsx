import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { MyContext } from "../context/Context";
import { FormControl } from "@mui/material";
import Textarea from '@mui/joy/Textarea';

function Output() {
  const { code, lang } = useContext(MyContext);
  const [Output, setOutput] = useState(null);
  const [input, setInput] = useState("");

  const fetchOutput = async () => {
    try {
      const language = lang.language.name.toString();
      const data = new FormData();
      data.append("code", code);
      data.append("inp", input);

      const options = {
        method: "POST",
        body: data,
      };

      let response = null;
      console.log("request sent");
      console.log(input);
      switch (language) {
        case "python":
          response = await fetch("http://localhost:8080/api/python/", options);
          break;

        case "javascript":
          response = await fetch("http://localhost:8080/api/js/", options);
          break;

        case "cpp":
          response = await fetch("http://localhost:8080/api/cpp/", options);
          break;

        default:
          throw new Error("Invalid language");
      }

      if (!response.ok) {
        const text = await response.text();
        alert(text);
        return;
      }

      const output = await response.json();
      setOutput(output.output);
    } catch (error) {
      setOutput(error.toString());
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{display : "flex",
                justifyContent : "center"
              }}>
        <FormControl>
          <Textarea
            placeholder="Enter Inputs here"
            minRows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{
              width : "90vw",
              backgroundColor : "#2d2d30",
              color : "white"
            }}

        />
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        <Button variant="contained" onClick={fetchOutput}>
          SUBMIT
        </Button>
        <Typography sx={{ marginLeft: 5, fontSize: "20px", color: "white" }}>
          Language selected: {lang.language.name.toString()}
        </Typography>
      </Box>

      <Box
        sx={{
          width: "90vw",
          backgroundColor: Output === null ? "#22222b" : "#2d2d30",
          height: "200px",
          overflow: "auto",
          padding: "10px",
          alignSelf: "center",
          borderRadius: "5px",
        }}
      >
        <Typography sx={{ color: "#FFA500" }}>
          {Output !== null && Output}
        </Typography>
      </Box>
    </Box>
  );
}

export default Output;
