// funcion anonima autoejecutable
(()=>{
    const xhr = new XMLHttpRequest(),
    $xhr = document.getElementById("xhr"),

    // creamos fragmento del dom
    $fragment = document.createDocumentFragment();

    // asignacion del evento
    // readystatechange detecta cualquier cambio
    xhr.addEventListener("readystatechange", e => {
        if(xhr.readyState !== 4) return;

        console.log(xhr);
        if(xhr.status >= 200 && xhr.status < 300) {
            console.log('exito');
            let json = JSON.parse(xhr.responseText);

            json.forEach((elem) => {
                // creamos elementos del dom li y en estos mostraremos los elementos del json
                const $li = document.createElement("li");
                $li.innerHTML = `${elem.name} -- ${elem.email} -- ${elem.phone}`;
                $fragment.appendChild($li);
            });

            $xhr.appendChild($fragment)
        } else {
            let message = xhr.statusText || "Ocurrio un error";
            $xhr.innerHTML = `Error ${xhr.status}: ${message}`;
            console.log('error');
        }
        
    })

    // abrimos peticion con metodo http y end point(url)
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users");

    xhr.send();
})()