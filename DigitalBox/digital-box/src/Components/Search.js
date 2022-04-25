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

const Search = (props) => {
    const [searchValue, setSearchValue] = useState('')

  const inputValue = useRef(null);

  useEffect(() => props.getContent(), []);
  useEffect(() => {
    props.getContent()
  }, [searchValue])

  const handleSearchClick = () => {
    setSearchValue(inputValue.target.value)
  };

  //   const hasSearchParam = (item) => {
  //       let found = false
  //       item.FileContents.forEach(content => {
  //             if( content.Title.includes(searchValue) || content.OrderNumber.includes(searchValue) ){
  //                 found = true
  //             }
  //         })
  //         return found
  //   }

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
        ref={inputValue}
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
