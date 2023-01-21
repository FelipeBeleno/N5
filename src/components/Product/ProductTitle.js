import { Typography } from '@mui/material'
import delivery from '../../assets/img/delivery.png'

export const ProductTitle = () => {
    return (
        <div className='products_title_container'>
            <div className='products_title_container_text'>
                <Typography variant='h3'>Delivery N5</Typography>
                <p>Sunt incididunt occaecat aliqua culpa magna eiusmod quis aute sint officia.
                    Sunt incididunt occaecat aliqua culpa magna eiusmod quis aute sint officia.
                </p>
            </div>
            {/*TODO: eliminar cuando sea la pantalla de dimención pequeña */}
            <img src={delivery} alt="logo" />
        </div>
    )
}
