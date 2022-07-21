const LOCAL_DOMAINS = ["localhost", "127.0.0.1", "::1"]
let address = null
let port    = null

if (LOCAL_DOMAINS.includes(window.location.hostname)) {

    address = "http://localhost"
    port    = 3001

} else {

    address = "https://68.183.25.32"
    port    = 3001

}// else if (in_array($_SERVER['REMOTE_ADDR'], ['127.0.0.1', 'localhost', '::1']))

let serverAddress      = address + ':' + port + '/calc'
let serverAddressReset = address + ':' + port + '/reset'

// console.log("serverAddress",serverAddress)
// console.log("serverAddressReset",serverAddressReset)

/************/

// Liga/Desliga Dúzias
const btnEstDuzCont = document.getElementById('estDuz-container')
const btnEstDuz     = document.getElementsByName('estDuz')[0]

btnEstDuzCont.addEventListener('click', function () {
    btnEstDuzCont.classList.toggle('on')
    btnEstDuzCont.classList.contains('on') ? btnEstDuz.value = 1 : btnEstDuz.value = 0
})// btnEstDuzCont.addEventListener

/************/

// Dúzias
const btnElmDuzCont = document.getElementById('umaDuasDuz-container')
const btnElmDuz     = document.getElementsByName('umaDuasDuz')[0]

btnElmDuzCont.addEventListener('click', function () {
    btnElmDuzCont.classList.toggle('on')
    btnElmDuzCont.classList.contains('on') ? btnElmDuz.value = 2 : btnElmDuz.value = 1
})// btnElmDuzCont.addEventListener

/************/

// Liga/Desliga Colunas
const btnEstColCont = document.getElementById('estCol-container')
const btnEstCol    = document.getElementsByName('estCol')[0]

btnEstColCont.addEventListener('click', function () {
    btnEstColCont.classList.toggle('on')
    btnEstColCont.classList.contains('on') ? btnEstCol.value = 1 : btnEstCol.value = 0
})// btnEstColCont.addEventListener

/************/

// Colunas
const btnElmColCont = document.getElementById('umaDuasCol-container')
const btnElmCol     = document.getElementsByName('umaDuasCol')[0]

btnElmColCont.addEventListener('click', function () {
    btnElmColCont.classList.toggle('on')
    btnElmColCont.classList.contains('on') ? btnElmCol.value = 2 : btnElmCol.value = 1
})// btnElmColCont.addEventListener

/************/

// Testes de importação
const btnElmOpCont = document.getElementById('operacaoTestes-container')
const btnElmOp     = document.getElementsByName('operacaoTestes')[0]

btnElmOpCont.addEventListener('click', function () {
    btnElmOpCont.classList.toggle('on')
    btnElmOpCont.classList.contains('on') ? btnElmOp.value = 2 : btnElmOp.value = 1
})// btnElmOpCont.addEventListener

/************/

function formatarMoeda() {

    var elBanca = document.querySelector('.bancaUsu')
    var valor = elBanca.value
    
    valor = valor + ''
    valor = parseInt(valor.replace(/[\D]+/g,''))
    valor = valor + ''
    valor = valor.replace(/([0-9]{2})$/g, ",$1")

    if (valor.length > 6) {
        valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2")
    }// if (valor.length > 6)

    elBanca.value = valor

}// formatarMoeda

/************/

////// ANALISAR NÚMEROS

numeross = ''
numerosConvertidos = []
input = document.querySelector('.codigo')
listarNumeros = document.querySelector('.listarNumeros')

document.querySelector('.enviar').addEventListener("click", function(){
    if (input.value != undefined) {

        listarNumeros.innerHTML = input.value
        numeross = listarNumeros.querySelectorAll('.roulette-history-item__value-textsiwxWvFlm3ohr_UMS23f')

        for (i = 0; i < numeross.length; i++) {
            numerosConvertidos.push(numeross[i].innerText)
        }// for (i = 0; i < numeross.length; i++)

        input.value = ''

    }// if (input.value != undefined)
})// document.querySelector('.enviar').addEventListener

reload = document.querySelector('#reload')

/************/

inputSorteado = document.querySelector('#numeroSorteado')

setInterval(() => {
    if (inputSorteado.value > 36 || inputSorteado.value < 0) {
        inputSorteado.value = ''
    }// if (inputSorteado.value > 36 || inputSorteado.value < 0)
}, 100)

/************/

