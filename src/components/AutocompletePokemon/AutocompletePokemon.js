import { Autocomplete, TextField } from '@mui/material'
import React, { useState } from 'react'



export default function AutocompletePokemon(props) {
    const { pokemonList, pokemon, setPokemon} = props
    const [pokemonInput, setPokemonInput] = useState('')

    return (
        <>
            <Autocomplete
                inputValue={pokemonInput}
                onInputChange={(e, newInputValue) => {
                    setPokemonInput(newInputValue)
                }}
                value={pokemon}
                onChange={(e, newValue) => {
                    setPokemon(newValue)
                }}
                isOptionEqualToValue={(option, value) => value === null || option.id === value.id}
                disablePortal
                noOptionsText="Pokémon no encontrado"
                options={pokemonList}
                renderInput={(params) => <TextField {...params} label='Nombre pokemon' size={'small'} fullWidth required />}
            />

        </>


    )
}


