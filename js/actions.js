var fn  = {
	deviceready: function(){
		document.addEventListener("deviceready", fn.init, false);
	},

	init: function(){
		/*
		 * En esta seccion vamos a asociar
		 * todos los eventos del "Click" al HTML
		 */
		 $("#botonRegistrar").tap(fn.registrar);
		 $("#botonTomarFoto").tap(mc.abrirCamara);
	},

	registrar: function(){
		/*
		 * 1) Paso obtener todos los datos del formulario
		 */
		 var nombre   = $("#nombreRegistro").val();
		 var email    = $("#emailRegistro").val();
		 var tel      = $("#telefonoRegistro").val();
		 var password = $("#passwordRegistro").val();
		 var foto     = $("#fotoTomadaRegistro img")[0];

		try{
			if(foto == undefined){
				throw new Error("Debe de tomar una foto");
			}

			if(typeof nombre !== "string"){
				throw new Error("El nombre no es valido");
			}

			if(email == ""){
				throw new Error("El email es forzoso");
			}

			if(password == ""){
				throw new Error("La contraseña es forzosa");
			}

			if(email.indexOf("@") == -1){
				throw new Error("El email debe contener un arroba");
			}

			if(Number.isNaN(Number(tel))){
				throw new Error("El teléfono debe de ser numérico");
			}


			/*
			 * Registrar al Usuario
			 */
			 fn.enviarRegistro(nombre, email, tel, password, foto);

		}catch(error){
			alert(error);
		}
	},

	enviarRegistro: function(nombreR, emailR, telR, passwordR, fotoR){
alert("Enviando registro");
		$.ajax({
			  method: "POST",
			  url: "http://www.colors.edu.mx/archivoTest.php",
			  data: { 
			  	nombre:  nombreR,
			  	email: emailR,
			  	tel: telR,
			  	password: passwordR
			  }

			}).done(function( mensaje ){
alert("AJAX terminado");
				if(mensaje == 1){
					/*
					 * Transferimos la foto
					 */
					 var fotoURL =  fotoR.src;
					 file.transferir(fotoURL);

				}else{
					alert("Error al enviar datos de registro: "+mensaje);
				}
			});
	}
};



/*
 * LLAMAR AL METODO INIT
 * EN EL NAVEGADOR
 */
//fn.init();


/*
 * LLAMAR DEVICEREADY
 * PARA COMPILAR
 */
//$(fn.deviceready);
alert("Ejecutando JS");
fn.deviceready();