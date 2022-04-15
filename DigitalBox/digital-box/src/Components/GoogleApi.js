import { gapi } from 'gapi-script';

let credentials = {}

export async function getGoogleCredentials(setCredentialsLoaded){
    fetch('http://localhost:2020/', {
      method: 'GET',
      headers: {
        'content-type': 'text/plain'
      }
    }).then((response) => response.json().then((r) => {credentials = r
        setCredentialsLoaded(true)}))
  }

    export function authenticate() {
    gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.photos.readonly https://www.googleapis.com/auth/drive.readonly"})
        .then(function() { console.log("Sign-in successful"); },
                function(err) { console.error("Error signing in", err); })
        .then(loadClient());
    }
    
  function loadClient() {
    gapi.client.setApiKey(credentials.ApiKey);
    return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/drive/v3/rest")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }

  export const InitializeGoogleDrive = () => gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: credentials.ClientId});
  });

  // Make sure the client is loaded and sign-in is complete before calling this method.
  export function execute() {
    return gapi.client.drive.files.list({
      "q": "parents='1_-sgosO7Pyq5b5ofxrD7z1Bb5uck8q8Z'"
    })
    .then(function(response) {
        // Handle the results here (response.result has the parsed body).
        console.log("Response", response.result);
      },
      function(err) { console.error("Execute error", err); });
  }

  
  export async function getFileContent(pdfItems,setPdfItems){
    let token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse()
    let responseBody = ''

    fetch('http://localhost:2020/', {
      method: 'POST',
      headers: {
        'content-type': 'text/plain'
      },
      body: JSON.stringify({
        access_token: token.access_token
      })
    }).then((response) => response.json().then((r) => responseBody = r)).then(() => { 
        console.log(responseBody)
        setPdfItems([...pdfItems, ...responseBody])
    })
}