// Funciones de navegación

function scrollToMenu() {
    const menuSection = document.getElementById('menu');
    if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function scrollToReservation() {
    const cateringSection = document.getElementById('catering');
    if (cateringSection) {
        cateringSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Manejo del formulario de solicitud de carta
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Obtener datos del formulario
    const formData = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        tipo: document.getElementById('tipo').value,
        mensaje: document.getElementById('mensaje').value
    };
    
    // Validar que todos los campos estén completos
    if (!formData.nombre || !formData.email || !formData.telefono || !formData.tipo) {
        alert('Por favor, completa todos los campos requeridos.');
        return;
    }
    
    // Mostrar confirmación
    console.log('Formulario enviado:', formData);
    
    // Crear mensaje de confirmación
    const confirmMessage = `¡Gracias ${formData.nombre}!\n\nTu solicitud de ${formData.tipo} ha sido recibida.\n\nNos pondremos en contacto a través del correo ${formData.email} o al teléfono ${formData.telefono}.\n\nDatos de contacto:\nTeléfono: +569 87654321\nCorreo: RBuenSabor@gmail.com`;
    
    alert(confirmMessage);
    
    // Limpiar formulario
    document.querySelector('.cart-form').reset();
    
    // Aquí normalmente enviarías los datos a un servidor
    // fetch('/api/send-request', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(formData)
    // });
}

// Animación de scroll para elementos
document.addEventListener('DOMContentLoaded', function() {
    // Agregar clase activa al navegar
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Animación de entrada para elementos visibles
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            }
        });
    }, observerOptions);
    
    // Observar tarjetas de platos
    document.querySelectorAll('.dish-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
    
    // Observar tarjetas de catering
    document.querySelectorAll('.catering-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
});

// Estilos dinámicos para animaciones
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .navbar a.active {
        color: #DAA520;
        border-bottom: 3px solid #DAA520;
    }
`;
document.head.appendChild(style);

// Función para hacer la página más interactiva
function initializeInteractions() {
    // Agregar efecto hover a botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Hacer que los números de teléfono sean clickeables
    const phoneNumbers = document.querySelectorAll('p:contains("+569")');
    phoneNumbers.forEach(element => {
        const text = element.textContent;
        const phoneMatch = text.match(/\+569 \d{8}/);
        if (phoneMatch) {
            element.innerHTML = text.replace(
                phoneMatch[0],
                `<a href="tel:${phoneMatch[0].replace(/ /g, '')}" style="color: inherit; text-decoration: underline;">${phoneMatch[0]}</a>`
            );
        }
    });
}

// Inicializar interacciones cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeInteractions);
} else {
    initializeInteractions();
}

// Función para copiar número de teléfono al portapapeles
function copyPhoneNumber() {
    const phoneNumber = '+569 87654321';
    navigator.clipboard.writeText(phoneNumber).then(() => {
        alert('Número copiado al portapapeles: ' + phoneNumber);
    });
}

// Función para abrir WhatsApp
function openWhatsApp() {
    const phoneNumber = '569876543321'; // Sin espacios ni caracteres especiales
    const message = 'Hola, me gustaría solicitar información sobre los servicios de BuenSabor.';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

// Agregar smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});