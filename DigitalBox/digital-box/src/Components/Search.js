import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Fragment, useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CancelScheduleSendIcon from "@mui/icons-material/CancelScheduleSend";
import SendIcon from "@mui/icons-material/Send";
import * as GoogleApi from "./GoogleApi";

const Search = (props) => {
  const [searchText, setSearchText] = useState("");

  useEffect(() => props.getContent(), []);

  const handleSearchClick = () => {
    props.setSearchValue(searchText);
  };

  const handleCancelClick = async () => {
    let orders = props.pdfItems.filter((item) => item.Checked !== false)

    if(orders.length < 1) return

    let cancelledIds = []
    orders.forEach(order => {
        cancelledIds.push(order.FileId)
    })
    await GoogleApi.cancelOrders(props.setPdfItems, props.setMessage, cancelledIds)
  };

  return (
    <Fragment>
      <InputLabel
        htmlFor="input-with-icon-adornment"
        style={{
          "padding-top": "3%",
          color: "black",
          "padding-bottom": "1%",
          fontFamily: "Alfa Slab One",
        }}
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
        sx={{ width: "50%" }}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button
        onClick={handleSearchClick}
        variant="contained"
        endIcon={<SendIcon />}
        sx={{ ml: "1vh", mb: "1vh", fontWeight: "bold", bgcolor: "black" }}
      >
        Search
      </Button>
      <Stack
        direction="row"
        align="right"
        spacing={2}
        sx={{ ml: "3%", pt: "3%" }}
      >
        <Button
          variant="contained"
          endIcon={<CancelScheduleSendIcon />}
          sx={{ bgcolor: "red", fontWeight: "bold", borderRadius: "10px" }}
          onClick={handleCancelClick}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          endIcon={<LocalShippingIcon />}
          sx={{ bgcolor: "green", fontWeight: "bold", borderRadius: "10px" }}
        >
          Ship
        </Button>
        <span style={{ display: "flex", "align-items": "center" }}>
          {props.pdfItems.filter((item) => item.Checked !== false).length}{" "}
          Item(s) Selected | {props.pdfItems.length} Order(s) Total
        </span>
      </Stack>
    </Fragment>
  );
};

export default Search;
