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
import Help from "./Components/Help";
import { useGoogleLogin } from "@react-oauth/google";
import ButtonContainer from "./Components/ButtonContainer";

function App() {
  const [pdfItems, setPdfItems] = useState([]);
  const [authToken, setAuthToken] = useState("");
  const [signedIn, setSignedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);
  const [help, setHelp] = useState(false);
  const [searchCount, setSearchCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("DigitalBoxToken");

    if (token) {
      setSignedIn(true);
    }
  }, []);

  useEffect(() => {
    if (authToken !== "") localStorage.setItem("DigitalBoxToken", authToken);
  }, [authToken]);

  useEffect(() => {
    if (signedIn) handleSearch();
  }, [searchCount]);

  const login = useGoogleLogin({
    scope:
      "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.appfolder https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.resource https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.readonly.metadata https://www.googleapis.com/auth/drive.photos.readonly https://www.googleapis.com/auth/drive.readonly",
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      localStorage.setItem("DigitalBoxToken", `${tokenResponse.access_token}`);
      setSignedIn(true);
    },
  });

  const handleSearch = () => {
    HttpHelper.searchOrders(
      setPdfItems,
      setMessage,
      searchValue,
      setIsLoading,
      setAuthToken
    );
  };

  return (
    <div className="App">
      <GlobalStyles
        styles={{
          body: {
            "font-family":
              "Alfa Slab One" /*, "background": 'linear-gradient(to right bottom, #414141, #000000)'*/,
          },
        }}
      />
      {signedIn ? (
        <Fragment>
          <NavBar setHelp={setHelp} help={help} />
          {help ? (
            <Help />
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
                setPdfItems={setPdfItems}
                setSearchValue={setSearchValue}
                setMessage={setMessage}
                page={page}
                searchCount={searchCount}
                setSearchCount={setSearchCount}
                setIsLoading={setIsLoading}
                isLoading={isLoading}
                setAuthToken={setAuthToken}
              />
              <ButtonContainer />
              <ContentTable
                pdfItems={pdfItems}
                setPdfItems={setPdfItems}
                page={page}
                setPage={setPage}
                searchCount={searchCount}
              />
            </Fragment>
          )}
        </Fragment>
      ) : (
        <div
          style={{
            display: "flex",
            flex: 1,
            "min-height": "93vh",
            "justify-content": "center",
            "align-items": "center",
            "font-family": "Alfa Slab One",
            "font-size": "72px",
            "flex-direction": "column",
            "padding-bottom": "20px",
          }}
        >
          {"<Digital Box />"}
          <br />
          <Button
            onClick={login}
            variant="contained"
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
