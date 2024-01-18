import { Box, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { MyContext } from "../context/Context";

function Output() {
    const { code, lang } = useContext(MyContext);
    const [output, setOutput] = useState(null);

    const submitCode = () => {
        setOutput("Fetching...");
        fetchOutput();
    };

    async function fetchOutput(){
        try{
            
        }
        catch(error){
            setOutput(error.toString());
            return;
        }
    };

    return (
        <Box sx={{display : "flex" ,
                flexDirection : "column"}}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px",
                }}
            >
                <Button variant="contained" onClick={submitCode}>
                    SUBMIT
                </Button>
                <Typography sx={{ marginLeft: 5, fontSize: "20px", color: "white" }}>
                    Language selected: {lang.language.name.toString()}
                </Typography>
            </Box>


            <Box
                sx={{
                    width: "90vw",
                    backgroundColor: output === null ? "#22222b" : "#2d2d30",
                    height: "200px",
                    overflow: "auto",
                    padding: "10px",
                    alignSelf : "center",
                    borderRadius: "5px",

                }}
            >
                <Typography sx={{ color: "#FFA500" }}>{output !== null && output}</Typography>
            </Box>

        </Box>
    );
}

export default Output;
