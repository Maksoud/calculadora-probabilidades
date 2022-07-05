async function getContent() {
    try {
        
        const response = await fetch('http://localhost:3001/calc')
        // console.log("response", response)
        
        const data = await response.json();
        
        console.log("data", data);

    } catch (error) {
        console.log("error!", error)
    }
}

getContent()

function show(results) {

    let output = ''

    for (let result of results) {
        output += `<li>Números: ${result.numeros}</li>`
        output += `<li>Valor Dezena: ${result.valorDez}</li>`
        output += `<li>Rodada Dezena: ${result.rodadaDez}</li>`
        output += `<li>Banca: ${result.banca}</li>`
        output += `<li>Vitórias: ${result.vitorias}</li>`
        output += `<li>Derrotas: ${result.derrotas}</li>`
    }

    document.querySelector('main').innerHTML = output;

}