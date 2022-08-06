import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {CardActionArea, Grid} from '@mui/material';

export default function ActionAreaCard({image,title,count}) {
    return (
        <Grid item xs={6} md={4} sm={4} lg={3}>
            <Card sx={{maxWidth: 345}}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        image={image}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography sx={{fontFamily:'Concert One',textAlign:'center',marginBottom:0}} gutterBottom variant="h4" component="div">
                            {title}
                        </Typography>
                        <Typography sx={{textAlign:'center', fontSize:40}}  color="text.secondary">
                            {count}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    );
}
