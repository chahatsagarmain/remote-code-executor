import Button from '@mui/material/Button';
import CodeMirror from "@uiw/react-codemirror";

function App() {

  return (
    <div>
      <Button variant="contained">Hello world</Button>
      <CodeMirror
      value={code}
      height="100px"
      theme={vscodeDark}
    />
    </div>
  )
}

export default App
