import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";

const NavBar = (props) => {
  const handleTroubleshootClick = () => {
    props.setHelp(true);
  };

  const handleHomeClick = () => {
    props.setHelp(false);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{
          background: "linear-gradient(to right bottom, #000428, #004e92)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontFamily: "Alfa Slab One" }}
          >
            {"<DigitalBox />"}
          </Typography>
          {props.help ? (
            <Button
              variant="contained"
              size="small"
              color="success"
              onClick={handleHomeClick}
              sx={{ position: "absolute" }}
            >
              Back Home
            </Button>
          ) : (
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={handleTroubleshootClick}
              sx={{ position: "absolute" }}
            >
              Troubleshoot
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
