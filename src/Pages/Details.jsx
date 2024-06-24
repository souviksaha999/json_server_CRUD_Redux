import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { UserDetailsFetch } from '../Slices/DetailsSlice'
import Layout from '../Common/Layout'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/material'

export default function Details() {

    const { id } = useParams()
    const dispatch = useDispatch()

    const { loading, data, error } = useSelector((state) => {
        console.log("DETAILS_STATE......", state?.details)
        return state?.details
    })

    useEffect(() => {
        dispatch(UserDetailsFetch(id))
    }, [])


    return (
        <Layout>
            <h1>User Details...</h1>

            <Container maxWidth="lg">
                <Box component="div" sx={{display : "flex", justifyContent: "center"}}>
                    <Card sx={{ maxWidth: 345 }}>
                        {/* <CardMedia
                            sx={{ height: 140 }}
                            image="/static/images/cards/contemplative-reptile.jpg"
                            title="green iguana"
                        /> */}
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Id : {data.id}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Name : {data.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Email : {data.email}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Phone : {data.phone}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" variant='contained'> <Link to="/allusers" style={{textDecoration : "none", color: "White"}}> Back </Link> </Button>
                            <Button size="small"> </Button>
                        </CardActions>
                    </Card>
                </Box>

            </Container>



        </Layout>
    )
}
