import { useState } from "react";
import Divider from "@mui/material/Divider";
import ContentTable from "./ContentTable";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Search from "./Search";
import { green } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const OrderHistory = ({pdfItems, setPdfItems, page, setPage, searchCount, handleSortClick, setSearchCount, isLoading, setIsLoading, setSearchValue, handleCanceledSearch, handleShippedSearch}) => {
  const [tabValue, setTabValue] = useState(0)

  const handleTabValueChange = (event, newValue) => {
    setTabValue(newValue);
  }
  const theme = createTheme({
    palette: {
      secondary: green,
    },
  });

  return (
    <ThemeProvider theme={theme}>
    <Search 
      pdfItems={pdfItems}
      handleSearch={tabValue === 0 ? handleShippedSearch : handleCanceledSearch}
      setSearchValue={setSearchValue}
      searchCount={searchCount}
      setSearchCount={setSearchCount}
      setIsLoading={setIsLoading}
      isLoading={isLoading}
      //tabValue={tabValue}
    />
    <Tabs value={tabValue} indicatorColor="secondary" textColor="secondary" centered onChange={handleTabValueChange}>
      <Tab label="Shipped" sx={{fontWeight:'bold', color:'green'}} />
      <Divider orientation="vertical" variant="middle" flexItem ></Divider>
      <Tab label="Canceled" sx={{fontWeight:'bold', color:'red'}} />
    </Tabs>
  <ContentTable 
    pdfItems={pdfItems}
    setPdfItems={setPdfItems}
    page={page}
    setPage={setPage}
    searchCount={searchCount}
    handleSortClick={handleSortClick}
  />
  </ThemeProvider>
  )
};

export default OrderHistory;
