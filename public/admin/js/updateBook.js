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
    loaderElements.classList.add("hidden"); // Oculta ícono de cargando

    // Meta
    const bookID = window.localStorage.getItem("currentBook");
    const pageTitleElement = document.querySelector("#pageTitle");

    // Portada y videos
    const bookCoverElement = document.querySelector("#bookCover");
    const videoES_Element = document.querySelector("#videoES");
    const videoEN_Element = document.querySelector("#videoEN");

    // Datos únicos
    const statusElement = document.querySelector("#status");
    const statusTextElement = document.querySelector("#statusText");
    const illustratorElement = document.querySelector("#ilustrador");

    // Datos en Español
    const tituloElement = document.querySelector("#titulo");
    const descripcionElement = document.querySelector("#descripcion");
    const youtubeID_ES_Element = document.querySelector("#youtubeIdES");

    // English data
    const titleElement = document.querySelector("#title");
    const descriptionElement = document.querySelector("#description");
    const youtubeID_EN_Element = document.querySelector("#youtubeIdEN");

    const TIMEOUT_MILLISECONDS = 3000;

    submitSaveElem.addEventListener("click", () => 
    {
        // Información de los elementos previos
        const status = statusElement.checked;
        const illustrator = illustratorElement.value;

        const titulo = tituloElement.value;
        const descripcion = descripcionElement.value;
        const youtubeID_ES = youtubeID_ES_Element.value;

        const title = titleElement.value;
        const description = descriptionElement.value;
        const youtubeID_EN = youtubeID_EN_Element.value;
        
        const inputs = new Set();
        inputs.add(illustrator);
        inputs.add(titulo);
        inputs.add(descripcion);
        inputs.add(youtubeID_ES);
        inputs.add(title);
        inputs.add(description);
        inputs.add(youtubeID_EN);

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
                illustrator: illustrator,
                title: titulo,
                description: descripcion,
                youtubeID: [youtubeID_ES],        // De tipo Arreglo en Parse, por alguna razón
                title_en: title,
                description_en: description,
                youtubeID_en: [youtubeID_EN]      // De tipo Arreglo en Parse, por alguna razón
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