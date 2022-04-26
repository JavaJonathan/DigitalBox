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
    } else {
      setSeverityState("warning");
      setOpen(true);
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
