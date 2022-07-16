<?php include('config/config.php'); ?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
    <link href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" rel="stylesheet">
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Roletinha</title>
    <link rel="stylesheet" href="css/estilo.css">
</head>
<body>
    <div class="container">
        <div class="logo">
            <?php
                echo '<div class="usuario">Olá, '.
                $nome[0].'</div><div class="assinatura">Válido até '.date('d/m/Y', $expiracao).'.</div>';
            ?>
        </div>
        <div class="topo">
            <div class="small-box">
                <h5><i class="fas fa-wallet"></i> Banca Inicial</h5>
                <div class="space-between">
                    <h2>R$ <input type="text" id="saldoBanca" name="banca" class="bancaUsu" onkeyup="formatarMoeda();" placeholder="valor" required></h2>
                </div>
            </div>
            <div class="small-box">
                <div class="space-between">
                    <h5><i class="far fa-usd-circle"></i> Lucro Total</h5>
                </div>
                <h2 id="saldoLucro">R$ 0,00</h2>
            </div>
        </div>
        <div class="inputs">
            <form id="form" method="POST">
                <div class="ultimo-sorteado">
                    <p>Último número sorteado</p>
                    <input type="number" class="numero_sorteado" id="numeroSorteado" placeholder="Próximo" value="36" min="0" max="36" required>
                    <button id="enviar" type="submit">
                        <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.00895 0.20156C1.88414 0.139133 1.74431 0.112989 1.60537 0.126102C1.46643 0.139214 1.33396 0.191057 1.22302 0.275733C1.11209 0.360408 1.02715 0.474518 0.977861 0.605081C0.928572 0.735644 0.916915 0.877419 0.944216 1.01428L3.03641 8.24674C3.07542 8.38152 3.15167 8.50256 3.2564 8.59594C3.36112 8.68932 3.49007 8.75126 3.62843 8.77463L12.1135 10.1958C12.5132 10.2748 12.5132 10.8474 12.1135 10.9265L3.62843 12.3476C3.49007 12.371 3.36112 12.4329 3.2564 12.5263C3.15167 12.6197 3.07542 12.7407 3.03641 12.8755L0.944216 20.108C0.916915 20.2448 0.928572 20.3866 0.977861 20.5172C1.02715 20.6477 1.11209 20.7618 1.22302 20.8465C1.33396 20.9312 1.46643 20.983 1.60537 20.9961C1.74431 21.0093 1.88414 20.9831 2.00895 20.9207L21.3949 11.2277C21.5186 11.1657 21.6226 11.0705 21.6953 10.9528C21.768 10.8351 21.8064 10.6995 21.8064 10.5611C21.8064 10.4228 21.768 10.2872 21.6953 10.1694C21.6226 10.0517 21.5186 9.95653 21.3949 9.89454L2.00895 0.20156Z" fill="white"/></svg>
                    </button>
                </div>
            </form>
            <div class="flex placar">
                <div class="bg-win">
                    <h2>WIN</h2>
                    <p id="contaWin">0</p>
                </div>
                <div class="bg-loss">
                    <h2>LOSS</h2>
                    <p id="contaLoss">0</p>
                </div>
            </div>
        </div>
        <h2 class="ultimos-numeros">Últimos números <i class="fas fa-redo reload"></i></h2>
        <div class="box-ultimos">
            <ul>
                <li>?</li><strong>1</strong>
                <li>?</li><strong>2</strong>
                <li>?</li><strong>3</strong>
                <li>?</li><strong>4</strong>
                <li>?</li><strong>5</strong>
                <li>?</li><strong>6</strong>
                <li>?</li><strong>7</strong>
                <li>?</li><strong>8</strong>
                <li>?</li><strong>9</strong>
                <li>?</li><strong>10</strong>
                <li>?</li><strong>11</strong>
                <li>?</li><strong>12</strong>
            </ul>
        </div>
        <div class="space-between">
            <h2 class="ultimos-numeros">Sugestões</h2>
            <div id="umaDuasDuz-container" class="button-container on">
                <div class="button"></div>
                <input type="hidden" name="umaDuasDuz" value="2">
                <div class="text">
                    <span class="on">2 Dúzias</span>
                    <span class="off">1 Dúzia</span>
                </div>
            </div>
        </div>
        <div class="duzias">
            <div>
                <div class="flex titulo space-between nao_selecionado">
                    <h2>D1</h2>
                    <p id="percD1">0%</p>
                </div>
                <p id="valorD1">R$ 0,00</p>
                <div class="entradas">
                    <p id="entradasD1">-</p>
                </div>
            </div>
            <div>
                <div class="flex titulo space-between nao_selecionado">
                    <h2>D2</h2>
                    <p id="percD2">0%</p>
                </div>
                <p id="valorD2">R$ 0,00</p>
                <div class="entradas">
                    <p id="entradasD2">-</p>
                </div>
            </div>
            <div>
                <div class="flex titulo space-between nao_selecionado">
                    <h2>D3</h2>
                    <p id="percD3">0%</p>
                </div>
                <p id="valorD3">R$ 0,00</p>
                <div class="entradas">
                    <p id="entradasD3">-</p>
                </div>
            </div>
        </div>
        <div class="space-between">
            <h2 class="ultimos-numeros">Em operação</h2>
            <div id="operacaoTestes-container" class="button-container on">
                <div class="button"></div>
                <input type="hidden" name="operacaoTestes" value="2">
                <div class="text">
                    <span class="on">Operação</span>
                    <span class="off">Testes</span>
                </div>
            </div>
        </div>
        <div class="duzias operacoes">
            <div>
                <div class="titulo operacao">
                    <h2>Acumulado</h2>
                </div>
                <p id="acumuladoD1">R$ 0,00</p>
                <div class="entradas">
                    <p>Até 9 entradas</p>
                </div>
            </div>
        </div>
        <div class="teste-numero">
            <h3>Importar histórico da roleta</h3>
            <textarea rows="1" cols="33" class="codigo" placeholder="Cole o código aqui"></textarea>
            <input type="submit" class="enviar">
            <div class="listarNumeros" style="display:none;"></div>
        </div>
    </div>
    <script>

        const btnElmDuzCont = document.getElementById('umaDuasDuz-container')
        const btnElmDuz     = document.getElementsByName('umaDuasDuz')[0]

        btnElmDuzCont.addEventListener('click', function () {
            btnElmDuzCont.classList.toggle('on')
            btnElmDuzCont.classList.contains('on') ? btnElmDuz.value = 2 : btnElmDuz.value = 1
        })// btnElmDuzCont.addEventListener

        /************/

        const btnElmOpCont = document.getElementById('operacaoTestes-container')
        const btnElmOp     = document.getElementsByName('operacaoTestes')[0]

        btnElmOpCont.addEventListener('click', function () {
            btnElmOpCont.classList.toggle('on')
            btnElmOpCont.classList.contains('on') ? btnElmOp.value = 2 : btnElmOp.value = 1
        })// btnElmOpCont.addEventListener

        /************/

        elemento = document.querySelector('.bancaUsu')

        function formatarMoeda() {

            var elemento = document.querySelector('.bancaUsu')
            var valor = elemento.value
            
            valor = valor + ''
            valor = parseInt(valor.replace(/[\D]+/g,''))
            valor = valor + ''
            valor = valor.replace(/([0-9]{2})$/g, ",$1")

            if (valor.length > 6) {
                valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2")
            }// if (valor.length > 6)

            elemento.value = valor

        }// formatarMoeda

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

        reload = document.querySelector('.reload')
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

        let saldoBanca        = document.getElementById('saldoBanca');
        let saldoLucro        = document.getElementById('saldoLucro');
        let numeroSorteado    = document.getElementById('numeroSorteado');

        let contaWin          = document.getElementById('contaWin');
        let contaLoss         = document.getElementById('contaLoss');

        let percD1            = document.getElementById('percD1');
        let valorD1           = document.getElementById('valorD1');
        let percD2            = document.getElementById('percD2');
        let valorD2           = document.getElementById('valorD2');
        let percD3            = document.getElementById('percD3');
        let valorD3           = document.getElementById('valorD3');

        let acumuladoD1       = document.getElementById('acumuladoD1');
        let entradasD1        = document.getElementById('entradasD1');
        let acumuladoD2       = document.getElementById('acumuladoD2');
        let entradasD2        = document.getElementById('entradasD2');
        let acumuladoD3       = document.getElementById('acumuladoD3');
        let entradasD3        = document.getElementById('entradasD3');

        let box_numeros       = document.querySelector('.box-ultimos ul');
        let numeros           = [];
        let numerosInvertidos = [];
        let filhos            = document.querySelectorAll('.box-ultimos ul li');
        const form            = document.getElementById('form');
        contador = 1;

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

                // formData.append('nome', 'valor')
                // let numeros = [25,27,2,13,12,9,5,1,22,5,17,21];
                for (var i = 0; i < numeros.length; i++) {
                    formData.append('numeros[]', numeros[i])
                }// for (var i = 0; i < numeros.length; i++)

                formData.append("userID", <?= $id ?>)
                formData.append("banca", banca)
                formData.delete("numeroSorteado")
                formData.append("estDuzias", Number(btnElmDuz.value))
                formData.append("testes", Number(btnElmOp.value))

                // console.log("formData get banca: ", formData.get('banca'));
                // console.log("formData get numeroSorteado: ", formData.get('numeroSorteado'));
                
                // Convert formData object to URL-encoded string:
                const payload = new URLSearchParams(formData)
                // console.log("payload: ", payload);

                // Create payload as new FormData object:
                // const payload = new FormData(form);
                
                fetch('http://localhost:3001/calc', {
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
                        // console.log("banca HTML", saldoBanca.innerHTML);
                        saldoLucro.innerHTML = "R$ " + Decimal(Number(resposta.banca) - Number(banca),2)

                        // console.log("vitDuz", resposta.vitDuz)
                        contaWin.innerHTML = resposta.vitDuz ? resposta.vitDuz : "0"

                        // console.log("derDuz", resposta.derDuz)
                        contaLoss.innerHTML = resposta.derDuz ? resposta.derDuz : "0"

                        // console.log("perDuz", resposta.duzias.percDuz)
                        sugestoes = document.querySelectorAll('.nao_selecionado')

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

                            // console.log("resposta.apostaDuz", resposta.apostaDuz);
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

                        percD1.innerHTML = resposta.duzias.percDuz[0] ? resposta.duzias.percDuz[0] + "%" : "0%"
                        percD2.innerHTML = resposta.duzias.percDuz[1] ? resposta.duzias.percDuz[1] + "%" : "0%"
                        percD3.innerHTML = resposta.duzias.percDuz[2] ? resposta.duzias.percDuz[2] + "%" : "0%"

                        // console.log("valorDuz", resposta.valorDuz)
                        // console.log("rodadaDuz", resposta.rodadaDuz)
                        // console.log("apostaDuz", resposta.apostaDuz)
                        // console.log("ventr", resposta.ventr)

                        acumuladoD1.innerHTML = "R$ " + Decimal(resposta.acumDuz, 2)

                        if (resposta.apostaDuz == 0) {
                            
                            entradasD1.innerHTML  = (resposta.rodadaDuz) + "ª entrada"

                            entradasD2.innerHTML  = "Sem Entradas"
                            entradasD3.innerHTML  = "Sem Entradas"
                        
                        } else if (resposta.apostaDuz == 1) {

                            entradasD2.innerHTML  = (resposta.rodadaDuz) + "ª entrada"

                            entradasD1.innerHTML  = "Sem Entradas"
                            entradasD3.innerHTML  = "Sem Entradas"
                        
                        } else if (resposta.apostaDuz == 2) {
                        
                            entradasD3.innerHTML  = (resposta.rodadaDuz) + "ª entrada"

                            entradasD1.innerHTML  = "Sem Entradas"
                            entradasD2.innerHTML  = "Sem Entradas"
                        
                        } else {

                            if (resposta.rodadaDuz == 0) {
                                acumuladoD1.innerHTML = "0,00"
                                entradasD1.innerHTML  = "Sem Entradas"
                                entradasD2.innerHTML  = "Sem Entradas"
                                entradasD3.innerHTML  = "Sem Entradas"
                            }// if (resposta.rodadaDuz == 0)

                        }// else if (resposta.apostaDuz == 2)

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
            formData.append("userID", <?= $id ?>)
            const payload = new URLSearchParams(formData)

            /************/

            fetch('http://localhost:3001/reset', {
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

                    acumuladoD1.innerHTML = "0,00"
                    entradasD1.innerHTML  = "Sem Entradas"

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

    </script>
</body>
</html>