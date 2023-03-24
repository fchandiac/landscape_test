Este es un test para la empresa Lanscape

## Empezando

Clona el repositorio
```bash
git clone https://github.com/fchandiac/landscape_test.git
```

Instala las dependecias

```bash
npm install
```


Ejecuta el servidor de desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) con tu navegador.





Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



## Decripción General
La web app solicitada por Landscape, presenta dos paginas en un layout responsivo, con diseño para dispositivos mobiles y de escritorio, incluye un Appbar adaptativo.

## FORM page
Presenta un formulario con campos de datos personales con validaciones que se envia en el lado del cliente al endPoint http://localhost:3000/api/person, creado con las caracteristicas de API proporcionadas por Next.js.

La API valida tambien los datos en el lado del servidor. 

## POKEDEX page

Presenta un campo de búsqueda que utiliza un componente de Autocompletado de Pokemon para ayudar al usuario a encontrar el Pokemon deseado. Al seleccionar un Pokemon, la página realiza una solicitud a la API (pokeapi.co) y muestra la información del Pokemon seleccionado, como su nombre, altura, peso y una imagen de su apariencia.

Entre los endPoints de pokeapi.co, basando en la docoumentación, solamente se peuden consultar datos espcificos de un pokémon, consultando con su numero o su nombre. La solución propuesta fue utilizar un endPoint que devuelve la lista completa de los pokemon con su nombre y una url, para cargar mediante SSR el componente AutocomplePokemon, de esta manera el usuario realiza una busqueda eficiente del pokemon deseado y cuando se realiza la selección se hace una consulta del lado de cliente con el nombre del pokemon buscado. 



