document.addEventListener("DOMContentLoaded", function () {
    var inputTextField = document.getElementById("input_text_field");
    var outputTextBlock = document.querySelector(".output_text_block");


    document.getElementById("convert_button").addEventListener("click", function () {
        var inputTextValue = inputTextField.value;

        if (inputTextValue === "") {
            outputTextBlock.textContent = "Пожалуйста, заполните поле ввода";
            return;
        }

        if (isNaN(inputTextValue)) {
            outputTextBlock.textContent = "В поле ввода присутсвуют недопустимые символы";
            return;
        }

        inputTextField.value = "";

        var valueInKelvin = Number.parseFloat(inputTextValue) + 273.15;
        var valueInFahrenheit = inputTextValue * 1.8 + 32;

        outputTextBlock.textContent = inputTextValue + "° Цельсия = " + Math.round(valueInKelvin * 1000) / 1000 +
            "° Кельвина = " + Math.round(valueInFahrenheit * 1000) / 1000 + "° Фаренгейта";
    })
});
