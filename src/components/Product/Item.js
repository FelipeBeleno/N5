import { Button, Grid, IconButton } from '@mui/material'
import delivery from '../../assets/img/delivery.png'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../store/slices/productsSlice';
import { activate } from '../../store/slices/notificationSlice';
export const Item = ({ product }) => {


    const [item, setItem] = useState({
        id: product.id,
        amount: product.amount,
        cant: 0,
        value: product.price,
        name: product.name
    })

    const products = useSelector(state => state.products)

    const dispatch = useDispatch();


    useEffect(() => {

        let [dataUpdate] = products.products.filter(p => p.id === product.id)

        setItem({
            ...item,
            amount: dataUpdate.amount,
            cant: 0,
        })


    }, [products])





    function updateItem(num) {
        if (item.cant + num > item.amount) {
            return
        }
        if (item.cant + num < 0) return
        setItem({
            ...item,
            cant: item.cant + num
        })
    }

    async function handleUpdateCar() {
        /*
            1. agregar producto al carrito
            2. descontar producto del stock
            3. reiniciar y actualizar item
        */

        if (item.cant === 0) {
            return
        }
        dispatch(addProduct(item))
        
        dispatch(activate({
            message: 'Producto agregado',
            status: true,
            typeAlert: 'success'
        }));

    }


    return (
        <Grid item xs={12} sm={12} md={6} lg={4} xl={2} style={{ display: 'flex', justifyContent: 'center' }} >
            <div className='products_index_item'>
                <div className='products_index_item_secondsecction'>
                    <img src={delivery} alt="item" />
                    <h2>{product.name}</h2>
                    <b>${product.price}</b>
                    <div className='products_index_item_secondsecction_buttons'>
                        <IconButton onClick={() => updateItem(1)}>
                            <AddCircleIcon />
                        </IconButton>
                        <p>{item.cant}</p>
                        <IconButton onClick={() => updateItem(-1)}>
                            <RemoveCircleIcon />
                        </IconButton>
                    </div>
                    <Button variant='contained' onClick={() => handleUpdateCar()}>Agregar</Button>
                </div>
            </div>
        </Grid>
    )
}