inputSorteado.addEventListener("click", () => {
    inputSorteado.value = ''
})// inputSorteado.addEventListener

/************/

inputSorteado.addEventListener("keypress", () => {
    if (event.key === "Enter") {
        setTimeout(() => {
            inputSorteado.value = ''
        }, 100)
    }// if (event.key === "Enter")
})// inputSorteado.addEventListener

/************/

let userID            = document.getElementsByName('userID')[0].value

let saldoBanca        = document.getElementById('saldoBanca')
let saldoLucro        = document.getElementById('saldoLucro')
let numeroSorteado    = document.getElementById('numeroSorteado')

let contaWin          = document.getElementById('contaWin')
let contaLoss         = document.getElementById('contaLoss')

let percD1            = document.getElementById('percD1')
let percD2            = document.getElementById('percD2')
let percD3            = document.getElementById('percD3')
let valorD1           = document.getElementById('valorD1')
let valorD2           = document.getElementById('valorD2')
let valorD3           = document.getElementById('valorD3')

let percC1            = document.getElementById('percC1')
let percC2            = document.getElementById('percC2')
let percC3            = document.getElementById('percC3')
let valorC1           = document.getElementById('valorC1')
let valorC2           = document.getElementById('valorC2')
let valorC3           = document.getElementById('valorC3')

let entradasD1        = document.getElementById('entradasD1')
let entradasD2        = document.getElementById('entradasD2')
let entradasD3        = document.getElementById('entradasD3')

let entradasC1        = document.getElementById('entradasC1')
let entradasC2        = document.getElementById('entradasC2')
let entradasC3        = document.getElementById('entradasC3')

let acumuladoDuz      = document.getElementById('acumuladoDuz')
let acumuladoCol      = document.getElementById('acumuladoCol')
let acumuladoTotal    = document.getElementById('acumuladoTotal')

let box_numeros       = document.querySelector('.box-ultimos ul')
let numeros           = []
let numerosInvertidos = []
let filhos            = document.querySelectorAll('.box-ultimos ul li')
const form            = document.getElementById('form')
contador = 1

/************/

