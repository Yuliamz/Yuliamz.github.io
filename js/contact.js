$(function () {
    'use strict';

    const contactForm = $('#contact-form');
    const messages = contactForm.find('.messages');
    let alertBox;

    contactForm.validator();

    contactForm.on('submit', function (e) {

        if (!e.isDefaultPrevented()) {
            alertBox = '<div class="alert alert-info alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + 'Enviando mensaje...' + '</div>';
            messages.html(alertBox);

            const email = $('#form_email').val();
            let subject = $('#form_name').val();
            let body = '<strong>'+ subject+'</strong> '+' te ha escrito desde:  '+'<strong>'+ email +'</strong>' +
                 '<br><hr><br><br>'+
                $('#form_message').val();

            Email.send({
                SecureToken : "ed761491-38bf-4711-8485-8e48bbc9e90e",
                To : 'contacto@yuliamz.tech',
                From : "contacto@yuliamz.tech",
                Subject : subject,
                Body : body
            }).then(
                message => {
                    messages.remove('.alert-primary');
                    if (message==='OK'){
                         alertBox = '<div class="alert alert-success alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + 'Gracias por escribirme, me pondre en contacto contigo pronto' + '</div>';
                        contactForm[0].reset();
                    }else {
                         alertBox = '<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + 'Lo siento, no estoy disponible ahora mismo, puedes escribirme directamente a contacto@yuliamz.tech' + '</div>';
                    }
                    messages.html(alertBox);
                }
            );

            return false;
        }
    })
});