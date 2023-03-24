

export default function handler(req, res) {
    const { name, mail, phone, age } = req.query
    let validateTest = validatePerson(name, mail, age)

    if (!validateTest.state) {
      res.status(400).json({ message: validateTest.message, data: { name, mail, phone, age } })
      return
    }
  
    res.status(200).json({ message: 'Los parámetros son válidos', data: { name, mail, phone, age } })
  }


function validatePerson(name, mail, age){
    let result = {state: true, message: ''}
    const regex = /\S+@\S+\.\S+/

    if(!name || !mail || !age){
        result = {state: false, message: 'Campo requerido ausente'}
    } else if (!regex.test(mail)){
        console.log('mail')
        result = {state: false, message: 'Error en formato de correo electrónico'}
    } else if (age <= 18){
        result = {state: false, message: 'Edad no válida'}
    }

    return result
}