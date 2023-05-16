import "./App.css";
import React, { Fragment, useEffect, useState } from "react";
import * as GoogleApi from "./Components/GoogleApi";
import NavBar from "./Components/NavBar";
import AlertUI from "./Components/Alert";
import ContentTable from "./Components/ContentTable";
import GoogleIcon from "@mui/icons-material/Google";
import Button from "@mui/material/Button";
import Search from "./Components/Search";
import "@fontsource/alfa-slab-one";
import GlobalStyles from "@mui/material/GlobalStyles";
import Help from "./Components/Help";
import { useGoogleLogin } from '@react-oauth/google';

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
     let token = localStorage.getItem("DigitalBoxToken")

     if(token) {
       setSignedIn(true)
     }
  }, []);

  useEffect(() => {
    if(authToken !== "") localStorage.setItem("DigitalBoxToken", authToken)
 }, [authToken]);

  useEffect(() => { if(signedIn) handleGetFileContent() }, [searchCount]);

  const login = useGoogleLogin({
    onSuccess: tokenResponse => 
    {
      console.log(tokenResponse);
      localStorage.setItem("DigitalBoxToken", `${tokenResponse.access_token}`) 
      setSignedIn(true); 
    },
  });

  const handleGetFileContent = () => {
    GoogleApi.getFileContent(setPdfItems, setMessage, searchValue, setIsLoading, setAuthToken);
  };

  return (
    <div className="App">
      <GlobalStyles styles={{ body: { "font-family": "Alfa Slab One" } }} />
      {signedIn ? (
        <Fragment>
          <NavBar setHelp={setHelp} help={help} />
          {help ? (
            <Help />
          ) : (
            <Fragment>
              {message !== "" ? (
                <AlertUI propMessage={message} setMessage={setMessage} setSignedIn={setSignedIn} />
              ) : null}
              <Search
                pdfItems={pdfItems}
                handleGetFileContent={handleGetFileContent}
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
