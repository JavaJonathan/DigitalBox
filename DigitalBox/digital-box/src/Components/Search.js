import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Fragment } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";

const Search = () => {
  return (
    <Fragment>
      <InputLabel
        htmlFor="input-with-icon-adornment"
        style={{ "padding-top": "3%" }}
      >
        Search for anything
      </InputLabel>
      <Input
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        sx={{ width: "30%" }}
      />
      <Stack direction="row" align="right" spacing={2} sx={{ ml: "3%" }}>
        <Button
          variant="contained"
          endIcon={<CancelScheduleSendIcon />}
          sx={{ bgcolor: "red" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          endIcon={<LocalShippingIcon />}
          sx={{ bgcolor: "green" }}
        >
          Ship
        </Button>
      </Stack>
    </Fragment>
  );
};

export default Search;
