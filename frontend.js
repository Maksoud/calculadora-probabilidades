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
        output += `<li>Números sorteados: ${result.numeros}</li>`;
        output += `<li>Banca Atual: ${result.banca}</li>`;

        output += `<li>Vitórias das dúzias: ${result.vitDuz}</li>`;
        output += `<li>Derrotas das dúzias: ${result.derDuz}</li>`;
        output += `<li>Valores nas dúzias: ${result.valorDuz}</li>`;
        output += `<li>Rodadas das dúzias: ${result.rodadaDuz}</li>`;

        output += `<li>Vitórias das colunas: ${result.vitCol}</li>`;
        output += `<li>Derrotas das colunas: ${result.derCol}</li>`;
        output += `<li>Valores nas colunas: ${result.valorCol}</li>`;
        output += `<li>Rodadas das colunas: ${result.rodadaCol}</li>`;

        output += `<li>Vitórias das metades: ${result.vitMet}</li>`;
        output += `<li>Derrotas das metades: ${result.derMet}</li>`;
        output += `<li>Valores nas metades: ${result.valorMet}</li>`;
        output += `<li>Rodadas das metades: ${result.rodadaMet}</li>`;

        output += `<li>Vitórias das pares-ímpares: ${result.vitPIs}</li>`;
        output += `<li>Derrotas das pares-ímpares: ${result.derPIs}</li>`;
        output += `<li>Valores nas pares-ímpares: ${result.valorPIs}</li>`;
        output += `<li>Rodadas das pares-ímpares: ${result.rodadaPIs}</li>`;

        output += `<li>Vitórias das vermelhos-pretos: ${result.vitVPs}</li>`;
        output += `<li>Derrotas das vermelhos-pretos: ${result.derVPs}</li>`;
        output += `<li>Valores nas vermelhos-pretos: ${result.valorVPs}</li>`;
        output += `<li>Rodadas das vermelhos-pretos: ${result.rodadaVPs}</li>`;
    }// for (let result of results)

    document.querySelector('main').innerHTML = output;

}