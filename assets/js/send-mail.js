(function ($) {
    "use strict";
    jQuery(document).ready(function () {

	// Get the form.
	var form = $('#booking-form');

	// Get the messages div.
	var formMessages = $('.form-message');
	
	$(formMessages).fadeOut();

	// Set up an event listener for the contact form.
	$(form).submit(function(e) {
		// Stop the browser from submitting the form.
		e.preventDefault();

		// Serialize the form data.
		var formData = $(form).serialize();

		// Submit the form using AJAX.
		$.ajax({
			type: 'POST',
			url: $(form).attr('action'),
			data: formData
		})
		.done(function(response) {
			// Make sure that the formMessages div has the 'success' class.
			$(formMessages).fadeIn();
			$(formMessages).removeClass('alert-danger');
			$(formMessages).addClass('alert-success');

			// Set the message text.
			$(formMessages).text(response);
			setTimeout(function(){ $(formMessages).fadeOut() }, 5000);

			// Clear the form.
			$('#contact-form input,#contact-form textarea').val('');
			$('form').trigger("reset");
		})
		.fail(function(data) {
			// Make sure that the formMessages div has the 'error' class.
			$(formMessages).fadeIn();
			$(formMessages).removeClass('alert-success');
			$(formMessages).addClass('alert-danger');
			setTimeout(function(){ $(formMessages).fadeOut() }, 5000);

			// Set the message text.
			if (data.responseText !== '') {
				$(formMessages).text(data.responseText);
			} else {
				$(formMessages).text('Oops! An error occured and your message could not be sent.');
			}
		});
	});

    });
})(jQuery);
