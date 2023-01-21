import { Grid, IconButton } from "@mui/material";
import { createBrowserRouter, Link, useLocation } from "react-router-dom";
import { AddIndex } from "../components/AddProduct/AddIndex";
import { HomeProducts } from "../components/Product/HomeProducts";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HomeIcon from '@mui/icons-material/Home';
import { getCarShopping, resizeCar } from '../store/slices/productsSlice';
import { useDispatch } from "react-redux";
import { useEffect } from "react";



export const BaseComponet = () => {
    const dispatch = useDispatch()

    const location = useLocation()

    useEffect(() => {
        dispatch(getCarShopping())
    }, [])


    return (<><Grid className='home_card_container_menu' item xs={12}>
        <Link to={location.pathname === '/'?'/create': '/'}>
            <IconButton aria-label="add-item" size='large' >
                {location.pathname === '/'
                    ?<AddBusinessIcon color="primary" />
                    : <HomeIcon  color="primary" />
                }
            </IconButton>
        </Link>
        <IconButton aria-label="open-car" size='large' onClick={() => dispatch(resizeCar())}>
            <ShoppingCartIcon color="primary"/>
        </IconButton>
    </Grid>
        <hr className='home_card_container_hr' /></>)
}

export const router = createBrowserRouter([
    {
        path: "/",
        element: <>
            <BaseComponet />
            <HomeProducts />
        </>,
        errorElement: <>
            <BaseComponet />
            <HomeProducts />
        </>
    },
    {
        path: '/create',
        element: <>
            <BaseComponet />
            <AddIndex />
        </>
    }
]);