form.addEventListener('submit', function(e) {

    document.querySelector('.box-ultimos li').style.margin = '7px', 'important'

    // Previne comportamento padrão de recarregar página
    e.preventDefault();

    /************/

    box_numeros.innerHTML = ''

    /************/

    if (numerosConvertidos.length > 0) {

        numeros = [...numerosConvertidos]
        numeros.reverse()
        numerosConvertidos = []

    } else {

        numeros.push(numeroSorteado.value)

    }// else if (numerosConvertidos.length > 0)

    // console.log("numeros", numeros)

    /************/

    numerosInvertidos = [...numeros]
    numerosInvertidos.reverse()
    // console.log("invertidos", numerosInvertidos)

    /************/

    for (i = 0; i <= 11; i++) {

        box_numeros.innerHTML += numerosInvertidos[i] ? '<li>' + numerosInvertidos[i] + '</li>' : '<li>?</li>'
        
        if (i == 0) {

            box_numeros.innerHTML += '<strong><i class="fas fa-trash-alt excluir"></i></strong>'

        } else {

            box_numeros.innerHTML += '<strong>' + (i+1) + '</strong>'

        }// else if (i == 0)
        
        // console.log(numerosInvertidos)

    }// for (i = 0; i <= 11; i++)

    /************/

    document.querySelector('.excluir').addEventListener("click", function(){
        numeros.pop()
        box_numeros.children[0].innerHTML = '?'
    })
    // console.log("box_numeros", box_numeros)

    /************/

    let banca = Number(saldoBanca.value.replace('.', '').replace(/,/g, '.'));
    // console.log("Banca:", banca);

    /************/

    if (numeros.length > 12) {

        // Create new FormData object:
        const formData = new FormData(form);

        for (var i = 0; i < numeros.length; i++) {
            formData.append('numeros[]', numeros[i])
        }// for (var i = 0; i < numeros.length; i++)

        formData.append("userID", userID)
        formData.append("banca", banca)
        formData.delete("numeroSorteado")
        formData.append("estDuzias", Number(btnElmDuz.value))
        formData.append("estColunas", Number(btnElmCol.value))
        formData.append("operacaoTestes", Number(btnElmOp.value))

        // Convert formData object to URL-encoded string:
        const payload = new URLSearchParams(formData)

        fetch(serverAddress, {
            method: 'POST',
            body: payload,
        })
        .then(res => res.text())
        .then(data => {

            try {

                let resposta = JSON.parse(data);
                // console.log("Resposta do servidor", resposta)
                // console.log("numeros", resposta.numeros)
                // console.log("banca", resposta.banca)

                /************/

                saldoLucro.innerHTML = "R$ " + Decimal(Number(resposta.banca) - Number(banca),2)

                /************/

                contaWin.innerHTML  = resposta.vitDuz ? resposta.vitDuz : "0"
                contaLoss.innerHTML = resposta.derDuz ? resposta.derDuz : "0"

                /************/

                // Dúzias
                if (btnEstDuz.value == 1) {

                    sugestoesDuz = document.querySelectorAll('.duzias .nao_selecionado')

                    resposta = Duzias(resposta, sugestoesDuz)

                }// if (btnEstDuz.value)

                /************/

                // Colunas
                if (btnEstCol.value == 1) {

                    sugestoesCol = document.querySelectorAll('.colunas .nao_selecionado')

                    resposta = Colunas(resposta, sugestoesCol)

                }// if (btnEstCol.value)

                /************/

                // Valor acumulado
                acumuladoTotal.innerHTML = "R$ " + Decimal((resposta.acumDuz+resposta.acumCol), 2)

                /************/

                // Testes
                // console.log("resposta.operacaoTestes", resposta.operacaoTestes);
                if (btnElmOp.value == 1) {
                    btnElmOpCont.classList.toggle('on')
                    btnElmOp.value = resposta.operacaoTestes
                }// if (btnElmOp.value == 1)

                // console.log("vitCol", resposta.vitCol)
                // console.log("derCol", resposta.derCol)
                // console.log("valorCol", resposta.valorCol)
                // console.log("rodadaCol", resposta.rodadaCol)
                // console.log("apostaCol", resposta.apostaCol)

                // console.log("vitMet", resposta.vitMet)
                // console.log("derMet", resposta.derMet)
                // console.log("valorMet", resposta.valorMet)
                // console.log("rodadaMet", resposta.rodadaMet)
                // console.log("apostaMet", resposta.apostaMet)

                // console.log("vitPIs", resposta.vitPIs)
                // console.log("derPIs", resposta.derPIs)
                // console.log("valorPIs", resposta.valorPIs)
                // console.log("rodadaPIs", resposta.rodadaPIs)
                // console.log("apostaPIs", resposta.apostaPIs)

                // console.log("vitVPs", resposta.vitVPs)
                // console.log("derVPs", resposta.derVPs)
                // console.log("valorVPs", resposta.valorVPs)
                // console.log("rodadaVPs", resposta.rodadaVPs)
                // console.log("apostaVPs", resposta.apostaVPs)

                // console.log("Percentuais das dúzias", resposta.duzias.percDuz);

            } catch (e) {

                console.log(data, e); // Informe pelo menos 12 números...

            }
            
        });
        
    }// if (numeros.length > 12)

})// form.addEventListener

/************/

reload.addEventListener("click", function(e) {

    // Previne comportamento padrão de recarregar página
    e.preventDefault();

    /************/
    
    numeros = []

    /************/
    
    const formData = new FormData(form);
    formData.append("userID", userID)
    const payload = new URLSearchParams(formData)

    /************/

    if (btnElmOp.value == 1) {
        btnElmOpCont.classList.toggle('on')
        btnElmOp.value = 2
    }// if (btnElmOp.value == 1)

    /************/
    
    fetch(serverAddressReset, {
        
        method: 'POST',
        body: payload,

    })
    .then(res => res.text())
    .then(data => {

        try {

            box_numeros.innerHTML = ''

            for (i = 0; i <= 11; i++) {

                box_numeros.innerHTML += '<li>?</li>'
                box_numeros.innerHTML += '<strong>' + (i+1) + '</strong>'

            }// for (i = 0; i <= 11; i++)

            saldoLucro.innerHTML = "R$ 0,00"
            contaWin.innerHTML   = "0"
            contaLoss.innerHTML  = "0"

            sugestoes[0].classList.remove('selecionado')
            sugestoes[1].classList.remove('selecionado')
            sugestoes[2].classList.remove('selecionado')

            valorD1.innerHTML = "R$ 0,00"
            valorD2.innerHTML = "R$ 0,00"
            valorD3.innerHTML = "R$ 0,00"

            entradasD1.innerHTML = "Sem Entradas"
            entradasD2.innerHTML = "Sem Entradas"
            entradasD3.innerHTML = "Sem Entradas"

            acumuladoDuz.innerHTML = "0,00"

        } catch (e) {

            console.log(data, e) // Informe pelo menos 12 números...

        }
    })

})// reload.addEventListener

