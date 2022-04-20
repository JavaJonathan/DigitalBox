import React, { Fragment, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
import ToggleButton from "@mui/material/ToggleButton";

const ContentTable = (props) => {

  const handleSelected = event => {
    let selectedItem = props.pdfItems.find(item => item.FileId === event.target.value)
    selectedItem.Checked = !selectedItem.Checked
    props.setPdfItems([...props.pdfItems])
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ flexGrow: 1, maxWidth: "94%", ml: "3%", mr: "3%" }}
      style={{ "padding-top": "1%" }}
    >
      <Table sx={{ whiteSpace: "normal" }}>
        <TableHead sx={{ bgcolor: "black" }}>
          <TableRow sx={{ border: 2, whiteSpace: "normal" }}>
            <TableCell
              sx={{ border: 2 }}
              style={{ color: "white", "font-weight": "bold" }}
            >
              Order Number
            </TableCell>
            <TableCell
              sx={{ border: 2 }}
              align="center"
              style={{ color: "white", "font-weight": "bold" }}
            >
              Title
            </TableCell>
            <TableCell
              sx={{ border: 2 }}
              align="center"
              style={{ color: "white", "font-weight": "bold" }}
            >
              Quantity
            </TableCell>
            <TableCell
              sx={{ border: 2 }}
              align="center"
              style={{ color: "white", "font-weight": "bold" }}
            >
              Ship Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.pdfItems.map((row) =>
            row.FileContents.map((item) => (
              <TableRow key={row.FileId}>
                {row.FileContents[0].Title === item.Title ? (
                  <TableCell
                    align="center"
                    rowSpan={row.FileContents.length}
                    style={{ padding: 0, "font-weight": "bold" }}
                  >
                    <div
                      style={{ "padding-bottom": "2vh", "font-size": "15px" }}
                    >
                      <ToggleButton
                        value={row.FileId}
                        selected={row.Checked}
                        color={row.Checked ? "success" : "standard"}
                        onClick={handleSelected}
                        size="small"
                      >
                        <CheckIcon />
                      </ToggleButton>
                    </div>
                    {row.FileContents[0].OrderNumber}
                  </TableCell>
                ) : null}
                <TableCell
                  style={{ padding: "1px", "word-break": "break-word" }}
                  sx={{ maxWidth: "70vh" }}
                >
                  {item.Title}
                </TableCell>
                <TableCell align="center" style={{ padding: 0 }}>
                  {item.Quantity}
                </TableCell>
                <TableCell align="center" style={{ padding: 0 }}>
                  {item.ShipDate}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContentTable;
