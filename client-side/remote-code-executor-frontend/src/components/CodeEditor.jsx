import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import CodeMirror from "@uiw/react-codemirror";
import { Box } from "@mui/material";
import { useContext } from "react";
import { MyContext } from "../context/Context";
import { useEffect } from "react";

function CodeEditor() {
    const { code, setCode, lang} = useContext(MyContext);
    
    const typeCode = (value , valueUpdate) => {
        const language = lang.language.name;
        setCode({...code, [language] : value});
        localStorage.setItem("code",JSON.stringify(code));
    }

    useEffect(() => {
      let loadedCode = JSON.parse(localStorage.getItem("code"));
      console.log(loadedCode)
      if(loadedCode){
        setCode(loadedCode);
      }
    },[]);

    return (
      <Box sx={{display :"flex" , justifyContent:"center" , marginTop :"25px"}}>
        <CodeMirror
          value={code[lang.language.name]}
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
