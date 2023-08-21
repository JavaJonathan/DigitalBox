import "./App.css";
import React, { Fragment, useEffect, useState } from "react";
import * as HttpHelper from "./Components/HttpHelper";
import NavBar from "./Components/NavBar";
import AlertUI from "./Components/Alert";
import ContentTable from "./Components/ContentTable";
import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";
import Search from "./Components/Search";
import "@fontsource/alfa-slab-one";
import GlobalStyles from "@mui/material/GlobalStyles";
import OrderHistory from "./Components/OrderHistory";
import { useGoogleLogin } from "@react-oauth/google";
import ButtonContainer from "./Components/ButtonContainer";

function App() {
  //state defined in App.js is gloabl and passed via props, we could use this opportunity to implement the Redux pattern
  const [pdfItems, setPdfItems] = useState([]);
  const [authToken, setAuthToken] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [page, setPage] = useState(1);
  const [orderHistory, setOrderHistory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sortedByTitle, setSortedByTitle] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("DigitalBoxToken");

    if (token) {
      setSignedIn(true);
    }
  }, []);

  useEffect(() => {
    if (authToken !== "") localStorage.setItem("DigitalBoxToken", authToken);
  }, [authToken]);

  const login = useGoogleLogin({
    scope:
      "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.appfolder https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.resource https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.readonly.metadata https://www.googleapis.com/auth/drive.photos.readonly https://www.googleapis.com/auth/drive.readonly",
    onSuccess: (tokenResponse) => {
      localStorage.setItem("DigitalBoxToken", `${tokenResponse.access_token}`);
      setSignedIn(true);
    },
  });

  const handleSearch = (searchValue) => {
    HttpHelper.searchOrders(
      setPdfItems,
      setMessage,
      searchValue,
      setIsLoading,
      setAuthToken
    );
    setPage(1);
  };

  const handleCanceledSearch = (searchValue) => {
    HttpHelper.searchCanceledOrders(
      setPdfItems,
      setMessage,
      searchValue,
      setIsLoading,
      setAuthToken
    );
    setPage(1);
  };

  const handleShippedSearch = (searchValue) => {
    HttpHelper.searchShippedOrders(
      setPdfItems,
      setMessage,
      searchValue,
      setIsLoading,
      setAuthToken
    );
    setPage(1);
  };

  const handleRefreshOrders = () => {
    HttpHelper.refreshOrders(
      setPdfItems,
      setMessage,
      "",
      setIsLoading,
      setAuthToken
    );
  };

  const handleSortClick = () => {
    let localPdfItems = pdfItems.map(item => { 
      return {...item, Checked: false} 
    })

    if (sortedByTitle) {
      localPdfItems.sort(
        (a, b) =>
          Date.parse(a.FileContents[0].ShipDate) -
          Date.parse(b.FileContents[0].ShipDate)
      )
      setPdfItems(localPdfItems);
      setSortedByTitle(false);
    } else {
      localPdfItems.sort(
        (a, b) =>
          a.FileContents[0].Title.localeCompare(b.FileContents[0].Title) ||
          Date.parse(a.FileContents[0].ShipDate) -
            Date.parse(b.FileContents[0].ShipDate)
      )
      setPdfItems(localPdfItems);
      setSortedByTitle(true);
    }
  };

  return (
    <div className="App">
      <GlobalStyles
        styles={{
          body: {
            "font-family": "Alfa Slab One",
            // background: "linear-gradient(180deg, rgba(249,249,249,1) 8%, rgba(220,220,220,1) 29%, rgba(91,123,197,1) 100%)",
          },
        }}
      />
      {signedIn ? (
        <Fragment>
          <NavBar
            setIsLoading={setIsLoading}
            setOrderHistory={setOrderHistory}
            orderHistory={orderHistory}
          />
          {orderHistory ? (
            <Fragment>
              {message !== "" ? (
                <AlertUI
                  propMessage={message}
                  setMessage={setMessage}
                  setSignedIn={setSignedIn}
                />
              ) : null}
              <OrderHistory
                pdfItems={pdfItems}
                setPdfItems={setPdfItems}
                page={page}
                setPage={setPage}
                handleSortClick={handleSortClick}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                handleSearch={handleSearch}
                handleCanceledSearch={handleCanceledSearch}
                handleShippedSearch={handleShippedSearch}
                sortedByTitle={sortedByTitle}
              />
            </Fragment>
          ) : (
            <Fragment>
              {message !== "" ? (
                <AlertUI
                  propMessage={message}
                  setMessage={setMessage}
                  setSignedIn={setSignedIn}
                />
              ) : null}
              <Search
                pdfItems={pdfItems}
                handleSearch={handleSearch}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                renderSelected={true}
              />
              <ButtonContainer
                page={page}
                pdfItems={pdfItems}
                setAuthToken={setAuthToken}
                setMessage={setMessage}
                setPdfItems={setPdfItems}
                handleRefreshOrders={handleRefreshOrders}
              />
              <ContentTable
                pdfItems={pdfItems}
                setPdfItems={setPdfItems}
                page={page}
                setPage={setPage}
                handleSortClick={handleSortClick}
                renderSwitch={true}
                sortedByTitle={sortedByTitle}
              />
            </Fragment>
          )}
        </Fragment>
      ) : (
        <div
          style={{
            display: "flex",
            flex: 1,
            minHeight: "93vh",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Alfa Slab One",
            fontSize: "72px",
            flexDirection: "column",
            pb: "20px",
            background:
              "linear-gradient(90deg, rgba(69,136,242,1) 12%, rgba(7,140,252,1) 46%, rgba(6,0,96,1) 94%)",
          }}
        >
          {"<Digital Box />"}
          <br />
          <Button
            onClick={login}
            variant="contained"
            style={{ background: "black" }}
            endIcon={<GoogleIcon fontSize="large" />}
          >
            Sign In With Google
          </Button>
        </div>
      )}
    </div>
  );
}

export default App;
