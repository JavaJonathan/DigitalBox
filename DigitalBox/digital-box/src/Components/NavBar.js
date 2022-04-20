import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";

const NavBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ "background-color": "black" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontFamily: "Alfa Slab One" }}
          >
            {"<DigitalBox />"}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
