//calendario

const diasTag = document.querySelector(".dias"),
    dataAtual = document.querySelector(".data-atual"),
    iconesMovimento = document.querySelectorAll(".icones span");

let date = new Date(),
    anoAtual = date.getFullYear(),
    mesAtual = date.getMonth();

const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
    "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]; // array dos meses

const renderCalendar = () => {
    let priDiaMes = new Date(anoAtual, mesAtual, 1).getDay(),
        ultDataMes = new Date(anoAtual, mesAtual + 1, 0).getDate(),
        ultDiaMes = new Date(anoAtual, mesAtual, ultDataMes).getDay(),
        ultDatadoUltMes = new Date(anoAtual, mesAtual, 0).getDate();
    let liTag = "";

    for (let i = priDiaMes; i > 0; i--) { // cria li dos dias do mes anterior
        liTag += `<li class="inactive">${ultDatadoUltMes - i + 1}</li>`;
    }

    for (let i = 1; i <= ultDataMes; i++) { // cria li dos dias do mes atual
        let hojeEh = i === date.getDate() && mesAtual === new Date().getMonth()
            && anoAtual === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${hojeEh}">${i}</li>`;
    }

    for (let i = ultDiaMes; i < 6; i++) { // cria li dos dias do proximo mes
        liTag += `<li class="inactive">${i - ultDiaMes + 1}</li>`
    }
    dataAtual.innerText = `${meses[mesAtual]} ${anoAtual}`; // retorna o mes e o ano atual
    diasTag.innerHTML = liTag;
}
renderCalendar();

iconesMovimento.forEach(icon => { // administra os icones de movimentação dos meses
    icon.addEventListener("click", () => {
        mesAtual = icon.id === "anterior" ? mesAtual - 1 : mesAtual + 1;

        if (mesAtual < 0 || mesAtual > 11) { // se o mes atual < 0 ou mes atual> 11
            // cria-se uma nova data do ano e o mes é alterado
            date = new Date(anoAtual, mesAtual);
            anoAtual = date.getFullYear(); // atualiza o ano
            mesAtual = date.getMonth(); // atualiza o mes
        } else {
            date = new Date(); // passa o valor da data atual
        }
        renderCalendar();
    });
});

