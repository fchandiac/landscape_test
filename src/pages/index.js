import { Button, Grid, TextField } from "@mui/material"
import React, { useState } from "react"


export default function Home() {
  const [personData, setPersonData] = useState(personDataDefault())
  const [personDataValidation, setPersonDataValidation] = useState(defaultValidation())

  const validation = () => {
    let nameValidation = validateName(personData.name)
    let mailValidation = validateEmail(personData.mail)

    let validationArray = [nameValidation, mailValidation]
    console.log(validationArray)
    let validationFilter = validationArray.filter(item => item.err == true)
    //let validationResult = validationFilter.length == 0 ? true : false

    setPersonDataValidation({
      name: nameValidation,
      mail: mailValidation,
      age: { err: false, text: '' },
      phone: { err: false, text: '' }
    })

    console.log(validationFilter)
  }



  const sendData = () => {
    validation()
    console.log(personData)
  }

  return (
    <>
      <form onSubmit={(e) => { e.preventDefault(); sendData() }}>
        <Grid container spacing={1} direction={'column'}>
          <Grid item>
            <TextField
              label='Nombre'
              value={personData.name}
              onChange={(e) => { setPersonData({ ...personData, name: e.target.value })}}
              variant="outlined"
              size={'small'}
              fullWidth
              onFocus={(e) => { setPersonDataValidation({ ...personDataValidation, name: { err: false, text: '' } })}}
              error={personDataValidation.name.err}
              helperText={personDataValidation.name.text}
     
            />
            <Grid item>
              <TextField
              label='Mail'
              value={personData.mail}
              onChange={(e) => { setPersonData({ ...personData, mail: e.target.value }) }}
              variant="outlined"
              size={'small'}
              fullWidth
              onFocus={(e) => { setPersonDataValidation({ ...personDataValidation, mail: { err: false, text: '' } })}}
              error={personDataValidation.mail.err}
              helperText={personDataValidation.mail.text}
            />
            </Grid>
            <Grid item>
              {/* <TextField
              label='Edad'
              value={personData.age}
              onChange={(e) => { setPersonData({ ...personData, age: e.target.value })}}
              variant="outlined"
              size={'small'}
              type={'number'}
              fullWidth
              InputProps={{ validator: validateAge }}
              error={Boolean(validateAge(personData.age))}
              helperText={validateAge(personData.age)}
            /> */}
            </Grid>
            <Grid item>
              <TextField
                label='Teléfono'
                value={personData.phone}
                // onChange={(e) => { setProducerData({ ...producerData, address: e.target.value }) }}
                variant="outlined"
                size={'small'}
                fullWidth
        
              />
            </Grid>
            <Grid item>
              <Button type='submit' variant="contained" color="primary" size={'large'}>enviar</Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  )
}


function personDataDefault() {
  return {
    name: '',
    mail: '',
    age: 10,
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