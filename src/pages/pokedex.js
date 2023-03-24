import AutocompletePokemon from '@/components/AutocompletePokemon'
import CardPokemon from '@/components/CardPokemon';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useState } from 'react'


export default function pokedex({ pokemonList }) {
    const [pokemon, setPokemon] = useState({ key: null, label: '' })
    const [name, setName] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [sprite, setSprite] = useState('')

    const queryPokemon = () => {
        if (pokemon != null) {
            fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.label}`)
                .then(response => response.json())
                .then(data => {
                    setName(data.name)
                    setHeight(data.height)
                    setWeight(data.weight)
                    setSprite(data.sprites.front_default)
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }

    return (
        <>
            <Paper elevation={0} sx={{ padding: '1rem' }}>
                <Typography
                    component='h1'
                    variant='h2'
                    align='center'
                    color='text.primary'
                    gutterBottom
                >
                    Pokedex
                </Typography>
                <Typography variant='h5' align='center' color='text.secondary' paragraph>
                    En este Pokedex podras buscar los pokemones que desees, solo escribe el nombre del pokémon y te mostraremos su informacion.
                </Typography>
            </Paper>
            <form onSubmit={(e) => { e.preventDefault(); queryPokemon() }}>
                <Grid container spacing={2}>

                    <Grid item xs={8} sm={10}>
                        <AutocompletePokemon pokemonList={pokemonList} pokemon={pokemon} setPokemon={setPokemon} />
                    </Grid>
                    <Grid item xs={2} sm={2}>
                        <Button variant={'contained'} color={'primary'} type='submit'>Buscar</Button>
                    </Grid>
                </Grid>
            </form>

            <Box sx={{ ...(name == '' && { display: 'none' }) }} alignItems={'center'} textAlign={'centers'}>
                <CardPokemon
                    name={name}
                    height={height}
                    weight={weight}
                    sprite={sprite}
                />
            </Box>
        </>
    )
}

export async function getServerSideProps() {
    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1218');
        const data = await res.json()
        const regex = /\/(\d+)\/$/
        const pokemonList = data.results.map(item => ({
            key: item.url.match(regex)[1],
            label: item.name
        }))
        return { props: { pokemonList } }
    } catch (error) {
        console.error(error);
        return { props: { pokemonList: [] } }
    }
}


