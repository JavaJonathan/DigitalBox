import { useEffect, useRef, useState } from "react";
import Alert from "@mui/material/Alert";

const AlertUI = (props) => {
  const [severityState, setSeverityState] = useState("");

  useEffect(() => {
    if (props.propMessage === "0 files missing from DB") {
      setSeverityState("info");
    } else {
      setSeverityState("warning");
    }
  }, [props.propMessage]);

  return (
    <Alert
      onClose={() => {}}
      severity={severityState}
      style={{
        position: "fixed",
        zIndex: 99999,
        marginTop: "3vh",
        fontFamily: "Alfa Slab One",
      }}
    >
      {" "}
      {props.propMessage}
    </Alert>
  );
};

export default AlertUI;
