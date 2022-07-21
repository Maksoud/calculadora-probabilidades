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
        <link rel="icon" type="image/x-icon" href="img/favicon.ico">
        <link rel="stylesheet" href="css/estilo.css">
    </head>
    <body>
        <div class="container">
            <div class="logo">
                <?= '<div class="usuario">Olá, '.$nome[0].'</div><div class="assinatura">Válido até '.date('d/m/Y', $expiracao).'.</div>' ?>
                <input type="hidden" name="userID" value="<?= $id ?>">
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
            <h2 class="titulos">Números sorteados <button id="reload" class="fas fa-redo reload"></button></h2>
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
                <h2 class="titulos">Estratégia: Dúzias</h2>
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
                <h2 class="titulos">Estratégia: Colunas</h2>
                <div id="umaDuasCol-container" class="button-container on">
                    <div class="button"></div>
                    <input type="hidden" name="umaDuasCol" value="2">
                    <div class="text">
                        <span class="on">2 Colunas</span>
                        <span class="off">1 Coluna</span>
                    </div>
                </div>
            </div>
            <div class="colunas">
                <div>
                    <div class="flex titulo space-between nao_selecionado">
                        <h2>C1</h2>
                        <p id="percD1">0%</p>
                    </div>
                    <p id="valorD1">R$ 0,00</p>
                    <div class="entradas">
                        <p id="entradasC1">-</p>
                    </div>
                </div>
                <div>
                    <div class="flex titulo space-between nao_selecionado">
                        <h2>C2</h2>
                        <p id="percD2">0%</p>
                    </div>
                    <p id="valorD2">R$ 0,00</p>
                    <div class="entradas">
                        <p id="entradasC2">-</p>
                    </div>
                </div>
                <div>
                    <div class="flex titulo space-between nao_selecionado">
                        <h2>C3</h2>
                        <p id="percD3">0%</p>
                    </div>
                    <p id="valorD3">R$ 0,00</p>
                    <div class="entradas">
                        <p id="entradasC3">-</p>
                    </div>
                </div>
            </div>
            <h2 class="titulos">Valores em operação</h2>
            <div class="duzias operacoes">
                <div>
                    <div class="titulo operacao">
                        <h2>Dúzias</h2>
                    </div>
                    <p id="acumuladoDuz">R$ 0,00</p>
                    <div class="entradas">
                        <p>Até 9 entradas</p>
                    </div>
                </div>
                <div>
                    <div class="titulo operacao">
                        <h2>Colunas</h2>
                    </div>
                    <p id="acumuladoCol">R$ 0,00</p>
                    <div class="entradas">
                        <p>Até 9 entradas</p>
                    </div>
                </div>
                <div>
                    <div class="titulo operacao">
                        <h2>Zero</h2>
                    </div>
                    <p id="acumuladoZero">R$ 0,00</p>
                    <div class="entradas">
                        <p>Todas entradas</p>
                    </div>
                </div>
            </div>
            <div class="teste-numero">
                <div class="space-between">
                    <h2 class="titulos">Importação</h2>
                    <div id="operacaoTestes-container" class="button-container on">
                        <div class="button"></div>
                        <input type="hidden" name="operacaoTestes" value="2">
                        <div class="text">
                            <span class="on">Operação</span>
                            <span class="off">Importar</span>
                        </div>
                    </div>
                </div>
                <textarea rows="1" cols="33" class="codigo" placeholder="Cole o código aqui"></textarea>
                <input type="submit" class="enviar">
                <div class="listarNumeros" style="display:none;"></div>
            </div>
        </div>
        <script src="js/scripts.js"></script>
    </body>
</html>