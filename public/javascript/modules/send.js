import moment from 'moment';
import axios from 'axios';
import pagination from '../modules/pagination';

console.log('THIS IS A TEST');

const openFormButton = document.getElementById('open-form');
const form = document.getElementById('form');
const postContentInput = document.getElementById('content');
const postSignatureInput = document.getElementById('signature');
const sendButton = document.getElementById('send');
const errorsZone = document.getElementById('errors'); 
const publications = document.getElementById('publications');
const numPosts = document.getElementById('count');

const openForm = () => {
  const animation = document.querySelector('.animate__fadeIn');
  form.classList.add('animate__animated');

  if(animation) { 
    // Ocultar el formulario
    form.classList.remove('animate__fadeIn');
    form.classList.add('animate__fadeOut');
    setTimeout(() => {
      form.classList.toggle('visible');
    }, 400);
  } else { 
    // Mostrar el formulario
    form.classList.remove('animate__fadeOut');
    form.classList.add('animate__fadeIn');
    form.classList.toggle('visible');
  }

  // Resetear el formulario
  resetForm();
}

const clearErrors = () => {
  const errorCondition = document.querySelector('.error-alert');
  if (errorCondition) {
    errorCondition.remove();
  }
}

const showError = (e, status, msg) => {
  // Borrar errores anteriores
  clearErrors();

  // Construir el error
  const error = document.createElement('p');
  error.textContent = msg;
  error.classList.add('error-alert');

  // Si no hay errores anteriores mostrar el error
  const errors = document.querySelectorAll('.error-alert');
  if(errors.length === 0) {
    errorsZone.appendChild(error);
  }

  // Indicar que hay un error agregando un borde rojo al input
  markInput(e, status);
}

const showAlert = (text) => {
  // Mstar la alerta
  const alert = document.createElement('div');
  alert.classList.add('alert', 'animate__animated','animate__backInRight');
  alert.innerText = text;
  document.querySelector('body').appendChild(alert);

  // Ocultar la alerta
  setTimeout(() => {
    alert.classList.remove('animate__backInRight')
    alert.classList.add('animate__backOutRight');
  }, 4000);
}

const markInput = (e, status) => {
  if(status === 'success') { 
    e.target.classList.remove('error');
    e.target.classList.add('success');
  } else {
    e.target.classList.remove('success');
    e.target.classList.add('error');
  }
}

const resetForm = () => {
  // Resetear errores anteriores
  const errorCondition = document.querySelector('.error-alert');
  if (errorCondition) {
    errorCondition.remove();
  }

  // Resetear los campos
  postContentInput.value = '';
  postSignatureInput.value = '';

  // Eliminar las clases de success y error de los campos
  postContentInput.classList.remove('success', 'error');
  postSignatureInput.classList.remove('success', 'error');
}

const validateForm = e => {
  // Validacion del campo postContentInput
  if(e.target.type === 'textarea') {
    // EL campo no esta vacio y el valor es mayor a 50 y menor a 300 caracteres
    if(e.target.value.length > 0 && e.target.value.length >= 50 && e.target.value.length <= 300) {
    // Indicar que esta bien la informacion agregando un borde verde al input
      markInput(e, 'success'); 
      clearErrors();
    } else if (e.target.value.length === 0) { // El campo esta vacio
      showError(e, 'error', 'The "Your idea" field cannot be empty');
    } else if(e.target.value.length < 50) { // El valor es menor a 50 caracteres
      showError(e, 'error', 'The idea must have at least 50 characters');
    } else if (e.target.value.length > 300) { // El valor es mayor a 300 caracteres
      showError(e, 'error', 'The idea must be a maximum of 300 characters');
    }
  }
  // Validacion del campo postSignatureInput
  if(e.target.type === 'text') {
    // El campo no esta vacio y el valor es menor a 75 caracteres
    if(e.target.value.length > 0 && e.target.value.length <= 75) {
      // Indicar que esta bien la informacion agregando un borde verde al input
      markInput(e, 'success');
      clearErrors();
    } else if(e.target.value.length === 0) { // El campo esta vacio
      showError(e, 'error', 'The "Your signature" field cannot be empty');
    } else  if( e.target.value.length > 75) { // El valor es mayor a 75 caracteres
      showError(e, 'error', 'The signature must be a maximum of 75 character');
    }
  }
}

const update = (post) => {
  // Resetear el formulario
  resetForm();

  // Cerrar el formulario
  openForm();

  // mantener el numero de posts por pagina
  const select = document.querySelector("#numberPosts");
  select.options[select.selectedIndex]

  // Actualizar el contador de publicaciones
  numPosts.innerText = `${Number(numPosts.textContent) + 1} `;
}

const sendPublication = e => {
  // Cancelar el funcionamiento por defecto
  e.preventDefault();

  if(postContentInput.value === '' && postSignatureInput.value === '') {
    postContentInput.classList.add('error');
    postSignatureInput.classList.add('error');

    // Construir el error
    const error = document.createElement('p');
    error.textContent = 'both fields are required';
    error.classList.add('error-alert');

    // Si no hay errores anteriores mostrar el error
    const errors = document.querySelectorAll('.error-alert');
    if(errors.length === 0) {
      errorsZone.appendChild(error);
    }
  }

  // Construir los valores
  const postContent = postContentInput.value.trim();
  const postSignature = postSignatureInput.value.trim();
  const numLetters = postContent.split('').length;;
  const date = moment(new Date()).format('MMMM Do YYYY, h:mm:ss a');

  // Juntar los valores en un objeto
  const post = {
    postContent,
    postSignature,
    numLetters,
    date
  }

  // Validar que la informacion sea la correcta
  if (postContentInput.value.length > 0 && 
      postContentInput.value.length >= 50 && 
      postContentInput.value.length <= 300 && 
      postSignatureInput.value.length > 0 && 
      postSignatureInput.value.length <= 75) {
    // Enviar una peticion al backend con el objeto creado
    axios.post('/', {post})
      .then(function(response) {
        // Si la respuesta del servidor es satisfactoria ...
        if(response.status === 200) {
          // Actualizar la informacion mostrada en la pagina
          update(post);  

          let data = response.data;
          data.push(post);

          pagination(data);

          // Lanzar una alerta indicando que todo a salido correctamente
          showAlert('Your idea has been saved successfully');
        }
      })
      .catch(function(error) {
      });
  }
}

openFormButton.addEventListener('click', openForm);
postContentInput.addEventListener('blur', validateForm);
postSignatureInput.addEventListener('blur', validateForm);
sendButton.addEventListener('click', sendPublication);