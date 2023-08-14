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
import * as GoogleApi from "./HttpHelper";
import { Box } from "@mui/material";

const Search = ({
  setSearchValue,
  setSearchCount,
  setIsLoading,
  pdfItems,
  handleSearch,
  searchCount,
  isLoading,
  tabValue
}) => {
  const [searchText, setSearchText] = useState("");

  useEffect(() => handleSearch(searchText), []);

 // useEffect(() => handleSearch(searchText), [tabValue]);

  const handleSearchClick = (e) => {
    e.preventDefault();
    setSearchValue(searchText);
    setSearchCount(searchCount + 1);
    setIsLoading(true);
  };

  return (
    <Fragment>
      <box alignItems="center" justifyContent="center">
        <form onSubmit={handleSearchClick}>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            sx={{ width: "50%", pt: "2%" }}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            endIcon={<SendIcon />}
            sx={{ ml: "1vh", mb: "1vh", fontWeight: "bold", bgcolor: "black" }}
            
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Search"}
          </Button>
        </form>
      </box>
      <Stack
        direction="row"
        spacing={2}
        sx={{ ml: "3%", pt: "1%", display: "flex", pb: "1%" }}
        alignItems="center"
        justifyContent="center"
      >
        <Box component="span" sx={{ fontSize: 24, color: "black" }}>
          {pdfItems.filter((item) => item.Checked !== false).length} Order(s)
          Selected | {pdfItems.length} Order(s) Total
        </Box>
      </Stack>
    </Fragment>
  );
};

export default Search;
