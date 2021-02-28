document.addEventListener("DOMContentLoaded", function () {
    var inputTextField = document.getElementById("input_text_field");
    var outputTextBlock = document.querySelector(".output_text_block");

    document.getElementById("convert_button").addEventListener("click", function () {
        var inputTextValue = inputTextField.value;

        if (inputTextValue === "") {
            outputTextBlock.textContent = "Пожалуйста, заполните поле ввода";
            outputTextBlock.classList.add("error_message");
            return;
        }

        if (isNaN(inputTextValue)) {
            outputTextBlock.textContent = "В поле ввода присутствуют недопустимые символы";
            outputTextBlock.classList.add("error_message");
            return;
        }

        inputTextField.value = "";
        outputTextBlock.classList.remove("error_message");

        var temperatureInKelvin = parseFloat(inputTextValue) + 273.15;
        var temperatureInFahrenheit = inputTextValue * 1.8 + 32;

        outputTextBlock.textContent = inputTextValue + "° Цельсия = " + parseFloat(temperatureInKelvin.toFixed(3)) +
            "° Кельвина = " + parseFloat(temperatureInFahrenheit.toFixed(3)) + "° Фаренгейта";
    })
});
