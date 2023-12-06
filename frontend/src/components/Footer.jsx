import { Box, Typography } from "@mui/material";
const Footer = () => {


    return (
        <Box sx={{width:"100%", height:"50px",background:"black", position:"fixed", bottom:"0", display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Typography padding="20px" variant="h6" color={"white"}>Made by Dawid Bednarz</Typography>
        </Box>
    );
  };
  
  export default Footer;