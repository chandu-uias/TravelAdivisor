import React from "react";
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
//import Rating from "@mui/material/lab";
import useStyles from './style'
function PlaceDetails({ place }) {
    const classes = useStyles();
    return (

        // <h1>{place.name}</h1>
        <Card elevation={16} >
            <CardMedia
                style={{ height: 350 }}
                image={place.photo ? place.photo.images.large.url : "https://images.app.goo.gl/tWdfotb6F6R1YbFN9"}
                title={place.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">{place.name}</Typography>
                <Box display='flex' justifyContent='space-between'>
                    <Typography variant="subtitle1">Price</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.price_level}</Typography>
                </Box>
                <Box display='flex' justifyContent='space-between'>                    <Typography variant="subtitle1">Ranking</Typography>
                    <Typography gutterBottom variant="subtitle1">{place.ranking}</Typography>
                </Box>
                {/* {place?.awards?.map((award) => (
                    <Box my={1} display='flex' justifyContent='space-between' alignItems='center'>                        <img src={award.images.small} alt={award.display_name} />
                        <Typography variant="subtitle2" color={textSecondary}>{award.display_name}</Typography>
                    </Box>
                // ))} */}
                {/* {place?.cuisine.map(({ name }) => (
                    <Chip key={name} size="small" label={name} className={classes.chip} />
                ))} */}
                {place?.phone && (
                    <Typography gutterBottom variant="subtitle2" color='textSecondary' className={classes.spacing}>
                        <PhoneIcon /> {place.phone}
                    </Typography>)}
                <CardActions>
                    <Button size="small" color="primary" onClick={() => window.open(place.web_url, '_blank')}>
                        Trip Advisor
                    </Button>
                    <Button size="small" color="primary" onClick={() => window.open(place.website, '_blank')}>
                        Website
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    )
}
export default PlaceDetails;