// //import * as React from "react";
// import Box from "@mui/material/Box";
// import { useTheme } from "@mui/material/styles";
// import MobileStepper from "@mui/material/MobileStepper";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
// import { Grid, TextField } from "@mui/material";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";
// import "dayjs/locale/de";    
// import { TimePicker } from "@mui/x-date-pickers";
// import axios from "axios";
// import endpoints from "/home/coder/project/workspace/reactapp/src/config/config";
// import {BASE_URL} from "../../../utils/userApi"
// import Swal from "sweetalert2";
// import { useNavigate,useParams } from "react-router-dom";
// import UserContext from '../../../UserContext' 
// import React, { useState } from 'react';
// import "/home/coder/project/workspace/reactapp/src/components/Customer/BookingPage/Booking.css";
// import Select from "react-select";


// const initialState = {
//   eventName: "",
//   applicantName: "",
//   applicantAddress: "",
//   applicantMobile: "",
//   applicantEmail: "",
//   eventAddress: "",
//   eventDate: dayjs().add(1, "day")?.format("YYYY-MM-DD"),
//   eventTime: dayjs().add(1, "day")?.format("YYYY-MM-DD HH:MM"),
//   eventMenuld: "",
//   addonld: "",
//   eventCost: "",
// };
// export default function Steps({ editMode, eventData }) {
//   const theme = useTheme();
//   const [activeStep, setActiveStep] = React.useState(0);
//   const { appUser,setAppUser } = React.useContext(UserContext);
//   console.log("appUser",appUser)
//   const navigate = useNavigate();
//   const [selectedOptions, setSelectedOptions] = useState();

//   const [formData, setFormData] = React.useState(initialState);
//   console.log(formData)
//   const {id} = useParams();
//   const [data, setData] = React.useState()

//   const optionList = [
//     { value: "5000", label: "Magic show------5000" },
//     { value: "green", label: "DJ party------4000" },
//     { value: "yellow", label: "Game show-----5000" },
//     { value: "blue", label: "Mehendi-----3000" },
//     { value: "white", label: "Comedy show-----5000" }
//   ];     
//   function handleSelect(data) {
//     setSelectedOptions(data);
//   }
//   //  fetching the details based on id  
//   React.useEffect(()=>{
//     async function getEvent() {
//       try {
//         const response = await fetch(`${BASE_URL}/getAllThemes/${id}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch event data');
//         }
//         const eventData = await response.json();
//         console.log('event', eventData);
//         setData(eventData);
//       } catch (error) {
//         console.log(error);
//       }
//     }
  
//     getEvent();
//   },[])

//   React.useEffect(() => {
//     if (editMode) {
//       setFormData((prev) => ({ ...prev, ...eventData?.data }));
//     }
//     return () => setFormData(initialState);
//   }, [editMode]);

//   const formHandler = (n, v) => {
//     setFormData((prev) => ({ ...prev, [n]: v }));
//   };

//   const steps = [
//     {
//       label: "Page-1",
//       content: (
//         <React.Fragment>
//           <Grid container alignItems="center" spacing={[4, 4]}>
//             <Grid item xs={12} sm={5} md={5} lg={5}>
//               <TextField
//                 required
//                 fullWidth
//                 id="outlined-required"
//                 label="Event Name"
//                 value={data?.name}
//                 onChange={(e) => formHandler("eventName", e.target.value)}
//               />
//               <TextField
//                 required
//                 fullWidth
//                 id=""
//                 label="User id"
//                 value={appUser?.id}
                
