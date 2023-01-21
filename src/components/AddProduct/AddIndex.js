import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activate } from '../../store/slices/notificationSlice';
import { addProductList } from '../../store/slices/productsSlice';


/*
    "name": "Leche",
    "price": 75000,
    "amount": 2,
    "id": 1
 */
export const AddIndex = () => {


    const dispatch = useDispatch();

    const [dataForm, setDataForm] = useState({
        "name": "",
        "price": "",
        "amount": "",
        "id": ""
    })

    const [dataFormValidate, setDataFormValidate] = useState({
        "name": {
            status: false,
            error: ''
        },
        "price": {
            status: false,
            error: ''
        },
        "amount": {
            status: false,
            error: ''
        },
        "id": {
            status: false,
            error: ''
        }
    })

    const carActivate = useSelector(state => state.products.carActivate)


    function handleChange(e) {

        if (e.target.name === 'price' || e.target.name === "amount" || e.target.name === "id") {

            if (e.target.value.includes('.')) {
                setDataFormValidate({
                    ...dataFormValidate,
                    [e.target.name]: {
                        status: true,
                        error: 'No puede tener numeros decimales'
                    }
                })
            } else {
                setDataFormValidate({
                    ...dataFormValidate,
                    [e.target.name]: {
                        status: false,
                        error: ''
                    }
                })
            }

            e.target.value = Number(e.target.value)
        }
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }


    function onSubmit() {

        let error = false;


        let dataNew = {
            "name": dataForm.name,
            "price": Number(dataForm.price),
            "amount": Number(dataForm.amount),
            "id": Number(dataForm.id)
        }

        for (const key in dataFormValidate) {
            if (dataFormValidate[key].status) {
                error = true
            }
        }

        if (error) {
            alert('Resuelva los errores')
            return
        }


        /*
            0. traer la informacion viejita.
            1. validar si el id campo existe.
            2. guardar en estado.
        */
        let dataOriginal = JSON.parse(localStorage.getItem('productsOriginalData'));


        let bandera = false
        dataOriginal.forEach(d => {
            if (d.id === dataNew.id) {

                bandera = true
                setDataFormValidate({
                    ...dataFormValidate,
                    id: {
                        status: true,
                        error: 'Id producto ya existe'
                    }
                })
            }
        });

        if (bandera) {
            return
        }

        let dataFinal = JSON.stringify([...dataOriginal, dataNew])
        let data = [...JSON.parse(localStorage.getItem('products')), dataNew];
        localStorage.setItem('products', JSON.stringify(data))
        localStorage.setItem('productsOriginalData', dataFinal)
        dispatch(addProductList(dataNew))

        dispatch(
            activate({
                message: 'Producto Agregado',
                status: true,
                typeAlert: 'success'
            })
        )

        setDataForm(
            {
                "name": "",
                "price": "",
                "amount": "",
                "id": ""
            }
        )

    }

    return (
        <Grid className='home_card_container_item_one' style={{ display: carActivate ? 'none' : 'flex' }} item md={12} >

            <h1>Agrege un nuevo producto</h1>
            <Grid container spacing={3} style={{ paddingRight: '1em' }}>

                <Grid item xs={12} md={6} >
                    <TextField name='id' value={dataForm.id} onChange={handleChange} variant='outlined' fullWidth placeholder='Id' type={"number"} />
                    {
                        dataFormValidate.id.status
                        &&
                        <Typography variant='p'>{dataFormValidate.id.error}</Typography>
                    }
                </Grid>
                <Grid item xs={12} md={6} >
                    <TextField name='name' value={dataForm.name} onChange={handleChange} variant='outlined' fullWidth placeholder='Nombre' />
                    {
                        dataFormValidate.id.status
                        &&
                        <p>{dataFormValidate.error}</p>
                    }
                </Grid>
                <Grid item xs={12} md={6} >
                    <TextField name='price' value={dataForm.price} onChange={handleChange} variant='outlined' fullWidth placeholder='Precio' type={'number'} />
                    {
                        dataFormValidate.price.status
                        &&
                        <p>{dataFormValidate.price.error}</p>
                    }
                </Grid>
                <Grid item xs={12} md={6} >
                    <TextField name='amount' value={dataForm.amount} onChange={handleChange} variant='outlined' fullWidth placeholder='Cantidad' type={'number'} />
                    {
                        dataFormValidate.amount.status
                        &&
                        <p>{dataFormValidate.amount.error}</p>
                    }
                </Grid>
                <Grid item xs={12} >
                    <Button fullWidth color='primary' onClick={onSubmit} variant='contained'>Agregar</Button>
                </Grid>
            </Grid>

        </Grid>
    )
}
