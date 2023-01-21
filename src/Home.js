import { useDispatch, useSelector } from 'react-redux'
import { Alert, IconButton, ThemeProvider } from '@mui/material'
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';


import { change } from './store/slices/themeSlice'
import { Container } from './components/container';
import { themeGeneral, themeGeneralDark } from './theme/theme';
import { useEffect } from 'react';
import { disable } from './store/slices/notificationSlice';
export const Home = () => {
    const state = useSelector(state => state)
    const dispatch = useDispatch();


    useEffect(() => {

        if (state.notification.status) {
            setTimeout(() => {
                dispatch(disable())
            }, 2500);
        }
    }, [state.notification.status])



    return (
        <ThemeProvider theme={state.theme === 'light' ? themeGeneral : themeGeneralDark}>

            <div className='home_container' style={{
                background: state.theme === 'dark' ? 'black' : '#d5f1db',
            }}>
                <div className='home_themebotton'>
                    <IconButton color="primary" onClick={() => dispatch(change())} >
                        {
                            state.theme !== 'dark'
                                ?
                                <DarkModeIcon />
                                : <LightModeIcon />
                        }
                    </IconButton>
                </div>
                <Container />
                {
                    state.notification.status
                    &&
                    <Alert severity={state.notification.typeAlert} className='home_alert'>{state.notification.message}</Alert>
                }

            </div>
        </ThemeProvider>
    )
}
