const links = document.querySelectorAll("header .link");

// pega a seção de cada link; se não existir no HTML, ignora
const secoes = [...links]
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

const topoDaSecao = secao => secao.getBoundingClientRect().top + window.scrollY;

function atualizarMenu() {
    // linha de referência: 40% da altura da tela
    const referencia = window.scrollY + window.innerHeight * 0.4;

    let atual = null;
    secoes.forEach(secao => {
        if (topoDaSecao(secao) <= referencia) atual = secao;
    });

    // chegou no fim da página: marca a última (o contato)
    const noFim = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (noFim) atual = secoes[secoes.length - 1];

    links.forEach(link => {
        link.classList.toggle("ativo", atual && link.getAttribute("href") === "#" + atual.id);
    });
}

window.addEventListener("scroll", atualizarMenu);
atualizarMenu(); // roda uma vez ao carregar


const botaoConheca = document.querySelector(".btn-conheca");
const alvoConheca = document.querySelector("#conhecer");

botaoConheca.addEventListener("click", function (evento) {
    evento.preventDefault();   // cancela o salto do href="#conhecer"
    alvoConheca.scrollIntoView({ behavior: "smooth", block: "end" });
});