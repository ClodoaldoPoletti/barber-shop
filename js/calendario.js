function captura_data(parametro) {
    let parametros = document.getElementById("days");
    parametros = parametros.getAttribute("for");

    // Trata a data separando em (d) dia,  (m) mês e (a) ano.
    let d;
    if (parametro == 0) {
        d = parseInt(parametros.slice(8, 10), 0);    
    } else {
        d = 1;    
    }
    let m = parseInt(parametros.slice(5, 7), 0);
    let a = parseInt(parametros.slice(0, 4), 0);

    return new Date([a, m, d]);
}

// Início da função que monta o calendário
function monta_calendario(p_data, p_marcador) {
    
    let data_selecionada = new Date(p_data);
    let marcador = p_marcador;
    
    let mes_descricao_lista = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

    let mes_anterior = data_selecionada.getMonth() - 1;
    let ano_anterior = data_selecionada.getFullYear() - 1;

    let dia_selecionado = data_selecionada.getDate();
    let mes_selecionado = data_selecionada.getMonth();
    let ano_selecionado = data_selecionada.getFullYear();

    // Não precisou saber o mês subsequente para montar o calendário
    //let mes_subsequente = data_selecionada.getMonth() + 1;
    //let ano_subsequente = data_selecionada.getFullYear() + 1;

    let quantidade_dias_mes_anterior = new Date(ano_anterior, mes_anterior + 1, 0).getDate();
    let quantidade_dias_mes_selecionado = new Date(ano_selecionado, mes_selecionado + 1, 0).getDate();
    //let quantidade_dias_mes_subsequente = new Date(ano_subsequente, mes_subsequente + 1, 0).getDate();

    let data_servidor = captura_data(0);
    let dia_servidor = data_servidor.getDate();
    let mes_servidor = data_servidor.getMonth();
    let ano_servidor = data_servidor.getFullYear();

    //console.log("Mês servidor: " + mes_servidor + " Ano servidor: " + ano_servidor);
    //console.log("Mês atual: " + mes_selecionado + " Ano atual: " + ano_selecionado);

    if (mes_servidor == mes_selecionado && ano_servidor == ano_selecionado) {
        dia_selecionado = dia_servidor;
        marcador = 1;
    }
    
    
    // Lista com agendamentos
    let itensLista = document.querySelectorAll('.scheduled-services');

    let valoresFor = [];
    
    itensLista.forEach(function(item) {
        let valorFor = item.getAttribute('for');
        //valorFor = parseInt(valorFor.slice(8, 10), 0);
        valoresFor.push(valorFor);
    });

    //console.log(valoresFor);
    
    //console.log("Dia atual: " + dia_selecionado);

    //console.log("-----------------")

    //console.log("Mês anterior: " + mes_descricao_lista[mes_anterior] + " - dias: " + quantidade_dias_mes_anterior);
    //console.log("Mês atual: " + mes_descricao_lista[mes_selecionado] + " - dias: " + quantidade_dias_mes_selecionado);
    //console.log("Mês subsequente: " + mes_descricao_lista[mes_subsequente] + " - dias: " + quantidade_dias_mes_subsequente);

    //console.log("-----------------")

    //console.log("Ano anterior: " + ano_anterior);
    //console.log("Ano atual: " + ano_selecionado);
    //console.log("Ano subsequente: " + ano_subsequente);

    //console.log("-----------------")
    let calendario = [
        ["-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-"],
        ["-", "-", "-", "-", "-", "-", "-"],
    ];

    let dia_primeiro_do_mes = new Date(ano_selecionado, mes_selecionado, 1);
    let dia_da_semana_primeiro = dia_primeiro_do_mes.getDay();
    //console.log("Dia da semana, dia primeiro: " + dia_da_semana_primeiro);

    // Variáveis auxiliáres para construção da Matriz
    let a;
    let b;
    let c;

    for (a = 0; a < 6; a++) {
        // Faço uma checagem para saber o dia da semana que começo a popular
        if (a == 0) {
            b = dia_da_semana_primeiro;
            c = 1;
        } else {
            b = 0;
        }    
        // Populo o calendário com o mês atual/selecionado
        for (b; b < 7; b++) {
            //Só vou popular com o máximo de dias para o mês atual/selecionado
            if (c <= quantidade_dias_mes_selecionado) {
                calendario[a][b] = c;
                c++;
            }
        }   
    }

    //console.log(calendario);

    // Conta o número de espaços antes do mês atual
    let espacos_anterior = 0;
    for (let i = 0; i < 1; i++) {
        for (let j = 0; j < 7; j++) {
            if (calendario[i][j] == "-") {
                espacos_anterior++;
            }
        }
    }

    //console.log("Espaços anterior: " + espacos_anterior);

    // Conta o número de espaços depois do mês atual
    let espacos_subsequente = 0;
    for (let i = 4; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (calendario[i][j] == "-") {
                espacos_subsequente++;
            }
        }
    }

    // Popula o calendário com o mês anterior
    let dias_anterior = quantidade_dias_mes_anterior - espacos_anterior + 1;
    for (let i = 0; i < 1; i++) {
        for (let j = 0; j < espacos_anterior; j++) {
            calendario[i][j] = dias_anterior;
            dias_anterior++;
        }    
    }

    // Popula o calendário com o mês subsequente
    let dias_subsequente = 1;
    for (let i = 4; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            if (calendario[i][j] == "-") {
                calendario[i][j] = dias_subsequente;
                dias_subsequente++;    
            }        
        }    
    }


    // Monta o título do calendário, exemplo: Abril de 2024
    let mes_descricao = mes_descricao_lista[mes_selecionado];
    let mes_ano = mes_descricao + ' de ' + ano_selecionado;
    document.getElementById("mes_ano").innerHTML = mes_ano;


    // Identifica o dia da semana
    //let dia_da_semana = data_selecionada.getDay();
    //console.log("Dia da semana, dia atual: " + dia_da_semana);

    let elemento = document.getElementById("days");
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }

    // Monta o calendário na tela
    let x = 1;
    let data_calendario;
    let data_calendario_str;
                
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 7; j++) {
            let conteudo_dia = document.createTextNode(calendario[i][j]);
            let li_tag = document.createElement("li");

            let anchor_tag = document.createElement("a");
            
            if (calendario[i][j] != x) {
                li_tag.classList.add("section__schedule__days-content-day-opaque");
                li_tag.appendChild(conteudo_dia);
            } else {
                
                if (calendario[i][j] == dia_selecionado && marcador == 1) {
                    li_tag.classList.add("section__schedule__days-content-day__mark");
                    anchor_tag.classList.add("scheduling__link-content-day__mark");
                } else {
                    data_calendario_str = ano_selecionado + "-" + (mes_selecionado + 1).toString().padStart(2, "0") + "-" + calendario[i][j].toString().padStart(2, "0");
                    //console.log(data_calendario_str);
                    //if (valoresFor.includes(calendario[i][j]) && marcador == 1) {
                        if (valoresFor.includes(data_calendario_str)) {
                        li_tag.classList.add("section__schedule__days-content-day__mark-additional");
                        anchor_tag.classList.add("scheduling__link-content-day__mark-additional");
                    } else {
                        li_tag.classList.add("section__schedule__days-content-day");
                        anchor_tag.classList.add("scheduling__link-content-day");
                    }
                }
                x++;

                anchor_tag.href = "scheduling.html" + "?data_escolhida=" + data_calendario_str; //Definir aqui como passar o parâmetro da data para ser utilizada no agendamento

                //anchor_tag.appendChild(conteudo_dia)
                //li_tag.appendChild(anchor_tag);
                data_calendario = new Date(ano_selecionado, mes_selecionado, calendario[i][j]);
                //if (parseInt(calendario[i][j]) >= parseInt(dia_selecionado) && 
                //    parseInt(mes_selecionado) >= parseInt(mes_servidor) &&
                //    parseInt(ano_selecionado) >= parseInt(ano_servidor)) {
                
                if (data_calendario >= data_servidor) {
                    anchor_tag.appendChild(conteudo_dia)
                    li_tag.appendChild(anchor_tag);
                    //console.log("dia servidor: " + dia_servidor);
                    //console.log("dia selecionado: " + dia_selecionado);
                    //console.log("dia calendario: " + calendario[i][j]);
                    //console.log("mês servidor: " + mes_servidor);
                    //console.log("mês selecionado: " + mes_selecionado);
                    //console.log("ano servidor: " + ano_servidor);
                    //console.log("ano selecionado: " + ano_selecionado);
                    //console.log("tem link");
                } else {
                    li_tag.appendChild(conteudo_dia);
                    //console.log("dia servidor: " + dia_servidor);
                    //console.log("dia selecionado: " + dia_selecionado);
                    //console.log("dia calendario: " + calendario[i][j]);
                    //console.log("mês servidor: " + mes_servidor);
                    //console.log("mês selecionado: " + mes_selecionado);
                    //console.log("ano servidor: " + ano_servidor);
                    //console.log("ano selecionado: " + ano_selecionado);
                    //console.log("não tem link");
                }
                
            }            
            
            document.getElementById("days").appendChild(li_tag);
        }    
    }

}
// Fim da função que monta o calendário


//let parametros = document.getElementById("days");
//parametros = parametros.getAttribute("for");

//let data = parametros.slice(0, -2);
//let marcador = parametros.slice(-1);

//console.log(parametros);

// Trata a data separando em dia, mês e ano.
//let d = parseInt(parametros.slice(8, 10), 0);
//let m = parseInt(parametros.slice(5, 7), 0);
//let a = parseInt(parametros.slice(0, 4), 0);

let nova_data = captura_data(0);
//nova_data = new Date([a, m, d]);
//console.log(nova_data);

//console.log(a);

//monta_calendario(data, marcador);
monta_calendario(nova_data, 1);

let passos = 0;

function direcao(opcao) {

    nova_data = captura_data(1);

    if (opcao == "voltar") {
        passos--;
    } else {
        passos++;
    }
        
    nova_data.setMonth(nova_data.getMonth() + passos);
    
    //if (mes_data_servidor == mes_selecionado && ano_data_servidor == ano_selecionado) {
    //    marcador = 1;
    //}
    
    //console.log(nova_data);
    monta_calendario(nova_data, 0);

}
