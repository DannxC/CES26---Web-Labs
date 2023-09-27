$(document).ready(function () {
    $("#fetchData").click(function () {
        $.get("/get_json", function (data, status) {
            $("#showData").html(JSON.stringify(data));
        });
    });
});