import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'

export default function CardPokemon(props) {
    const { name, height, weight, sprite } = props
    return (
        <>
            <Card elevation={0} sx={{width: '150px'}}>
                <CardMedia
                    sx={{height: '150px'}}
                    component='img'
                    image={sprite} />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                    <Stack>
                        <Typography variant="body2" color="text.secondary">
                            Estatura: {height}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Peso: {weight}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </>
    )
}
