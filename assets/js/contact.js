
$("#form-contact").submit(function(e) {
	e.preventDefault();
	$("#contact-send").addClass("disabled");

	var data = $(this).serialize();
	var url = $(this).attr("action");
	
	$.post(url, data, function(data) { 
			$("#contact-response").removeClass("alert alert-success alert-danger");
			if (data === "Success") {
				$("#contact-response").addClass("alert alert-success");
				$("#contact-response").text("Mensagem enviada com sucesso. Responderei em breve.");
			} else {
				$("#contact-response").addClass("alert alert-danger");
				$("#contact-response").text("Ocorreu um erro ao enviar sua mensagem. Tente novamente.");
			}
			console.log(data);

			$("#contact-send").removeClass("disabled");
		}
	);
});
