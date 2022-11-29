const defaultArray = [2, 8, 1, 6, 3, 7, 5, 9];
let container = displayArray(defaultArray);
let miliseconds = {value: 500};

function unsort(arr) {
    container = displayArray(arr);
}


function getArrayValue() {
    return container;
}


function getTimeout() {
    return miliseconds;
}

$(document).ready(() => {

    $('#save-settings').click(() => {
        try {
            if ($('#arr').val() != '') {
                let arr = parse($('#arr').val());
                container = displayArray(arr);
                sorted = false;
            }
            $("#error").text("");
            if ($('#timeout').val() < 0) {
                $("p#success").text("");
                $("#error").text("Timeout cannot be negative");
                return;
            }
            miliseconds.value = $("#timeout").val() !== '' ? 
                $("#timeout").val() : miliseconds.value;
            
            $('p#success').text('Saved!');
        }
        catch (e) {
            $("p#success").text("");
            $('#error').text(e);
        }
    });

});