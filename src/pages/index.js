import AppSuccessSnack from "@/components/AppSuccessSnack"
import { Button, Grid, TextField, Paper, Typography } from "@mui/material"
import React, { useState } from "react"


export default function Home() {
  const [personData, setPersonData] = useState(personDataDefault())
  const [personDataValidation, setPersonDataValidation] = useState(defaultValidation())
  const [openSnack, setOpenSnack] = useState(false)


  const validation = () => {
    let nameValidation = validateName(personData.name)
    let mailValidation = validateEmail(personData.mail)
    let ageValidation = validateAge(personData.age)

    let validationArray = [nameValidation, mailValidation, ageValidation]
    let validationFilter = validationArray.filter(item => item.err == true)
    let validationResult = validationFilter.length == 0 ? true : false

    setPersonDataValidation({
      name: nameValidation,
      mail: mailValidation,
      age: ageValidation,
      phone: { err: false, text: '' }
    })

    return validationResult
  }



  const sendData = () => {
    if (validation() === true) {
      console.log('enviando')
      const url = 'http://localhost:3000/api/person';
      fetch(`${url}?${new URLSearchParams(personData)}`)
        .then(res => {
          if (res.ok) {
            return res.json()
          } else {
            return res.json().then(err => { throw err })
          }
        })
        .then(data => {
          console.log(data)
          setOpenSnack(true)
          setPersonData(personDataDefault())

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
          Formulario
        </Typography>
        <Typography variant='h5' align='center' color='text.secondary' paragraph>
          En este formulario podras ingresar tus datos personales.
        </Typography>
      </Paper>

      <Grid container spacing={1} direction={'column'} marginTop={2}>
        <form onSubmit={(e) => { e.preventDefault(); sendData() }}>
          <Grid item paddingTop={1}>
            <TextField
              name='name'
              label='Nombre *'
              value={personData.name}
              onChange={(e) => { setPersonData({ ...personData, name: e.target.value }) }}
              variant="outlined"
              size={'small'}
              fullWidth
              onFocus={(e) => { setPersonDataValidation({ ...personDataValidation, name: { err: false, text: '' } }) }}
              error={personDataValidation.name.err}
              helperText={personDataValidation.name.text}

            />
          </Grid>
          <Grid item paddingTop={1}>
            <TextField
              name='mail'
              label='Mail *'
              value={personData.mail}
              onChange={(e) => { setPersonData({ ...personData, mail: e.target.value }) }}
              variant="outlined"
              size={'small'}
              fullWidth
              onFocus={(e) => { setPersonDataValidation({ ...personDataValidation, mail: { err: false, text: '' } }) }}
              error={personDataValidation.mail.err}
              helperText={personDataValidation.mail.text}
            />
          </Grid>
          <Grid item paddingTop={1}>
            <TextField
              name="phone"
              label='Teléfono'
              value={personData.phone}
              onChange={(e) => { setPersonData({ ...personData, phone: e.target.value }) }}
              variant="outlined"
              size={'small'}
              fullWidth
            />
          </Grid>
          <Grid item paddingTop={1}>
            <TextField
              name='age'
              label='Edad *'
              value={personData.age}
              onChange={(e) => { setPersonData({ ...personData, age: e.target.value }) }}
              variant="outlined"
              size={'small'}
              type={'number'}
              fullWidth
              onFocus={(e) => { setPersonDataValidation({ ...personDataValidation, age: { err: false, text: '' } }) }}
              error={personDataValidation.age.err}
              helperText={personDataValidation.age.text}
            />
          </Grid>
          <Grid item paddingTop={1} textAlign={'right'}>
            <Button type='submit' variant="contained" color="primary" size={'large'}>enviar</Button>
          </Grid>
        </form>
      </Grid>
      <AppSuccessSnack openSnack={openSnack} setOpenSnack={setOpenSnack} text={'Datos enviados correctamente'} />

    </>
  )
}


function personDataDefault() {
  return {
    name: '',
    mail: '',
    age: '',
    phone: ''
  }
}

function defaultValidation() {
  return {
    name: { err: false, text: '' },
    mail: { err: false, text: '' },
    age: { err: false, text: '' },
    phone: { err: false, text: '' }
  }
}

function validateName(value) {
  if (!value) {
    return { err: true, text: 'Este campo es obligatorio' }
  } else {
    return { err: false, text: '' }
  }
}

function validateEmail(value) {
  const regex = /\S+@\S+\.\S+/
  if (!value) {
    return { err: true, text: 'Este campo es obligatorio' }
  } else if (!regex.test(value)) {
    return { err: true, text: 'El correo electrónico no es válido' }
  } else {
    return { err: false, text: '' }
  }
}

function validateAge(value) {
  if (!value) {
    return { err: true, text: 'Este campo es obligatorio' }
  } else if (value <= 18) {
    return { err: true, text: 'Debes ser mayor de edad' }
  } else {
    return { err: false, text: '' }
  }
}

