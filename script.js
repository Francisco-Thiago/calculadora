//variáveis
var tabela = document.querySelectorAll('button.botao');
let dados = document.querySelector('input#imprimir');
let digito = "", valor = "", contador = [''], operadorResul='';

//Arrow functions
const verificarOperador = (variavel, condicao) => { return condicao === true? ['+','-','/','*'].includes(variavel) : !['+','-','/','*'].includes(variavel) }
const verificarNumero = (variavel, condicao) => { return condicao === true? ['igual','limpar','apagar','+/-'].includes(variavel) : !['igual','limpar','apagar','+/-'].includes(variavel) }
const verificarGeral =  (variavel, condicao) => { return condicao === true? ['+','-','/','*','igual','limpar','apagar','+/-'].includes(variavel) : !['+','-','/','*','igual','limpar','apagar','+/-'].includes(variavel) }
const verificarVirgula = (variavel) => { try{ eval(variavel+'0'); return true }catch{ return false } }
const agrupar = (acumulador, valor) => { acumulador += valor; return acumulador }

//Eventos
for(let i = 0 ; i<tabela.length ; i++){
    //Função ativiada após teclar um botão
    tabela[i].addEventListener('click',function(){
        digito = tabela[i].value;
        //verificar número digitado
        if((verificarNumero(digito, false) && valor == "")){
            valor += digito;
            dados.value = valor;
        }else if(verificarGeral(digito, false) && verificarGeral(valor.charAt(valor.length-1), false) && verificarVirgula(valor) || (verificarGeral(digito, false) && verificarOperador(valor.charAt(valor.length-1), true))  && verificarVirgula(valor) || (verificarOperador(digito, true) && verificarGeral(valor.charAt(valor.length-1), false)) && verificarVirgula(valor)){
            valor += digito;
            dados.value = valor;
            operadorResul = "";
            console.log(valor)
        }else if(verificarOperador(digito, true) && verificarOperador(valor.charAt(valor.length-1), true) && verificarVirgula(valor)){
            valor = (valor.substr(0, valor.length-1) + digito)
            dados.value = valor
            operadorResul = "";
            console.log(valor)
        }
        //Trocar operadores
        if(digito==="+/-" && valor != ""){
            verificarOperador(valor.charAt(0), false) ? contador[0] = '-' : "";
            //Altera os operadores posteriores
            for(let a = 0 ; a<valor.length ; a++){
                if(!['+','-'].includes(valor.charAt(a))){
                    contador.push(valor.charAt(a));    
                }else if(valor.charAt(a) == '+'){
                    contador.push('-');
                }else if(valor.charAt(a) == '-'){
                    contador.push('+');
                }
            }
            if(verificarOperador(contador[contador.length-1], false)){
                dados.value = contador.reduce(agrupar, "");
            }else{
                dados.value = contador.reduce(agrupar, "").substr(0, contador.length-1);
            }
            //Exibe o valor na tela e limpa o array.
            valor = contador.reduce(agrupar,'');
            contador.splice(0, contador.length);
            operadorResul = "";
        }
        //Limpar campo;
        if(digito == "limpar"){
            dados.value="0";
            valor = "";
        }
        //Apagar uma caractere
        if(digito == "apagar"){
            valor = valor.substr(0,valor.length-1);
            dados.value = valor;
        }
        //Resultado da operação
        if(digito == "igual" && verificarOperador(valor.charAt(valor.length-1), false) && valor != ""){
            if(Math.sign(eval(valor)) == 1){
                dados.value = `${eval(valor)}`;
                operadorResul = '+';
                valor = dados.value.replace('+','')+operadorResul;
            }else{
                dados.value = `${eval(valor)}`;
                operadorResul = '-';
                valor = dados.value+operadorResul;
            }
        }
        //Atualiza a posição do scroll.
        dados.scrollLeft = dados.scrollWidth;
    });
}