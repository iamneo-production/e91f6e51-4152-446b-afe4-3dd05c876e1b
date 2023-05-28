import { Button, Grid } from "@mui/material";
import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import Steps from "./Steps";
import { useSearchParams } from "react-router-dom";
import endpoints from "../../config/config";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "/home/coder/project/workspace/reactapp/src/components/Customer/Navbaar/Navbaar.js";

const BookEvent = () => {
  let [searchParams, setSearchParams] = useSearchParams();
  const [eventData, setEventData] = React.useState({
    loading: false,
    data: null,
  });
  const eventId = searchParams?.get("eventId");

  React.useEffect(() => {
    if (eventId && eventId !== undefined) {
      setEventData((prev) => ({ loading: true, data: null }));
      axios
        .get(endpoints?.listEvents + "/?eventId=" + eventId)
        .then((resp) => {
          setEventData((prev) => ({ loading: false, data: resp?.data[0] }));
        })
        .catch((er) => {
          console.error(er);
          setEventData((prev) => ({ ...prev, loading: false }));
          Swal.fire({
            icon: "error",
            title: "Fetching Events Failed",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    }
    return () => setEventData({ loading: false, data: null });
  }, [eventId]);
 

  return (
    //<BrowserRouter></BrowserRouter><Header />
    <div className="maincontainer">
      <Header />
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Link to={"/user"}>
            <Button variant="outlined" startIcon={<ArrowBackIosIcon />}>
              Back
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: "25px" }}>
          {eventData?.loading ? (
            <div
              style={{
                height: "40vh",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Loading...
            </div>
          ) : (
            <Steps
              eventData={eventData}
              editMode={eventId !== null && eventId !== undefined}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default BookEvent;
