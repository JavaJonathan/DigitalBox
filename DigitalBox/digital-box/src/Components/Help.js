import { Fragment } from "react";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";

const Help = () => {
  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: "90%", ml: "15%", mr: "15%", mt: "2%", boxShadow: 10 }}
    >
      <div style={{ "font-size": "4vh", "margin-top": "1vh" }}>
        Running into an issue? 🤔 These troubleshooting steps may help.
      </div>
      <Divider variant="middle" sx={{ mb: "1%", mt: "1%" }} color="black" />
      <div>
        For starters, please ensure you are signed into the correct account. You
        must be signed into the Digital.Label.Box@gmail.com for this app to
        work.
      </div>
      <Divider variant="middle" sx={{ mb: "1%", mt: "1%" }} color="black" />
      <div>
        Please also refrain from spam clicking anything, Google's API has rate
        limits are spam clicking anything may cause the app to exceed those
        limits.
      </div>
      <Divider variant="middle" sx={{ mb: "1%", mt: "1%" }} color="black" />

      <div>Problem: The app is not parsing the content correctly.</div>
      <Typography>
        Possible Resolution: Please ensure the Label Format has not changed.
      </Typography>
      <Divider variant="middle" sx={{ mb: "1%", mt: "1%" }} color="black" />
      <div>Problem: The labels aren't populating.</div>
      <Typography>
        Possible Resolution: Please ensure the "Unshipped Folder" on Google
        Drive has not been deleted or had it's ID Changed (This is caused by
        deleting and creating a new "Shipped Folder" ).
      </Typography>
      <Divider variant="middle" sx={{ mb: "1%", mt: "1%" }} color="black" />
      <div>Problem: The shipping/cancel functionality is not working.</div>
      <Typography>
        Possible Resolution: Please ensure the "Cancelled Folder" or "Shipped
        Folder" on Google Drive has not been deleted or had it's ID Changed
        (This is caused by deleting and creating a new "Shipped Folder" or
        "Cancelled Folder" ).
      </Typography>
    </Card>
  );
};

export default Help;
