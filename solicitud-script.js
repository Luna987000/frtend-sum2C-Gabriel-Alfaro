// SCRIPT PARA LA PÁGINA DE SOLICITUD

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('solicitudForm');
    
    // REFERENCIAS A ELEMENTOS
    const tipoSolicitudInputs = document.querySelectorAll('input[name="tipoSolicitud"]');
    const duracionGroup = document.getElementById('duracionGroup');
    const nombreEventoGroup = document.getElementById('nombreEventoGroup');
    const tipoEventoGroup = document.getElementById('tipoEventoGroup');
    const otroEventoGroup = document.getElementById('otroEventoGroup');
    const lugarEventoGroup = document.getElementById('lugarEventoGroup');
    const servicioMozosGroup = document.getElementById('servicioMozosGroup');
    const mobiliarioGroup = document.getElementById('mobiliarioGroup');
    const cantidadMenuInfantilGroup = document.getElementById('cantidadMenuInfantilGroup');
    const otrasRestriccionesGroup = document.getElementById('otrasRestriccionesGroup');
    
    const tipoEvento = document.getElementById('tipoEvento');
    const otrasCheckbox = document.getElementById('otras');
    const menuInfantilCheckbox = document.getElementById('menuInfantil');
    const otrasRestricciones = document.getElementById('otrasRestricciones');
    const observaciones = document.getElementById('observaciones');
    
    // EVENTOS PARA MOSTRAR/OCULTAR CAMPOS SEGÚN TIPO DE SOLICITUD
    tipoSolicitudInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value === 'catering') {
                duracionGroup.style.display = 'block';
                nombreEventoGroup.style.display = 'block';
                tipoEventoGroup.style.display = 'block';
                lugarEventoGroup.style.display = 'block';
                servicioMozosGroup.style.display = 'block';
                mobiliarioGroup.style.display = 'block';
                
                // Hacer campos requeridos
                document.getElementById('duracion').required = true;
                document.getElementById('nombreEvento').required = true;
                document.getElementById('tipoEvento').required = true;
                document.getElementById('lugarEvento').required = true;
            } else {
                duracionGroup.style.display = 'none';
                nombreEventoGroup.style.display = 'none';
                tipoEventoGroup.style.display = 'none';
                otroEventoGroup.style.display = 'none';
                lugarEventoGroup.style.display = 'none';
                servicioMozosGroup.style.display = 'none';
                mobiliarioGroup.style.display = 'none';
                
                // Quitar requerimiento
                document.getElementById('duracion').required = false;
                document.getElementById('nombreEvento').required = false;
                document.getElementById('tipoEvento').required = false;
                document.getElementById('lugarEvento').required = false;
                document.getElementById('otroEvento').required = false;
                
                // Limpiar valores
                document.getElementById('tipoEvento').value = '';
                otroEventoGroup.style.display = 'none';
            }
        });
    });

    // MOSTRAR/OCULTAR CAMPO "OTRO" EN TIPO DE EVENTO
    if (tipoEvento) {
        tipoEvento.addEventListener('change', function() {
            if (this.value === 'otro') {
                otroEventoGroup.style.display = 'block';
                document.getElementById('otroEvento').required = true;
            } else {
                otroEventoGroup.style.display = 'none';
                document.getElementById('otroEvento').required = false;
                document.getElementById('otroEvento').value = '';
            }
        });
    }

    // MOSTRAR/OCULTAR CAMPO DE OTRAS RESTRICCIONES
    if (otrasCheckbox) {
        otrasCheckbox.addEventListener('change', function() {
            if (this.checked) {
                otrasRestriccionesGroup.style.display = 'block';
                otrasRestricciones.required = true;
            } else {
                otrasRestriccionesGroup.style.display = 'none';
                otrasRestricciones.required = false;
                otrasRestricciones.value = '';
            }
        });
    }

    // MOSTRAR/OCULTAR CANTIDAD DE MENÚS INFANTILES
    if (menuInfantilCheckbox) {
        menuInfantilCheckbox.addEventListener('change', function() {
            if (this.checked) {
                cantidadMenuInfantilGroup.style.display = 'block';
                document.getElementById('cantidadMenuInfantil').required = true;
            } else {
                cantidadMenuInfantilGroup.style.display = 'none';
                document.getElementById('cantidadMenuInfantil').required = false;
                document.getElementById('cantidadMenuInfantil').value = '';
            }
        });
    }

    // CONTADOR DE CARACTERES PARA RESTRICCIONES
    if (otrasRestricciones) {
        otrasRestricciones.addEventListener('input', function() {
            const count = this.value.length;
            document.getElementById('otrasRestriccionesCount').textContent = count;
        });
    }

    // CONTADOR DE CARACTERES PARA OBSERVACIONES
    if (observaciones) {
        observaciones.addEventListener('input', function() {
            const count = this.value.length;
            document.getElementById('observacionesCount').textContent = count;
        });
    }

    // VALIDACIÓN DE FORMULARIO
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Limpiar errores previos
        limpiarErrores();

        if (validarFormulario()) {
            // Si todo está válido, mostrar mensaje de éxito
            mostrarMensajeExito();
            // En una aplicación real, aquí se enviaría el formulario a un servidor
            // form.submit();
        }
    });

    // FUNCIONES DE VALIDACIÓN
    function validarFormulario() {
        let esValido = true;

        // Validar que se haya seleccionado un tipo de solicitud
        const tipoSolicitud = document.querySelector('input[name="tipoSolicitud"]:checked');
        if (!tipoSolicitud) {
            mostrarError('Debe seleccionar un tipo de solicitud');
            esValido = false;
        }

        // Validar fecha
        const fechaEvento = document.getElementById('fechaEvento');
        if (!fechaEvento.value) {
            marcarCampoError(fechaEvento);
            esValido = false;
        } else {
            const fechaSeleccionada = new Date(fechaEvento.value);
            const hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            
            if (fechaSeleccionada < hoy) {
                mostrarError('La fecha del evento debe ser igual o posterior a hoy');
                marcarCampoError(fechaEvento);
                esValido = false;
            }
        }

        // Validar hora
        const horaInicio = document.getElementById('horaInicio');
        if (!horaInicio.value) {
            marcarCampoError(horaInicio);
            esValido = false;
        }

        // Validar campos específicos según tipo de solicitud
        if (tipoSolicitud && tipoSolicitud.value === 'catering') {
            const duracion = document.getElementById('duracion');
            const nombreEvento = document.getElementById('nombreEvento');
            const tipoEvento = document.getElementById('tipoEvento');
            const lugarEvento = document.getElementById('lugarEvento');

            if (!duracion.value) {
                marcarCampoError(duracion);
                esValido = false;
            }

            if (!nombreEvento.value.trim()) {
                marcarCampoError(nombreEvento);
                esValido = false;
            }

            if (!tipoEvento.value) {
                marcarCampoError(tipoEvento);
                esValido = false;
            } else if (tipoEvento.value === 'otro') {
                const otroEvento = document.getElementById('otroEvento');
                if (!otroEvento.value.trim()) {
                    marcarCampoError(otroEvento);
                    esValido = false;
                }
            }

            if (!lugarEvento.value.trim()) {
                marcarCampoError(lugarEvento);
                esValido = false;
            }
        }

        // Validar comensales
        const cantidadAdultos = document.getElementById('cantidadAdultos');
        if (!cantidadAdultos.value || cantidadAdultos.value < 1) {
            marcarCampoError(cantidadAdultos);
            esValido = false;
        }

        // Validar menú infantil si está marcado
        if (menuInfantilCheckbox.checked) {
            const cantidadMenuInfantil = document.getElementById('cantidadMenuInfantil');
            if (!cantidadMenuInfantil.value || cantidadMenuInfantil.value < 1) {
                marcarCampoError(cantidadMenuInfantil);
                esValido = false;
            }
        }

        // Validar datos del cliente
        const nombreCompleto = document.getElementById('nombreCompleto');
        if (!nombreCompleto.value.trim()) {
            marcarCampoError(nombreCompleto);
            esValido = false;
        }

        const correo = document.getElementById('correoElectronico');
        const confirmarCorreo = document.getElementById('confirmarCorreo');
        
        if (!correo.value.trim()) {
            marcarCampoError(correo);
            esValido = false;
        }

        if (!confirmarCorreo.value.trim()) {
            marcarCampoError(confirmarCorreo);
            esValido = false;
        }

        if (correo.value !== confirmarCorreo.value) {
            mostrarError('Los correos electrónicos no coinciden');
            marcarCampoError(correo);
            marcarCampoError(confirmarCorreo);
            esValido = false;
        }

        const telefono = document.getElementById('telefonoContacto');
        if (!telefono.value.trim()) {
            marcarCampoError(telefono);
            esValido = false;
        }

        const tipoMenu = document.getElementById('tipoMenu');
        if (!tipoMenu.value) {
            marcarCampoError(tipoMenu);
            esValido = false;
        }

        // Validar bebidas
        const bebidasChecked = document.querySelectorAll('input[name="bebidas"]:checked');
        if (bebidasChecked.length === 0) {
            mostrarError('Debe seleccionar al menos una bebida');
            esValido = false;
        }

        // Validar restricciones adicionales si está marcada la opción "Otras"
        if (otrasCheckbox.checked) {
            if (!otrasRestricciones.value.trim()) {
                marcarCampoError(otrasRestricciones);
                esValido = false;
            }
        }

        // Validar checkboxes de confirmación
        const contactoConfirmacion = document.getElementById('contactoConfirmacion');
        const terminosCondiciones = document.getElementById('terminosCondiciones');
        const politicaPrivacidad = document.getElementById('politicaPrivacidad');

        if (!contactoConfirmacion.checked) {
            mostrarError('Debe aceptar que BuenSabor se contacte para confirmar disponibilidad');
            esValido = false;
        }

        if (!terminosCondiciones.checked) {
            mostrarError('Debe aceptar los Términos y Condiciones');
            esValido = false;
        }

        if (!politicaPrivacidad.checked) {
            mostrarError('Debe aceptar la Política de Privacidad');
            esValido = false;
        }

        return esValido;
    }

    function marcarCampoError(campo) {
        campo.classList.remove('campo-ok');
        campo.classList.add('campo-error');
    }

    function marcarCampoOk(campo) {
        campo.classList.remove('campo-error');
        campo.classList.add('campo-ok');
    }

    function limpiarErrores() {
        const campos = form.querySelectorAll('input, select, textarea');
        campos.forEach(campo => {
            campo.classList.remove('campo-error', 'campo-ok');
        });
    }

    function mostrarError(mensaje) {
        alert('Error en el formulario:\n\n' + mensaje);
    }

    function mostrarMensajeExito() {
        alert('¡Solicitud enviada exitosamente!\n\nNos pondremos en contacto a la brevedad para confirmar disponibilidad.\n\nGracias por elegir BuenSabor.');
        
        // Reiniciar formulario
        form.reset();
        limpiarErrores();
        
        // Ocultar campos condicionales
        duracionGroup.style.display = 'none';
        nombreEventoGroup.style.display = 'none';
        tipoEventoGroup.style.display = 'none';
        otroEventoGroup.style.display = 'none';
        lugarEventoGroup.style.display = 'none';
        servicioMozosGroup.style.display = 'none';
        mobiliarioGroup.style.display = 'none';
        cantidadMenuInfantilGroup.style.display = 'none';
        otrasRestriccionesGroup.style.display = 'none';
        
        // Reiniciar contadores
        document.getElementById('otrasRestriccionesCount').textContent = '0';
        document.getElementById('observacionesCount').textContent = '0';
    }

    // VALIDACIÓN EN TIEMPO REAL
    const campos = form.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="number"], select, textarea');
    
    campos.forEach(campo => {
        campo.addEventListener('blur', function() {
            if (this.value.trim() !== '' && this.hasAttribute('required')) {
                marcarCampoOk(this);
            } else if (this.value.trim() === '' && this.hasAttribute('required')) {
                marcarCampoError(this);
            }
        });

        campo.addEventListener('focus', function() {
            this.classList.remove('campo-error', 'campo-ok');
        });
    });

    // VALIDACIÓN DE CORREOS EN TIEMPO REAL
    const correo = document.getElementById('correoElectronico');
    const confirmarCorreo = document.getElementById('confirmarCorreo');

    confirmarCorreo.addEventListener('blur', function() {
        if (correo.value === this.value && this.value.trim() !== '') {
            marcarCampoOk(this);
            marcarCampoOk(correo);
        } else if (this.value.trim() !== '') {
            marcarCampoError(this);
            marcarCampoError(correo);
        }
    });

    // VALIDACIÓN DE CANTIDAD DE COMENSALES
    const cantidadAdultos = document.getElementById('cantidadAdultos');
    const cantidadMenores = document.getElementById('cantidadMenores');

    cantidadAdultos.addEventListener('change', function() {
        const adultos = parseInt(this.value) || 0;
        const menores = parseInt(cantidadMenores.value) || 0;
        const total = adultos + menores;

        if (total > 200) {
            mostrarError('El total de comensales no puede exceder 200 personas');
            this.value = '';
            marcarCampoError(this);
        }
    });

    cantidadMenores.addEventListener('change', function() {
        const adultos = parseInt(cantidadAdultos.value) || 0;
        const menores = parseInt(this.value) || 0;
        const total = adultos + menores;

        if (total > 200) {
            mostrarError('El total de comensales no puede exceder 200 personas');
            this.value = '';
            marcarCampoError(this);
        }
    });
});