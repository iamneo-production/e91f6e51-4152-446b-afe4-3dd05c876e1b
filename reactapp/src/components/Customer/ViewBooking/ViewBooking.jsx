import {
    Button,
    Grid,
    IconButton,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
  } from "@mui/material";
  import React from "react";
  import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
  import EditCalendarIcon from "@mui/icons-material/EditCalendar";
  import DeleteIcon from "@mui/icons-material/Delete";
  import { Link, useNavigate } from "react-router-dom";
  import axios from "axios";
  import endpoints from "/home/coder/project/workspace/reactapp/src/components/config/config.js";
  import Swal from "sweetalert2";
  import Navbaar from "../Navbaar/Navbaar";
  const ViewBookedEvents = () => {
    const [eventList, setEventList] = React.useState({
      loading: false,
      data: [],
    });
    const navigate = useNavigate();
  
    const FetchEvents = () => {
      setEventList((prev) => ({ ...prev, loading: true }));
      axios
        .get(endpoints?.listEvents)
        .then((resp) => {
          setEventList((prev) => ({ ...prev, data: resp?.data }));
        })
        .catch((er) => {
          console.error(er);
          Swal.fire({
            icon: "error",
            title: "Fetching Events Failed",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .finally(() => setEventList((prev) => ({ ...prev, loading: false })));
    };
  
    React.useEffect(() => {
      FetchEvents();
    }, []);
  
    const deleteHandler = (evId) => {
      axios
        .delete(endpoints?.deleteEvent + evId)
        .then((resp) => {
          FetchEvents();
        })
        .catch((er) => {
          console.error(er);
          Swal.fire({
            icon: "error",
            title: "Deleting Event Failed",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    };
  
    return (
      <div className="maincontainer">
        <Navbaar/>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12}>

            <Link to={"/user/getAllThemes"}>

              <Button variant="outlined" startIcon={<ArrowBackIosIcon />}>
                Back
              </Button>
            </Link>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: "10px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Event Id</TableCell>
                  <TableCell>Event Name</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {eventList?.data?.map((row) => (
                  <TableRow
                    key={row.eventId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{row.eventId}</TableCell>
                    <TableCell>{row.eventName}</TableCell>
                    <TableCell>{row.eventTime}</TableCell>
                    <TableCell>{row.eventDate}</TableCell>
                    <TableCell>{row.eventCost}</TableCell>
                    <TableCell align="right">
                      <Stack
                        direction="row"
                        spacing={0.5}
                        justifyContent="flex-end"
                      >
                        <IconButton
                          onClick={() =>
                            navigate("/user/bookTheme?eventId=" + row?.eventId)
                          }
                          color="primary"
                          aria-label="edit"
                        >
                          <EditCalendarIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => deleteHandler(row.eventId)}
                          color="error"
                          aria-label="delete"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </div>
    );
  };
  
  export default ViewBookedEvents;
