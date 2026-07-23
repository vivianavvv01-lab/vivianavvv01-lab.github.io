
$(document).ready(function () {

    let statsAnimated = false;

    function animarContadores() {
        // Evita que se repita la animación si ya se ejecutó
        if (statsAnimated) return;

        const $seccion = $('.stats-section');
        if ($seccion.length === 0) return;

        // Calcula si la sección ya es visible en la pantalla
        const topSeccion = $seccion.offset().top;
        const alturaVentana = $(window).height();
        const scrollActual = $(window).scrollTop();

        if (scrollActual + alturaVentana > topSeccion + 50) {
            statsAnimated = true;

            $('.stat-number').each(function () {
                const $el = $(this);
                const valorFinal = parseFloat($el.attr('data-target'));
                const sufijo = $el.attr('data-suffix') || '';
                const decimales = parseInt($el.attr('data-decimals')) || 0;

                $({ valor: 0 }).animate({ valor: valorFinal }, {
                    duration: 2000, // 2 segundos
                    easing: 'swing',
                    step: function () {
                        $el.text(this.valor.toFixed(decimales) + sufijo);
                    },
                    complete: function () {
                        
                        let textoFinal = decimales > 0
                            ? valorFinal.toFixed(decimales)
                            : Math.round(valorFinal).toLocaleString('en-US');
                        $el.text(textoFinal + sufijo);
                    }
                });
            });
        }
    }

    $(window).on('scroll', animarContadores);
    animarContadores();

});




/* 
   REVEAL AL HACER SCROLL
 */
document.addEventListener('DOMContentLoaded', function () {
    const elementosReveal = document.querySelectorAll('.reveal');

    const observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('reveal-visible');
                observador.unobserve(entrada.target); // se anima una sola vez
            }
        });
    }, {
        threshold: 0.15 // se activa cuando el 15% del elemento es visible
    });

    elementosReveal.forEach(function (el) {
        observador.observe(el);
    });
});



/* 
   BOTÓN 
 */
document.addEventListener('DOMContentLoaded', function () {
    const btnSubir = document.getElementById('btnSubirArriba');
    if (!btnSubir) return;

    window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
            btnSubir.classList.add('visible');
        } else {
            btnSubir.classList.remove('visible');
        }
    });

    btnSubir.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});



/* 
   GALERÍA:
 */
document.addEventListener('DOMContentLoaded', function () {
    const botonesFiltro = document.querySelectorAll('.galeria-filtro-btn');
    const items = document.querySelectorAll('.galeria-item');

    botonesFiltro.forEach(function (btn) {
        btn.addEventListener('click', function () {
            botonesFiltro.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            const filtro = btn.getAttribute('data-filtro');

            items.forEach(function (item) {
                const categoria = item.getAttribute('data-categoria');
                if (filtro === 'all' || categoria === filtro) {
                    item.classList.remove('oculto');
                } else {
                    item.classList.add('oculto');
                }
            });
        });
    });

    // LIGHTBOX
    const fotos = document.querySelectorAll('.galeria-foto');
    const modalImg = document.getElementById('galeriaModalImg');
    const modalNombre = document.getElementById('galeriaModalNombre');
    const modalEl = document.getElementById('galeriaModal');

    if (modalEl) {
        const modalBootstrap = new bootstrap.Modal(modalEl);

        fotos.forEach(function (foto) {
            foto.addEventListener('click', function () {
                const src = foto.querySelector('img').getAttribute('src');
                const nombre = foto.getAttribute('data-nombre');
                modalImg.setAttribute('src', src);
                modalNombre.textContent = nombre;
                modalBootstrap.show();
            });
        });
    }
});



/* 
   FORMULARIO DE CONTACTO: SPINNER + TOAST
 */
document.addEventListener('DOMContentLoaded', function () {
    const formContacto = document.getElementById('formContacto');
    if (!formContacto) return;

    const btnEnviar = document.getElementById('btnEnviarForm');
    const btnTexto = document.getElementById('btnEnviarTexto');
    const btnSpinner = document.getElementById('btnEnviarSpinner');
    const toastEl = document.getElementById('toastContacto');

    formContacto.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!formContacto.checkValidity()) {
            formContacto.reportValidity();
            return;
        }

        // Mostrar spinner
        btnTexto.textContent = 'Enviando...';
        btnSpinner.classList.remove('d-none');
        btnEnviar.disabled = true;

        setTimeout(function () {
            btnTexto.textContent = 'Enviar formulario';
            btnSpinner.classList.add('d-none');
            btnEnviar.disabled = false;
            formContacto.reset();

            const toastBootstrap = new bootstrap.Toast(toastEl);
            toastBootstrap.show();
        }, 1200);
    });
});