/************/

function Decimal(num, decimal) {

    decimal = (typeof decimal === "undefined") ? 6 : decimal;
    var places = Math.pow(10, decimal);

    return Math.floor(num * places) / places

}// Decimal

/************/

function Duzias(resposta, sugestoes) {

    if (btnElmDuz.value == 1) {

        if (resposta.apostaDuz == 0) {

            sugestoes[0].classList.add('selecionado')
            sugestoes[1].classList.remove('selecionado')
            sugestoes[2].classList.remove('selecionado')

            valorD1.innerHTML = "R$ " + Decimal(resposta.ventr,2)
            valorD2.innerHTML = "R$ 0,00"
            valorD3.innerHTML = "R$ 0,00"

        } else if (resposta.apostaDuz == 1) {

            sugestoes[0].classList.remove('selecionado')
            sugestoes[1].classList.add('selecionado')
            sugestoes[2].classList.remove('selecionado')

            valorD1.innerHTML = "R$ 0,00"
            valorD2.innerHTML = "R$ " + Decimal(resposta.ventr,2)
            valorD3.innerHTML = "R$ 0,00"

        } else if (resposta.apostaDuz == 2) {

            sugestoes[0].classList.remove('selecionado')
            sugestoes[1].classList.remove('selecionado')
            sugestoes[2].classList.add('selecionado')

            valorD1.innerHTML = "R$ 0,00"
            valorD2.innerHTML = "R$ 0,00"
            valorD3.innerHTML = "R$ " + Decimal(resposta.ventr,2)

        } else {

            sugestoes[0].classList.remove('selecionado')
            sugestoes[1].classList.remove('selecionado')
            sugestoes[2].classList.remove('selecionado')

            valorD1.innerHTML = "R$ 0,00"
            valorD2.innerHTML = "R$ 0,00"
            valorD3.innerHTML = "R$ 0,00"

        }// else...

    } else if (btnElmDuz.value == 2) {

        // console.log("resposta.apostaDuz", resposta.apostaDuz)

        if (resposta.apostaDuz[0] == 0 && resposta.apostaDuz[1] == 1 || resposta.apostaDuz[0] == 1 && resposta.apostaDuz[1] == 0) {

            sugestoes[0].classList.add('selecionado')
            sugestoes[1].classList.add('selecionado')
            sugestoes[2].classList.remove('selecionado')

            valorD1.innerHTML = "R$ " + Decimal(resposta.ventr,2)
            valorD2.innerHTML = "R$ " + Decimal(resposta.ventr,2)
            valorD3.innerHTML = "R$ 0,00"

        } else if (resposta.apostaDuz[0] == 0 && resposta.apostaDuz[1] == 2 || resposta.apostaDuz[0] == 2 && resposta.apostaDuz[1] == 0) {

            sugestoes[0].classList.add('selecionado')
            sugestoes[1].classList.remove('selecionado')
            sugestoes[2].classList.add('selecionado')

            valorD1.innerHTML = "R$ " + Decimal(resposta.ventr,2)
            valorD2.innerHTML = "R$ 0,00"
            valorD3.innerHTML = "R$ " + Decimal(resposta.ventr,2)

        } else if (resposta.apostaDuz[0] == 1 && resposta.apostaDuz[1] == 2 || resposta.apostaDuz[0] == 2 && resposta.apostaDuz[1] == 1) {

            sugestoes[0].classList.remove('selecionado')
            sugestoes[1].classList.add('selecionado')
            sugestoes[2].classList.add('selecionado')

            valorD1.innerHTML = "R$ 0,00"
            valorD2.innerHTML = "R$ " + Decimal(resposta.ventr,2)
            valorD3.innerHTML = "R$ " + Decimal(resposta.ventr,2)

        } else {

            sugestoes[0].classList.remove('selecionado')
            sugestoes[1].classList.remove('selecionado')
            sugestoes[2].classList.remove('selecionado')

            valorD1.innerHTML = "R$ 0,00"
            valorD2.innerHTML = "R$ 0,00"
            valorD3.innerHTML = "R$ 0,00"

        }// else...

    }// else if (btnElmDuz.value == 2)

    /************/

    percD1.innerHTML = resposta.duzias.percDuz[0] ? resposta.duzias.percDuz[0] + "%" : "0%"
    percD2.innerHTML = resposta.duzias.percDuz[1] ? resposta.duzias.percDuz[1] + "%" : "0%"
    percD3.innerHTML = resposta.duzias.percDuz[2] ? resposta.duzias.percDuz[2] + "%" : "0%"

    /************/

    // console.log("valorDuz", resposta.valorDuz)
    // console.log("rodadaDuz", resposta.rodadaDuz)
    // console.log("apostaDuz", resposta.apostaDuz)
    // console.log("ventr", resposta.ventr)

    /************/

    acumuladoDuz.innerHTML = "R$ " + Decimal(resposta.acumDuz, 2)

    /************/

    entradasD1.innerHTML  = "Sem Entradas"
    entradasD2.innerHTML  = "Sem Entradas"
    entradasD3.innerHTML  = "Sem Entradas"

    if (Array.isArray(resposta.apostaDuz)) {
        for (let i = 0; i <= 2; i++) {
            if (resposta.apostaDuz[i] == 0) {
                entradasD1.innerHTML  = (resposta.rodadaDuz) + "ª entrada"
            } else if (resposta.apostaDuz[i] == 1) {
                entradasD2.innerHTML  = (resposta.rodadaDuz) + "ª entrada"
            } else if (resposta.apostaDuz[i] == 2) {
                entradasD3.innerHTML  = (resposta.rodadaDuz) + "ª entrada"
            }
        }// for (let i = 0; i <= 2; i++)
    } else {
        if (resposta.apostaDuz == 0) {
            entradasD1.innerHTML  = (resposta.rodadaDuz) + "ª entrada"
        } else if (resposta.apostaDuz == 1) {
            entradasD2.innerHTML  = (resposta.rodadaDuz) + "ª entrada"
        } else if (resposta.apostaDuz == 2) {
            entradasD3.innerHTML  = (resposta.rodadaDuz) + "ª entrada"
        }
    }// else if (Array.isArray(resposta.apostaDuz))

    /************/

    if (resposta.rodadaDuz == 0 || resposta.rodadaDuz == []) {

        entradasD1.innerHTML  = "Sem Entradas"
        entradasD2.innerHTML  = "Sem Entradas"
        entradasD3.innerHTML  = "Sem Entradas"

        acumuladoDuz.innerHTML = "0,00"

    }// if (resposta.rodadaDuz == 0 || resposta.rodadaDuz == [])

    /************/

    return resposta

}//Duzias

