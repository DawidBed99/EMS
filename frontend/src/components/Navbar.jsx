import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Navbar = ({icon}) => {
const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{padding:"10px"}}>
          <Toolbar sx={{display:"flex", justifyContent:"space-between"}}>
            <IconButton
            onClick={()=>navigate("/")}
            sx={{marginRight:"100px"}}
            >
                <img id="NavImg" src={icon} alt="Site icon" style={{  width: "60px",
  height: '60px'}} />
            </IconButton>
            <Typography
            onClick={()=>navigate("/")}
            variant="h3"
            sx={{cursor:"pointer"}}
            >
              Employee Management App
            </Typography>
            <Button 
            onClick={()=>navigate('/addEmployee')}
            variant="contained" color="error" sx={{fontSize:"16px"}}>Add Employee</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
  };
  
  export default Navbar;