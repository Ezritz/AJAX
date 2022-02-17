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
})();

// API Fetch
(() => {
    const $fetch = document.getElementById("fetch"),
    $fragment = document.createDocumentFragment();  

    fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => {
        console.log(res);
        // validamos si es que hay un error y este pueda mostrarse
        return res.ok ? res.json(): Promise.reject(res);
    })
    .then((json) => {
        // convertimos body a texto, se mostrara en arreglo de objetos
        console.log(json)
        json.forEach((elem) => {
            // creamos elementos del dom li y en estos mostraremos los elementos del json
            const $li = document.createElement("li");
            $li.innerHTML = `${elem.name} -- ${elem.email} -- ${elem.phone}`;
            $fragment.appendChild($li);
        });

        $fetch.appendChild($fragment)
       
    })
    .catch((err) => {
        console.log(err);
        let message = err.statusText || "Ocurrio un error";
        $fetch.innerHTML = `Error ${err.status}: ${message}`;
        
    }).finally(()=>{
       console.log('Esto se ejecutara siempre, sin importar el resultado de fetch');
    })
})();