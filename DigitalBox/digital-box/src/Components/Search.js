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

  useEffect(() => props.handleGetFileContent(searchText), []);

  const handleSearchClick = (e) => {
    e.preventDefault();
    props.setSearchValue(searchText);
    props.handleGetFileContent();
    props.setSearchCount(props.searchCount + 1);
  };

  const handleCancelClick = async () => {
    let orders = props.pdfItems.filter((item) => item.Checked !== false);

    if (orders.length < 1) return;

    let cancelledIds = [];
    orders.forEach((order) => {
      cancelledIds.push(order.FileId);
    });
    if (
      window.confirm(
        `Are you sure you want to cancel ${orders.length} order(s)?`
      )
    ) {
      await GoogleApi.cancelOrders(
        props.setPdfItems,
        props.setMessage,
        cancelledIds
      );
    } else {
      //do nothing
    }
  };

  const handleShipClick = async () => {
    let orders = props.pdfItems.filter((item) => item.Checked !== false);

    if (orders.length < 1) return;

    let shippedIds = [];
    orders.forEach((order) => {
      shippedIds.push(order.FileId);
    });

    if (
      window.confirm(`Are you sure you want to ship ${orders.length} order(s)?`)
    ) {
      props.setMessage("Shipping... please wait a moment.");
      await GoogleApi.shipOrders(
        props.setPdfItems,
        props.setMessage,
        shippedIds
      );
    } else {
      // do nothing
    }
  };

  const handleSelectAll = async () => {
    let pagedItems = props.pdfItems.filter((item, index) => {
      return !(index > props.page * 25 - 1 || index < props.page * 25 - 25);
    });
    let orders = [];

    console.log(pagedItems);

    if (pagedItems.every((pagedItem) => pagedItem.Checked)) {
      orders = props.pdfItems.map((item, index) => {
        if (index > props.page * 25 - 1 || index < props.page * 25 - 25) {
          return item;
        } else {
          return { ...item, Checked: false };
        }
      });
    } else {
      orders = props.pdfItems.map((item, index) => {
        if (index > props.page * 25 - 1 || index < props.page * 25 - 25) {
          return item;
        } else {
          return { ...item, Checked: true };
        }
      });
    }
    props.setPdfItems(orders);
  };

  return (
    <Fragment>
      <form onSubmit={handleSearchClick}>
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
          type="submit"
          variant="contained"
          endIcon={<SendIcon />}
          sx={{ ml: "1vh", mb: "1vh", fontWeight: "bold", bgcolor: "black" }}
        >
          Search
        </Button>
      </form>
      <Stack
        direction="row"
        align="right"
        spacing={2}
        sx={{ ml: "3%", pt: "3%" }}
      >
        <Button
          variant="contained"
          sx={{ bgcolor: "black", fontWeight: "bold", borderRadius: "10px" }}
          onClick={handleSelectAll}
        >
          Select All
        </Button>
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
          onClick={handleShipClick}
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
