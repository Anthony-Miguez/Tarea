document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#registroForm');
    const nombreInput = document.querySelector('#nombre');
    const correoInput = document.querySelector('#correo');
    const edadInput = document.querySelector('#edad');
    const comentariosInput = document.querySelector('#comentarios');
    const mensajeDiv = document.querySelector('#mensaje');

    // Función para mostrar mensajes de error
    const mostrarError = (elemento, mensaje) => {
        const errorElement = document.querySelector(`#${elemento}Error`);
        errorElement.textContent = mensaje;
    };

    // Función para limpiar mensajes de error
    const limpiarErrores = () => {
        document.querySelectorAll('.error').forEach(error => error.textContent = '');
        mensajeDiv.textContent = '';
    };

    // Validar correo electrónico
    const validarCorreo = (correo) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(correo);
    };

    // Evento de teclado para limpiar errores al escribir
    [nombreInput, correoInput, edadInput, comentariosInput].forEach(input => {
        input.addEventListener('input', limpiarErrores);
    });

    // Evento submit del formulario
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evitar recarga de página
        limpiarErrores();

        let hasError = false;

        // Validaciones
        if (!nombreInput.value.trim()) {
            mostrarError('nombre', 'El nombre es obligatorio');
            hasError = true;
        }

        if (!correoInput.value.trim()) {
            mostrarError('correo', 'El correo es obligatorio');
            hasError = true;
        } else if (!validarCorreo(correoInput.value)) {
            mostrarError('correo', 'El correo no es válido');
            hasError = true;
        }

        if (!edadInput.value) {
            mostrarError('edad', 'La edad es obligatoria');
            hasError = true;
        } else if (edadInput.value < 18) {
            mostrarError('edad', 'Debes ser mayor de 17 años');
            hasError = true;
        }

        if (!comentariosInput.value.trim()) {
            mostrarError('comentarios', 'Los comentarios son obligatorios');
            hasError = true;
        }

        // Si no hay errores, mostrar mensaje de bienvenida
        if (!hasError) {
            const mensaje = document.createElement('p');
            mensaje.classList.add('success');
            mensaje.textContent = `¡Gracias, ${nombreInput.value}! Tu formulario ha sido enviado correctamente.`;
            mensajeDiv.appendChild(mensaje);
            form.reset();
        }
    });
});
