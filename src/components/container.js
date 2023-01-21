import { Card, Grid,  } from '@mui/material'

import { CarIndex } from './Car/carIndex';
import { RouterProvider } from 'react-router-dom';
import { router } from '../router/router';
import {  useSelector } from 'react-redux';

export const Container = () => {

    const carActivate = useSelector(state => state.products.carActivate)
    return (
        <Card className='home_card_container'>

            <Grid className='home_card_container_content' container spacing={2}>
                <RouterProvider router={router} />

                {
                    carActivate
                    &&
                    <Grid className='home_card_container_item' style={{ position: 'relative' }} item md={12} >
                        <CarIndex />
                    </Grid>
                }

            </Grid>

        </Card>

    )
}
