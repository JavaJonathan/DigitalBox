import "./App.css";
import React, { Fragment, useEffect, useState } from "react";
import * as GoogleApi from "./Components/GoogleApi";
import NavBar from "./Components/NavBar";
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

  useEffect(() => GoogleApi.getGoogleCredentials(setCredentialsLoaded), []);
  useEffect(() => GoogleApi.InitializeGoogleDrive(), [credentialsLoaded]);

  const handleLogin = () => {
    GoogleApi.authenticate(setSignedIn);
  };

  const handleGetFiles = () => {
    GoogleApi.execute();
  };

  const handleGetFileContent = () => {
    GoogleApi.getFileContent(pdfItems, setPdfItems);
  };

  return (
    <div className="App">
      <GlobalStyles styles={{ body: { "font-family": "Alfa Slab One" } }} />
      {signedIn ? (
        <Fragment>
          <NavBar />
          <Search pdfItems={pdfItems} />
          <ContentTable pdfItems={pdfItems} setPdfItems={setPdfItems} />
          <button onClick={handleGetFiles}> Get Files</button>
          <button onClick={handleGetFileContent}> Download File</button>
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
