import { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import { Box } from '@mui/material';
import Header from "./components/Header";
import { MyContext } from './context/Context';
import { javascript } from '@codemirror/lang-javascript';
import Output from './components/Output';

function App() {
  const [code, setCode] = useState(
  `function add(a, b) {\n  return a + b;\n}`);

  const [lang,setLang] = useState(javascript);

  return (
    <Box sx={{backgroundColor : "#22222b" , height:"100%"}}>
      <MyContext.Provider value={{code , setCode , lang , setLang}}>
        <Header />
        <CodeEditor />
        <Output />
      </MyContext.Provider>
     </Box>
  )
}

export default App;
