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

function App() {
  const [pdfItems, setPdfItems] = useState([]);
  const [credentialsLoaded, setCredentialsLoaded] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => GoogleApi.getGoogleCredentials(setCredentialsLoaded), []);
  useEffect(() => GoogleApi.InitializeGoogleDrive(), [credentialsLoaded]);
  useEffect(() => handleGetFileContent(), [searchValue]);

  const handleLogin = () => {
    GoogleApi.authenticate(setSignedIn);
  };

  const handleGetFileContent = () => {
    GoogleApi.getFileContent(setPdfItems, setMessage, searchValue);
  };

  return (
    <div className="App">
      <GlobalStyles styles={{ body: { "font-family": "Alfa Slab One" } }} />
      {signedIn ? (
        <Fragment>
          <NavBar />
          {message !== "" ? (
            <AlertUI propMessage={message} setMessage={setMessage} />
          ) : null}
          <Search
            pdfItems={pdfItems}
            handleGetFileContent={handleGetFileContent}
            setPdfItems={setPdfItems}
            setSearchValue={setSearchValue}
            setMessage={setMessage}
            page={page}
          />
          <ContentTable
            pdfItems={pdfItems}
            setPdfItems={setPdfItems}
            page={page}
            setPage={setPage}
          />
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
            onClick={handleLogin}
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
