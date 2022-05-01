import { useEffect, useRef, useState } from "react";
import Alert from "@mui/material/Alert";

const AlertUI = (props) => {
  const [severityState, setSeverityState] = useState("");
  const [open, setOpen] = useState(false);
  const [UIMessage, setUiMessage] = useState("");

  useEffect(() => {
    if (props.propMessage === "0 files missing from DB") {
      setSeverityState("info");
      setOpen(true);
      setUiMessage(
        `Your search results are up to date as of ${new Date().toLocaleString()}`
      );
    } else if (props.propMessage.includes("files missing from DB")) {
      setSeverityState("warning");
      setOpen(true);
      setUiMessage("Your search results are not up to date. Updating...");
    } else if (props.propMessage.includes("successfully")) {
      setSeverityState("success");
      setOpen(true);
      setUiMessage(props.propMessage);
    } else if (props.propMessage === "Shipping... please wait a moment.") {
      setSeverityState("warning");
      setOpen(true);
      setUiMessage(props.propMessage);
    }
  }, [props.propMessage]);

  return open ? (
    <Alert
      onClose={() => {
        setOpen(false);
        props.setMessage("");
      }}
      severity={severityState}
      style={{
        position: "fixed",
        zIndex: 99999,
        marginTop: "3vh",
        fontFamily: "Alfa Slab One",
      }}
    >
      {UIMessage}
    </Alert>
  ) : null;
};

export default AlertUI;
