document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('demoForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validación básica
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        
        if (!fullName || !email) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Mostrar loading
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Enviar formulario usando Formspree
        const formData = new FormData(form);
        
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showMessage('Thank you! Your demo request has been sent. Redirecting...', 'success');
                
                // ? REDIRECCIÓN CORRECTA - Solo se ejecuta después de enviar el formulario
                setTimeout(() => {
                    window.location.href = 'thank-you.html';
                }, 3000);
                
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            showMessage('There was a problem sending your request. Please try again or contact us directly at centersyspro@gmail.com', 'error');
        })
        .finally(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        });
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showMessage(message, type) {
        // Remover mensajes anteriores
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Crear nuevo mensaje
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.padding = '15px';
        messageDiv.style.margin = '15px 0';
        messageDiv.style.borderRadius = '5px';
        messageDiv.style.textAlign = 'center';
        messageDiv.style.fontWeight = 'bold';
        
        if (type === 'success') {
            messageDiv.style.background = '#d4edda';
            messageDiv.style.color = '#155724';
            messageDiv.style.border = '1px solid #c3e6cb';
        } else {
            messageDiv.style.background = '#f8d7da';
            messageDiv.style.color = '#721c24';
            messageDiv.style.border = '1px solid #f5c6cb';
        }
        
        // Insertar antes del formulario
        form.parentNode.insertBefore(messageDiv, form);
        
        // Auto-remover después de 8 segundos (solo para errores)
        if (type === 'error') {
            setTimeout(() => {
                messageDiv.remove();
            }, 8000);
        }
    }
    
    // Animaciones para las tarjetas de servicio
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// ? NO AGREGUES NADA MÁS DESPUÉS DE ESTA LÍNEA
// El código termina aquí - sin redirecciones automáticas fuera del formulario
