import { AppBar, Toolbar, Typography, useMediaQuery, IconButton, Stack, Button, Box, Drawer, Divider, List, 
    ListItem, ListItemButton, ListItemText, Container } from '@mui/material'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeft from '@mui/icons-material/ChevronLeft'


export default function Layout(props) {
    const { children } = props
    const smallScreen = useMediaQuery(theme => theme.breakpoints.down('md'))
    const largeScreen = useMediaQuery(theme => theme.breakpoints.up('md'))
    const [drawerState, setDrawerState] = useState(false)
    const router = useRouter()

    return (
        <>
            <AppBar position={'static'} elevation={0} >
                <Toolbar >
                    {smallScreen ? (
                        <IconButton color="inherit" onClick={() => {setDrawerState(true)}}>
                            <MenuIcon />
                        </IconButton>

                    ) : (
                        <Stack direction="row" justifyContent={'space-around'} alignItems="flex-start">
                            <Stack direction="row" spacing={2}>
                                <Button onClick={() => { router.push('/') }} underline="none" color={'inherit'}>FORM</Button>
                                <Button onClick={() => { router.push('/pokedex') }} underline="none" color={'inherit'}>POKEDEX</Button>
                            </Stack>
                        </Stack>
                    )}
                    {smallScreen && (
                        <Typography variant={'h6'}>Landscape</Typography>
                    )}
                    <Box flexGrow={1} />
                    <Box alignContent={'flex-end'} sx={{ display: 'flex' }}>
                        {largeScreen && (<Typography variant={'h6'} sx={{ paddingTop: '1rem' }}>Landscape</Typography>)}
                        <Image src="/logo.png" alt="logo" width={50} height={50} />
                    </Box>
                </Toolbar>
            </AppBar>
            <Drawer anchor='left' open={drawerState}>
                <Box sx={{ justifyContent: 'flex-end', display: 'flex', padding: '0.3rem' }}>
                    <IconButton onClick={() => setDrawerState(false)} >
                        <ChevronLeft />
                    </IconButton>
                </Box>
                <Divider />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary="FORM"
                                onClick={() => {
                                    router.push({
                                        pathname: '/',
                                    })
                                    setDrawerState(false)
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemText primary="POKEDEX"
                                onClick={() => {
                                    router.push({
                                        pathname: '/pokedex',
                                    })
                                    setDrawerState(false)
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            <Container maxWidth={'sm'}>
            {children}
            </Container>
        </>
    )
}