//               />
//             </Grid>
//             <Grid item xs={12} sm={5} md={5} lg={5}>
//               <TextField
//                 required
//                 fullWidth
//                 id="outlined-required"
//                 label="Applicant Name"
//                 value={formData?.applicantName}
//                 onChange={(e) => formHandler("applicantName", e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={5} md={5} lg={5}>
//               <TextField
//                 required
//                 fullWidth
//                 id="outlined-required"
//                 label="Applicant Address"
//                 value={formData?.applicantAddress}
//                 onChange={(e) =>
//                   formHandler("applicantAddress", e.target.value)
//                 }
//               />
//             </Grid>
//             <Grid item xs={12} sm={5} md={5} lg={5}>
//               <TextField
//                 required
//                 fullWidth
//                 id="outlined-required"
//                 label="Applicant Mobile"
//                 value={formData?.applicantMobile}
//                 onChange={(e) => formHandler("applicantMobile", e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={5} md={5} lg={5}>
//               <TextField
//                 required
//                 fullWidth
//                 id="outlined-required"
//                 label="Applicant Email"
//                 type="email"
//                 value={formData?.applicantEmail}
//                 onChange={(e) => formHandler("applicantEmail", e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={5} md={5} lg={5}>
//               <LocalizationProvider
//                 dateAdapter={AdapterDayjs}
//                 adapterLocale="de"
//               >
//                 <DatePicker
//                   label="Event Date"
//                   sx={{ width: "100%" }}
//                   value={dayjs(formData?.eventDate)}
//                   onChange={(v) => formHandler("eventDate", v?.toString())}
//                 />
//               </LocalizationProvider>
//             </Grid>
//             <Grid item xs={12} sm={5} md={5} lg={5}>
//               <LocalizationProvider
//                 dateAdapter={AdapterDayjs}
//                 adapterLocale="de"
//               >
//                 <TimePicker
//                   label="Event Time"
//                   value={dayjs(formData?.eventTime)}
//                   onChange={(v) => formHandler("eventTime", v?.format("HH:mm"))}
//                 />
//               </LocalizationProvider>
//             </Grid>
//           </Grid>
//         </React.Fragment>
//       ),
//     },
//     {
//       label: "Page-2",
//       content: (
//         <React.Fragment>
//           <Grid container alignItems="center" spacing={[4, 4]}>
//             <Grid item xs={12} sm={5} md={5} lg={5}>
//               <TextField
//                 required
//                 fullWidth
//                 id="outlined-required"
//                 label="Event Menu"
//                 value={formData?.eventMenuld}
//                 onChange={(e) => formHandler("eventMenuld", e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={5} md={5} lg={5} className="dropdown-container">
//             <Select
//           options={optionList}
//           placeholder="Select Add-On"
//           value={selectedOptions}
//           onChange={handleSelect}
//           isSearchable={true}
//           isMulti
//         />
//             </Grid>
//             <Grid item xs={12} sm={5} md={5} lg={5}>
//               <TextField
//                 required
//                 fullWidth
//                 id="outlined-required"
//                 label="Quantity"
//                 type="number"
//               />
//             </Grid>
//           </Grid>
//         </React.Fragment>
//       ),
//     },
//   ];
//   const maxSteps = steps.length;

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleSubmit = () => {
//    console.log(formData);
//   };

//   return eventData?.loading ? (
    
//     <div
//       style={{
//         height: "40vh",
//         width: "100%",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       Loading...
//     </div>
//   ) : (
//     <Box sx={{ width: "100%", flexGrow: 1 }}>
      
//       <Paper
//         square
//         elevation={0}
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           height: 50,
//           pl: 2,
//           bgcolor: "background.default",
//         }}
//       >
//         <Typography>{steps[activeStep].label}</Typography>
//       </Paper>
//       <Box sx={{ height: "100%", minHeight: "350px", width: "100%", p: 2 }}>
//         {steps[activeStep].content}
//       </Box>
//       <MobileStepper
//         variant="text"
//         steps={maxSteps}
//         position="static"
//         activeStep={activeStep}
//         nextButton={
//           activeStep == 1 ? (
//             <Button size="small" onClick={handleSubmit}>
//               Submit
//             </Button>
//           ) : (
//             <Button
//               size="small"
//               onClick={handleNext}
//               disabled={activeStep === maxSteps - 1}
//             >
//               Next
//               {theme.direction === "rtl" ? (
//                 <KeyboardArrowLeft />
//               ) : (
//                 <KeyboardArrowRight />
//               )}
//             </Button>
//           )
//         }
//         backButton={
//           <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
//             {theme.direction === "rtl" ? (
//               <KeyboardArrowRight />
//             ) : (
//               <KeyboardArrowLeft />
//             )}
//             Back
//           </Button>
//         }
//       />
//     </Box>
//   );
// }
