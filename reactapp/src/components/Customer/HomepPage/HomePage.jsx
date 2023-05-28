import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Rating,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { Fragment } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";

const data = [
  {
    label: "SS Birthday Events",
    rating: 4,
    location: "Bengaluru, India",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrrj5LZXwlzSgKGF1RlZUqJDgxaxuiSLtNng&usqp=CAU",
  },
  {
    label: "RR Birthday Events",
    rating: 5,
    location: "Mumbai, India",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_blOSv44h8F6_PEseKic5tI6UTQebTPFH2w&usqp=CAU",
  },
  {
    label: "KK Birthday Events",
    rating: 4,
    location: "Hyderbad, India",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTYue0Omuepzv-yGJgYPdxTvf-_xp-lZ8M4w&usqp=CAU",
  },
  {
    label: "ABC Birthday Events",
    rating: 5,
    location: "Hyderbad, India",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGeixMcordPnifFxpbJmDbC5baYCG3O1nCTg&usqp=CAU",
  },
  {
    label: "AB Birthday Events",
    rating: 5,
    location: "Hyderbad, India",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDdmgx1FSxdhvCgukqBaJkxVWxsKfMQpCqBA&usqp=CAU",
  },
  {
    label: "ABC Birthday Events1",
    rating: 5,
    location: "Hyderbad, India",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGeixMcordPnifFxpbJmDbC5baYCG3O1nCTg&usqp=CAU",
  },
  {
    label: "AB Birthday Events1",
    rating: 5,
    location: "Hyderbad, India",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDdmgx1FSxdhvCgukqBaJkxVWxsKfMQpCqBA&usqp=CAU",
  },
];

const Events = () => {
  const theme = useTheme();
  return (
    <div className="maincontainer">
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <FormControl sx={{ width: "30ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-search">Search</InputLabel>
            <OutlinedInput
              id="standard-search"
              label="Search"
              type="Search"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton size="small" id="searchEventbutton">
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: "25px" }}>
          <Grid container spacing={[2, 4]}>
            {data?.map(({ label, rating, location, image }, ind) => (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Card
                  id={"eventGrid" + (ind + 1)}
                  sx={{ maxWidth: 345 }}
                  className="hvr-float"
                  key={label}
                >
                  <CardMedia sx={{ height: 140 }} image={image} title={label} />
                  <CardContent>
                    <Typography
                      sx={{ color: theme?.palette?.primary?.main }}
                      gutterBottom
                      variant="h6"
                      component="span"
                    >
                      {label}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Chip
                        avatar={<LocationOnIcon fontSize="small" />}
                        label={location}
                        variant="outlined"
                      />
                      <Rating name="rating" value={rating} readOnly />
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Events;
