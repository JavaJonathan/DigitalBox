import { gapi } from "gapi-script";

let credentials = {};
let token = ''

export function getGoogleCredentials(setCredentialsLoaded) {
  fetch("http://localhost:2020/", {
    method: "GET",
    headers: {
      "content-type": "text/plain",
    },
  }).then((response) =>
    response.json().then((r) => {
      credentials = r;
      setCredentialsLoaded(true);
      console.log(credentials);
    })
  );
}

export function authenticate(setSignedIn) {
  gapi.auth2
    .getAuthInstance()
    .signIn({
      scope:
        "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.metadata https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/drive.photos.readonly https://www.googleapis.com/auth/drive.readonly",
    })
    .then(
      function (response) {
        console.log("Sign-in successful");
        token = response.xc.access_token
        localStorage.setItem("DigitalBoxToken", `[${token}]`) 
        setSignedIn(true);
      },
      function (error) {
        console.error("Error signing in", error);
      }
    )
    .then(loadClient());
}

function loadClient() {
  gapi.client.setApiKey(credentials.ApiKey);
  return gapi.client
    .load("https://content.googleapis.com/discovery/v1/apis/drive/v3/rest")
    .then(
      function () {
        console.log("GAPI client loaded for API");
      },
      function (err) {
        console.error("Error loading GAPI client for API", err);
      }
    );
}

export const InitializeGoogleDrive = () =>
  gapi.load("client:auth2", function () {
    gapi.auth2.init({ client_id: credentials.ClientId });
  });

export async function cancelOrders(setPdfItems, setMessage, orders) {
  // let token = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse();
  let responseBody = "";

  await fetch("http://localhost:2020/cancel", {
    method: "POST",
    headers: {
      "content-type": "text/plain",
    },
    body: JSON.stringify({
      token: {
        access_token: token,
      },
      Orders: orders,
      Action: "cancel",
    }),
  })
    .then((response) => response.json().then((r) => (responseBody = r)))
    .then(() => {
      console.log(responseBody);
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
    });
}

export async function shipOrders(setPdfItems, setMessage, orders) {
  let responseBody = "";

  await fetch("http://localhost:2020/ship", {
    method: "POST",
    headers: {
      "content-type": "text/plain",
    },
    body: JSON.stringify({
      token: {
        access_token: token,
      },
      Orders: orders,
      Action: "ship",
    }),
  })
    .then((response) => response.json().then((r) => (responseBody = r)))
    .then(() => {
      console.log(responseBody);
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
    });
}

export async function getFileContent(setPdfItems, setMessage, searchValue, setIsLoading) {
  let responseBody = "";

  await fetch("http://localhost:2020/", {
    method: "POST",
    headers: {
      "content-type": "text/plain",
    },
    body: JSON.stringify({
      token: {
        access_token: token,
      },
      Filter: searchValue,
    }),
  })
    .then((response) => response.json().then((r) => (responseBody = r)))
    .then(() => {
      console.log(responseBody);
      setMessage(responseBody.Message);
      setPdfItems(responseBody.Orders);
      setIsLoading(false);
    });
}
