import React, { Fragment, useState } from "react";
import "../App.css";
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
  const handleSelected = (event) => {
    let selectedItem = props.pdfItems.find(
      (item) => item.FileId === event.target.value
    );
    selectedItem.Checked = !selectedItem.Checked;
    props.setPdfItems([...props.pdfItems]);
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        flexGrow: 1,
        maxWidth: "94%",
        ml: "3%",
        mr: "3%",
        mt: ".5%",
        boxShadow: 10,
        borderRadius: "20px",
      }}
    >
      <Table sx={{ whiteSpace: "normal", borderColor: "grey" }}>
        <TableHead sx={{ bgcolor: "black" }}>
          <TableRow sx={{ border: 2, whiteSpace: "normal" }}>
            <TableCell
              sx={{ border: 2, borderColor: "black" }}
              style={{ color: "white", fontFamily: "Alfa Slab One" }}
              className="cell"
            >
              Order Number
            </TableCell>
            <TableCell
              sx={{ border: 2, borderColor: "black" }}
              align="center"
              style={{ color: "white", fontFamily: "Alfa Slab One" }}
            >
              Title
            </TableCell>
            <TableCell
              sx={{ border: 2, borderColor: "black" }}
              align="center"
              style={{ color: "white", fontFamily: "Alfa Slab One" }}
            >
              Quantity
            </TableCell>
            <TableCell
              sx={{ border: 2, borderColor: "black" }}
              align="center"
              style={{ color: "white", fontFamily: "Alfa Slab One" }}
            >
              Ship Date
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.pdfItems.map((row) =>
            row.FileContents.map((item, index) => (
              <TableRow>
                {index === 0 ? (
                  <TableCell
                    align="center"
                    rowSpan={row.FileContents.length}
                    style={{ padding: "15px", "font-weight": "bold" }}
                    sx={{
                      bgcolor: row.Checked ? "#c7f7d4" : "",
                      borderColor: "darkgray",
                      pl: "1vh",
                    }}
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
                        <CheckIcon
                          onClick={handleSelected}
                          value={row.FileId}
                        />
                      </ToggleButton>
                    </div>
                    {row.FileContents[0].OrderNumber}
                  </TableCell>
                ) : null}
                <TableCell
                  style={{
                    "word-break": "break-word",
                    "background-color": "#f5f1f1",
                    borderColor: "darkgray",
                  }}
                  sx={{
                    p: "1vh",
                  }}
                >
                  <span style={{ fontWeight: "bold" }}>
                    {`${++index}.`}&nbsp;
                  </span>
                  {`${item.Title}`}
                </TableCell>
                <TableCell align="center" sx={{ borderColor: "darkgray" }}>
                  {item.Quantity}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    borderColor: "darkgray",
                    "background-color": "#f5f1f1",
                  }}
                >
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
