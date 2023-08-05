import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import NavigationIcon from "@mui/icons-material/Navigation";
import Button from "@mui/material/Button";
import RefreshIcon from "@mui/icons-material/Refresh";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";

export default function ButtonContainer() {
  return (
    <Box sx={{ "& > :not(style)": { m: 1 } }}>
      <Fab
        variant="extended"
        sx={{ bgcolor: "black", fontWeight: "bold", color: "white" }}
      >
        <CheckBoxIcon sx={{ mr: 1 }} />
        Select All
      </Fab>
      <Fab
        variant="extended"
        sx={{ bgcolor: "green", fontWeight: "bold", color: "white" }}
      >
        <LocalShippingIcon sx={{ mr: 1 }} />
        Ship
      </Fab>
      <Fab
        variant="extended"
        sx={{ bgcolor: "red", fontWeight: "bold", color: "white", '&:hover': {
            bgcolor: "blue",
         } }}
      >
        <CancelScheduleSendIcon sx={{ mr: 1 }} />
        Cancel
      </Fab>
      <Fab
        variant="extended"
        sx={{ bgcolor: "blue", fontWeight: "bold", color: "white" }}
      >
      <RefreshIcon sx={{paddingRight: '.5vh'}} />
      Refresh Labels
      
      </Fab>
    </Box>
  );
}
