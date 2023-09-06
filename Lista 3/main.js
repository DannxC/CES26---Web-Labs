$(document).ready(function () {
    // Seleciona o elemento clicado
    $("#container").on("click", "*", function (e) {
        e.stopPropagation();
        $(".selected").removeClass("selected"); // Remove a classe de qualquer elemento previamente selecionado
        $(this).addClass("selected"); // Adiciona a classe ao elemento clicado atualmente
    });

    // Adiciona um evento de clique ao "root"
    $("#root").click(function (e) {
        if (e.target === this) {  // Verifica se o clique foi diretamente no "root"
            e.stopPropagation();  // Impede que o evento se propague para o #container
            $(".selected").removeClass("selected");
            $(this).addClass("selected");
        }
    });

    // Remove o elemento selecionado atualmente ao clicar no botão
    $("#remove-element").click(function () {
        if (!$(".selected").is("#root")) {  // Verifica se o elemento selecionado não é o root
            $(".selected").remove();
        }
    });

    // Adiciona um novo elemento filho ao elemento selecionado atualmente
    $("#add-element").click(function () {
        const elementType = $("#element-type").val() || "div";
        const newElement = $(`<${elementType}>Novo Elemento</${elementType}>`);
        $(".selected").append(newElement);
    });

    // Edita o texto do elemento selecionado atualmente
    $("#edit-text").on("input", function () {
        const newText = $(this).val();
        $(".selected").text(newText);
    });

    // Edita a cor de fundo do elemento selecionado atualmente
    $("#edit-bg-color").on("input", function () {
        const newColor = $(this).val();
        $(".selected").css("background-color", newColor);
    });
});
