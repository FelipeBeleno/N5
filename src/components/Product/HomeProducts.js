import { Grid } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { ProductIndex } from './ProductIndex'
import { ProductTitle } from './ProductTitle'

export const HomeProducts = () => {

    const carActivate = useSelector(state => state.products.carActivate)


    return (
        <Grid className='home_card_container_item_one' style={{ display: carActivate ? 'none' : 'flex' }} item md={12} >
            <ProductTitle />
            <br/>
            <ProductIndex />
        </Grid>
    )
}
