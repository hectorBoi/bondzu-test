/* Envolver el código completo en una función anónima permite mayor
   privacidad (i.e., no poder referenciar el código desde la consola
   del navegador)
 */
(function()
 {
    // Elementos ocultos y botón de guardado
    const submitSaveElem = document.getElementById("save");
    const missingInfoElem = document.getElementById("missingInfo");
    const successfulSaveElem = document.getElementById("successfulSave");

    const loaderElements = document.getElementById("loaderElements");
    const body = document.getElementById("body");
    body.style.overflow = "hidden";

    const TIMEOUT_MILLISECONDS = 3000;

    // Datos únicos
    const statusElement = document.querySelector("#status");
    const titleElement = document.querySelector("#titulo");
    const illustratorElement = document.querySelector("#ilustrador");
    const descriptionElement = document.querySelector("#descripcion");
    descriptionElement.defaultValue = "";   // Necesario para evitar espacio en blanco que la descripción contiene por defecto
    const youtubeIDElement = document.querySelector("#youtubeId");

    loaderElements.classList.add("hidden"); // Oculta ícono de cargando

    submitSaveElem.addEventListener("click", () => 
    {
        // Información de los elementos previos
        const status = statusElement.checked;
        const title = titleElement.value;
        const illustrator = illustratorElement.value;
        const description = descriptionElement.value;
        const youtubeID = youtubeIDElement.value;
        
        const inputs = new Set();
        inputs.add(status);
        inputs.add(title);
        inputs.add(illustrator);
        inputs.add(description);
        inputs.add(youtubeID);
        
        // Si todos los elementos del formulario se encuentran llenos:
        if (!inputs.has(""))
        {
            missingInfoElem.style.display = "none";

            /* Especifica información a almacenar en la base de datos
             * Cabe notar que los nombres de las propiedades (i.e., isActive,
               title, illustrator, etc., corresponden con las columnas de la 
               tabla "Book" de la base de datos.
             */
            const requestBody = {
                isActive: status,
                title: title,
                illustrator: illustrator,
                description: description,
                youtubeID: youtubeID
            };

            const request = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            };

            // Envía dicha información al servidor
            fetch("/admin/book", request)
            .then(() =>
            {
                /* Notifica almacenamiento exitoso del libro en la base de datos
                   y refresca la página
                 */
                successfulSaveElem.removeAttribute("style");

                setTimeout(() => location.reload(), TIMEOUT_MILLISECONDS);
            })
            .catch((error) => 
            {
                /* Me gustaría hacer estas notificaciones más obvias para el usuario final
                   Quizás en lugar de notificarle por consola, usar una alerta prefabricada
                   de Bootstrap, o algo similar
                 */
                if (error instanceof DOMException)
                    console.error(`La solicitud fue abortada debido al siguiente error: ${error}`);
                
                else if (error instanceof TypeError)
                    console.error(`Hubo un error en la solicitud: ${error}.\nPor favor comuníquese con el departamento de Sistemas para solucionarlo.`);
                    
                else
                    console.error(`Ha ocurrido un error inesperado: ${error}.\nPor favor comuníquese con el departamento de Sistemas para solucionarlo.`);
            });
        }   // End if
        
        // Si algún elemento del formulario se encuentra vacío, se le notifica al usuario
        else
        {
            missingInfoElem.removeAttribute("style");

            setTimeout(() => missingInfoElem.style.display = "none", TIMEOUT_MILLISECONDS);
        }
    }); // End eventListener
    
 })();  // End función anónima