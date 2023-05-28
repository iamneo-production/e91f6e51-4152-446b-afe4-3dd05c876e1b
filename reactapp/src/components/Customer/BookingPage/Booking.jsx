import { Button, Grid } from "@mui/material";
import React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Link } from "react-router-dom";
import Steps from "./Steps";
import { useSearchParams,useLocation } from "react-router-dom";
import endpoints from "/home/coder/project/workspace/reactapp/src/components/config/config.js";
import axios from "axios";
import Swal from "sweetalert2";
//import Navbaar from "../Navbaar/Navbaar";
const Booking = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const [eventData, setEventData] = React.useState({
    loading: false,
    data: null,
  });
  const eventId = searchParams?.get("eventId");

  // const {id} = useParams();
  // const [data, setData] = useState()

  // useEffect(()=>{
  //   async function getEvent() {
  //     try {
  //       const response = await fetch(`${BASE_URL}/getAllThemes/${id}`);
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch event data');
  //       }
  //       const eventData = await response.json();
  //       console.log('event', eventData);
  //       setData(eventData);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  
  //   getEvent();
  // },[])

  //console.log("Hii",id)

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
  
    <div className="maincontainer">
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

export default Booking;