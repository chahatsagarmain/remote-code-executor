import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";
import { Box } from "@mui/material";
import { useContext } from "react";
import { MyContext } from "../context/Context";

function CodeEditor() {
    const { code, setCode, lang } = useContext(MyContext);
    
    const typeCode = (value , valueUpdate) => {
        console.log(value);
        setCode(value);
    }

    return (
      <Box sx={{display :"flex" , justifyContent:"center" , marginTop :"25px"}}>
        <CodeMirror
          value={code}
          height="60vh"
          width="90vw"
          theme={vscodeDark}
          extensions={[lang]}
          onChange={typeCode}
        />
      </Box>
    );
  }
export default CodeEditor;
