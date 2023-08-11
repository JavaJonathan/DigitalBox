import React, { Fragment, useEffect, useState } from "react";
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
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/material";

const ContentTable = (props) => {
  const theme = createTheme({
    palette: {
      primary: green,
    },
  });

  const [pageCount, setPageCount] = useState(1);

  const handleSelected = (event) => {
    let selectedItem = props.pdfItems.find(
      (item) => item.FileId === event.target.value
    );
    selectedItem.Checked = !selectedItem.Checked;
    props.setPdfItems([...props.pdfItems]);
  };

  const handleChange = (event, value) => {
    props.setPage(value);
  };

  useEffect(() => {
    getAmountOfPages();
  }, [props.pdfItems]);

  useEffect(() => {
    let newPdfItems = props.pdfItems.map((item) => {
      return {
        ...item,
        Checked: false,
      };
    });
    props.setPdfItems([...newPdfItems]);
  }, [props.page]);

  useEffect(() => {
    props.setPage(1);
  }, [props.searchCount]);

  const getAmountOfPages = () => {
    let pages = 0;
    if (props.pdfItems.length % 25 > 0) {
      pages = props.pdfItems.length / 25 + 1;
    } else {
      pages = props.pdfItems.length / 25;
    }
    setPageCount(Math.floor(pages));
  };

  return (
    <ThemeProvider theme={theme}>
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
          <TableHead
            style={{
              background: "linear-gradient(to right bottom, #000428, #004e92)",
            }}
          >
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
                justifyContent="center"
                alignItems="center"
                style={{ color: "white", fontFamily: "Alfa Slab One" }}
              >
                Title
                <Box component="span" sx={{ align: "center" }}>
                  <KeyboardArrowDownIcon onClick={props.handleSortClick} />
                </Box>
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
            {props.pdfItems.map((row, index) =>
              index > props.page * 25 - 1 || index < props.page * 25 - 25
                ? null
                : row.FileContents.map((item, index) => (
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
                            style={{
                              "padding-bottom": "2vh",
                              "font-size": "15px",
                            }}
                          >
                            <Switch
                              value={row.FileId}
                              checked={row.Checked}
                              onClick={handleSelected}
                              color="success"
                            ></Switch>
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
                      <TableCell
                        align="center"
                        sx={{ borderColor: "darkgray" }}
                      >
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
      <Stack spacing={2} alignItems="center" sx={{ mb: "2vh", mt: "2vh" }}>
        <Pagination
          count={pageCount}
          size="large"
          page={props.page}
          onChange={handleChange}
          color="primary"
          variant="outlined"
          sx={{ color: "white" }}
        />
      </Stack>
    </ThemeProvider>
  );
};

export default ContentTable;
