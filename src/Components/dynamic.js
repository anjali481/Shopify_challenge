import React, { useEffect, useState } from 'react'
import {  Row, Col, Container } from "react-bootstrap";

import Card from '@material-ui/core/Card';

import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from '@material-ui/icons/Favorite';
import clsx from "clsx";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 345
    },
    media: {
      height: 0,
      paddingTop: "56.25%" // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: "rotate(180deg)"
    },

    cardhead:{
     fontFamily: 'Righteous',
  color: "#d14f4f",
    },

    likee:{
       color:'blue'
    },

    carddate:{
      fontFamily: 'Righteous',
      color:"blue",
    }
  
  }));

export default function Dynamic() {
    const [isBlack, setIsBlack] = useState(false);

     



    const handleIconClick = (item) => {
         isBlack===item? setIsBlack(false):setIsBlack(item);
         

    }

   



   
    const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = item => {
    expanded === item? setExpanded(false) : setExpanded(item);

  }
   

    const classes = useStyles();
    const [photoData, setPhotoData] = useState(null);

  useEffect(() => {
    fetchPhoto();

    async function fetchPhoto() {
      const res = await fetch(
               
        `https://api.nasa.gov/planetary/apod?api_key=wzwszViQWgJgmov64pcH3NPDmBfdTy1Afenz9TVI&start_date=2021-08-01&end_date=2021-08-30`
      );
      const data = await res.json();
      console.log(data);
      setPhotoData(data);
    }
  }, []);


   /* const [playerData, setPlayerData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://nba-players.herokuapp.com/players-stats')
            const nbaData = await response.json()
            setPlayerData(nbaData.slice(0, 15))
        }
        fetchData()
    }, [])*/

    if (!photoData) return <div />;
    return (
        <Container>

          <center><h1>Spacetagram </h1></center>
          <br></br>
          
            <Row >
             
                { photoData.map(item=> (

                    <Col  xs={12} md={4} lg={4}>
                       <br></br>
                         <Card sx={{ maxWidth: 345 }}  >
                         <CardMedia
                     component="img"
                       height="194"
                       image={item.url}
                       alt="URL not found"
                          />    
                              <CardContent>
        <Typography className={classes.cardhead}  >
           {item.title}
        </Typography>

        <Typography className={classes.carddate} variant="body2">
                  {item.date}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon 
           onClick={()=>handleIconClick(item)
        }
        style={{color:item===isBlack?'red':" "}} />

        </IconButton>


 <IconButton className={clsx(classes.expand, {
            [classes.expandOpen]: expanded === item
          })}
          onClick={() => handleExpandClick(item)}
          aria-expanded={expanded === item}
          aria-label="show more">
        
          <ExpandMoreIcon />
          </IconButton>
      </CardActions> 
      
      <Collapse in={expanded===item} timeout="auto" unmountOnExit>
        <CardContent>
         
       
          <Typography paragraph>
            {item.explanation}
          </Typography>
        
      
        </CardContent>
                            </Collapse>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}


