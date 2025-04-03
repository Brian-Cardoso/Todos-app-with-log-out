const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const form = document.querySelector('#form');
const errorText = document.querySelector('#error-text');

form.addEventListener('submit', async e => {
    e.preventDefault();
    // utilizamos axios para comunicar el front con el back y el try catch para que sea un evento asyncrono porque no sabemos cuando tiempo va a tardar para enviar una respuesta.
    try {
        const user = {
            email: emailInput.value,
            password: passwordInput.value
        }
        // axios es para hacer puente, una conexion entre front con el back y estamos enviando con el metodo http la informacion del usuario que es el email y el password.
        await axios.post('/api/login', user);
        //en este caso si el usuario es correcto se le va a redirigir a todos.
        window.location.pathname = `/todos/`;
    } catch (error) {
        console.log(error);
        errorText.innerHTML = error.response.data.error;
    }
    
    
    console.log(user);
})