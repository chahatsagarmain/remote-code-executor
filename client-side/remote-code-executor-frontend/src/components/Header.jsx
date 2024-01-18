import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useContext } from "react";
import { MyContext } from "../context/Context";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";

function Header() {
  const { lang, setLang } = useContext(MyContext);

  const changePy = (event) => {
    setLang(python);
  };

  const changeJs = (event) => {
    setLang(javascript);
  };

  const changeCpp = (event) => {
    setLang(cpp);
  };

  return (
    <AppBar position="static" style={{ background: "#000033" }}>
      <Toolbar variant="dense">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box>
            <Typography variant="h6" color="inherit" component="div">
              CodeRunner
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              style={{
                marginRight: 5,
                background: "#00004d",
              }}
              id="python"
              onClick={changePy}
            >
              Python
            </Button>
            <Button
              variant="contained"
              style={{ marginRight: 5, background: "#00004d" }}
              id="javascript"
              onClick={changeJs}
            >
              Javascript
            </Button>
            <Button
              variant="contained"
              style={{ marginRight: 5, background: "#00004d" }}
              id="cpp"
              onClick={changeCpp}
            >
              C++
            </Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
