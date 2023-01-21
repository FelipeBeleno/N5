import { IconButton } from '@mui/material'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { addOneCant, removeOneCant, restoreProducts } from '../../store/slices/productsSlice';
import { activate } from '../../store/slices/notificationSlice';
export const CarIndex = () => {

    const { car, total } = useSelector(state => state.products);
    const dispatch = useDispatch();

    return (
        <>
            <div className='car_removeicon'>
                <IconButton onClick={() => {
                    dispatch(restoreProducts())
                    dispatch(activate({
                        message: 'Carrito vacío',
                        status: true,
                        typeAlert: 'info'
                    }))

                }}>
                    <DeleteIcon color='primary' />
                </IconButton>
            </div>
            {car.map((i, inx) => {
                return <Fragment key={inx + Date.now}><div className="car_contentlist">
                    <div className='car_contentlist_item'>
                        <p>{i.name}</p>
                        <p>${i.value} c/u</p>
                    </div>
                    <div className='car_contentlist_item'>
                        <p>cantidad: {i.cant}</p>
                        <p>sub total: ${i.valorTotal}</p>
                    </div>
                    <div className='car_contentlist_item_actionbar'>
                        <div className='products_index_item_secondsecction_buttons'>
                            <IconButton onClick={() => { dispatch(addOneCant(i)) }}>
                                <AddCircleIcon color='primary' />
                            </IconButton>
                            <p>{i.cant}</p>
                            <IconButton onClick={() => dispatch(removeOneCant(i))}>
                                <RemoveCircleIcon color='primary' />
                            </IconButton>
                        </div>
                    </div>
                </div>
                    <hr className='home_card_container_hr' />
                </Fragment>
            })}

            <h1 > Total ${total}</h1>

        </>
    )
}
