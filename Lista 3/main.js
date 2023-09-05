$(document).ready(function () {
    // Seleciona o elemento clicado
    $("body").on("click", "*", function (e) {
        e.stopPropagation();
        if (!$(this).closest("#control-panel").length) { // Verifica se o elemento clicado não está dentro do painel de controle
            $(".selected").removeClass("selected"); // Remove a classe de qualquer elemento previamente selecionado
            $(this).addClass("selected"); // Adiciona a classe ao elemento clicado atualmente
        }
    });

    // Remove o elemento selecionado atualmente ao clicar no botão
    $("#remove-element").click(function () {
        if (!$(".selected").is("#control-panel")) {
            $(".selected").remove();
        }
    });

    // Adiciona um novo elemento filho ao elemento selecionado atualmente
    $("#add-element").click(function () {
        const elementType = $("#element-type").val() || "div";
        const newElement = $(`<${elementType}>Novo Elemento</${elementType}>`);
        $(".selected").append(newElement);
    });
});