/************/

function Colunas(resposta, sugestoes) {

    if (btnElmCol.value == 1) {

        if (resposta.apostaCol == 0) {

            sugestoes[0].classList.add('selecionado')
            sugestoes[1].classList.remove('selecionado')
            sugestoes[2].classList.remove('selecionado')

            valorC1.innerHTML = "R$ " + Decimal(resposta.ventr,2)
            valorC2.innerHTML = "R$ 0,00"
            valorC3.innerHTML = "R$ 0,00"

        } else if (resposta.apostaCol == 1) {

            sugestoes[0].classList.remove('selecionado')
            sugestoes[1].classList.add('selecionado')
            sugestoes[2].classList.remove('selecionado')

            valorC1.innerHTML = "R$ 0,00"
            valorC2.innerHTML = "R$ " + Decimal(resposta.ventr,2)
            valorC3.innerHTML = "R$ 0,00"

        } else if (resposta.apostaCol == 2) {

            sugestoes[0].classList.remove('selecionado')
            sugestoes[1].classList.remove('selecionado')
            sugestoes[2].classList.add('selecionado')

            valorC1.innerHTML = "R$ 0,00"
            valorC2.innerHTML = "R$ 0,00"
            valorC3.innerHTML = "R$ " + Decimal(resposta.ventr,2)

        } else {

            sugestoes[0].classList.remove('selecionado')
            sugestoes[1].classList.remove('selecionado')
            sugestoes[2].classList.remove('selecionado')

            valorC1.innerHTML = "R$ 0,00"
            valorC2.innerHTML = "R$ 0,00"
            valorC3.innerHTML = "R$ 0,00"

        }// else...

    } else if (btnElmCol.value == 2) {

        // console.log("resposta.apostaCol", resposta.apostaCol)

        if (resposta.apostaCol[0] == 0 && resposta.apostaCol[1] == 1 || resposta.apostaCol[0] == 1 && resposta.apostaCol[1] == 0) {

            sugestoes[0].classList.add('selecionado')
            sugestoes[1].classList.add('selecionado')
            sugestoes[2].classList.remove('selecionado')

            valorC1.innerHTML = "R$ " + Decimal(resposta.ventr,2)
            valorC2.innerHTML = "R$ " + Decimal(resposta.ventr,2)
            valorC3.innerHTML = "R$ 0,00"

        } else if (resposta.apostaCol[0] == 0 && resposta.apostaCol[1] == 2 || resposta.apostaCol[0] == 2 && resposta.apostaCol[1] == 0) {

            sugestoes[0].classList.add('selecionado')
            sugestoes[1].classList.remove('selecionado')
            sugestoes[2].classList.add('selecionado')

            valorC1.innerHTML = "R$ " + Decimal(resposta.ventr,2)
            valorC2.innerHTML = "R$ 0,00"
            valorC3.innerHTML = "R$ " + Decimal(resposta.ventr,2)

        } else if (resposta.apostaCol[0] == 1 && resposta.apostaCol[1] == 2 || resposta.apostaCol[0] == 2 && resposta.apostaCol[1] == 1) {

            sugestoes[0].classList.remove('selecionado')
            sugestoes[1].classList.add('selecionado')
            sugestoes[2].classList.add('selecionado')

            valorC1.innerHTML = "R$ 0,00"
            valorC2.innerHTML = "R$ " + Decimal(resposta.ventr,2)
            valorC3.innerHTML = "R$ " + Decimal(resposta.ventr,2)

        } else {

            sugestoes[0].classList.remove('selecionado')
            sugestoes[1].classList.remove('selecionado')
            sugestoes[2].classList.remove('selecionado')

            valorC1.innerHTML = "R$ 0,00"
            valorC2.innerHTML = "R$ 0,00"
            valorC3.innerHTML = "R$ 0,00"

        }// else...

    }// else if (btnElmCol.value == 2)

    /************/

    percC1.innerHTML = resposta.colunas.percCol[0] ? resposta.colunas.percCol[0] + "%" : "0%"
    percC2.innerHTML = resposta.colunas.percCol[1] ? resposta.colunas.percCol[1] + "%" : "0%"
    percC3.innerHTML = resposta.colunas.percCol[2] ? resposta.colunas.percCol[2] + "%" : "0%"

    /************/

    // console.log("valorCol", resposta.valorCol)
    // console.log("rodadaCol", resposta.rodadaCol)
    // console.log("apostaCol", resposta.apostaCol)
    // console.log("ventr", resposta.ventr)

    /************/

    acumuladoCol.innerHTML = "R$ " + Decimal(resposta.acumCol, 2)

    /************/

    entradasC1.innerHTML  = "Sem Entradas"
    entradasC2.innerHTML  = "Sem Entradas"
    entradasC3.innerHTML  = "Sem Entradas"

    if (Array.isArray(resposta.apostaCol)) {
        for (let i = 0; i <= 2; i++) {
            if (resposta.apostaCol[i] == 0) {
                entradasC1.innerHTML  = (resposta.rodadaCol) + "ª entrada"
            } else if (resposta.apostaCol[i] == 1) {
                entradasC2.innerHTML  = (resposta.rodadaCol) + "ª entrada"
            } else if (resposta.apostaCol[i] == 2) {
                entradasC3.innerHTML  = (resposta.rodadaCol) + "ª entrada"
            }
        }// for (let i = 0; i <= 2; i++)
    } else {
        if (resposta.apostaCol == 0) {
            entradasC1.innerHTML  = (resposta.rodadaCol) + "ª entrada"
        } else if (resposta.apostaCol == 1) {
            entradasC2.innerHTML  = (resposta.rodadaCol) + "ª entrada"
        } else if (resposta.apostaCol == 2) {
            entradasC3.innerHTML  = (resposta.rodadaCol) + "ª entrada"
        }
    }// else if (Array.isArray(resposta.apostaCol))

    /************/

    if (resposta.rodadaCol == 0 || resposta.rodadaCol == []) {

        entradasC1.innerHTML  = "Sem Entradas"
        entradasC2.innerHTML  = "Sem Entradas"
        entradasC3.innerHTML  = "Sem Entradas"

        acumuladoCol.innerHTML = "0,00"

    }// if (resposta.rodadaCol == 0 || resposta.rodadaCol == [])

    /************/

    return resposta

}//Colunas