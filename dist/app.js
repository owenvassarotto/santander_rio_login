document.addEventListener('DOMContentLoaded', function(){

    const campos = {
        nombre: '',
        apellido: '',
        email: '',
        contraseña: ''
    }

    const inputNombre = document.querySelector('#nombre');
    const inputApellido = document.querySelector('#apellido');
    const inputEmail = document.querySelector('#email');
    const inputContraseña = document.querySelector('#contraseña');
    const btnRegistrarse = document.querySelector('#btnRegistrarse');
    const formulario = document.querySelector('#formulario');
    const spinner = document.querySelector('#spinner');
    
    //Llamo a los eventos
    inputNombre.addEventListener('input', validar);
    inputApellido.addEventListener('input', validar);
    inputEmail.addEventListener('input', validar);
    inputContraseña.addEventListener('input', validar);
    formulario.addEventListener('submit', registrarse);
    

    function registrarse(e){
        e.preventDefault();

        spinner.classList.remove('hidden');
        spinner.classList.add('flex');

        setTimeout( () => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');

            const registrado = document.createElement('div');
            registrado.textContent = 'Usuario registrado correctamente ✔';
            registrado.classList.add('bg-gray-200', 'p-3', 'text-gray-500', 'mt-2', 'text-center', 'font-semibold');

            formulario.appendChild(registrado);

            resetearForm();

            setTimeout( () => {
                formulario.removeChild(formulario.lastChild);
            },3000);

        }, 3000);
    }

    function resetearForm(){
        campos.nombre = '';
        campos.apellido = '';
        campos.email = '';
        campos.contraseña = '';
        formulario.reset();
        comprobarObjetoCampos();
    }

    function validar(e){
        //Si el campo está vacío agrega alerta
        if(e.target.value.trim() === ''){
            // console.log(`El campo ${e.target.id} es obligatorio`);
            mostrarAlerta(`El ${e.target.id} es obligatorio`, e.target.parentElement);
            campos[e.target.name] = '';
            comprobarObjetoCampos();
            return;
        }

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta(`El ${e.target.id} es inválido`, e.target.parentElement);
            return;
        }

        campos[e.target.name] = e.target.value;

        comprobarObjetoCampos();

        eliminarAlerta(e.target.parentElement);
    }

    function mostrarAlerta(msg, padre){

        eliminarAlerta(padre);

        const mensaje = msg;
        const alerta = document.createElement('p');
        alerta.textContent = mensaje;
        alerta.classList.add('bg-gray-200', 'text-gray-500', 'p-2', 'mt-1');
        padre.appendChild(alerta);
    }

    function eliminarAlerta(padre){
        if(padre.children[2]){
            padre.removeChild(padre.lastChild);
        }
    }
  
    //función para validar si el email es válido, retorna true si el email es válido
    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarObjetoCampos(){
        if(Object.values(campos).includes('')){
            btnRegistrarse.classList.add('opacity-80');
            btnRegistrarse.disabled = true;
            return;
        }
        btnRegistrarse.classList.remove('opacity-80');
        btnRegistrarse.disabled = false;
    }

});