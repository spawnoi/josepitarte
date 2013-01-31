
        var map;
        var latitud;
        var longitud;
        var precision;
		
		var afterNotification = function(){
			//Lungo.Notification.hide();
		};

        function localizame() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(coordenadas, errores);
            }else{
               Lungo.Notification.error("Error", "Geolocalization not supported", "warning", false, 5, afterNotification);
            }
        }
       
        function coordenadas(position) {
            latitud = position.coords.latitude;
            longitud = position.coords.longitude;
            precision = position.coords.accuracy;  
            cargarMapa();
			Lungo.Notification.show("Success", "Precision:"  + precision/1000 + " km aprox.", "check", false, 5, afterNotification);
        }
        
        function errores(err) {
         
            if (err.code == 0) {
			Lungo.Notification.error("Error", "Generic error", "warning", true, 5, afterNotification);
            }
            if (err.code == 1) {
			Lungo.Notification.error("Error", "Enable share location", "warning", true, 5, afterNotification);
            }
            if (err.code == 2) {
			Lungo.Notification.error("Error", "Unable to load actual location", "warning", true, 5, afterNotification);
            }
            if (err.code == 3) {
			Lungo.Notification.error("Error", "Timeout!", "warning", true, 5, afterNotification);
            }
        }
         
        function cargarMapa() {

            var latlon = new google.maps.LatLng(latitud,longitud);
            var myOptions = {
                zoom: 17,
                center: latlon,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
           alert('hehre');
            var coorMarcador = new google.maps.LatLng(latitud,longitud);
                
            var marcador = new google.maps.Marker({
                position: coorMarcador,
                map: map,
                title: "Where am I?"
            });
            
        }

        //Lungo.Core.execute(localizame);