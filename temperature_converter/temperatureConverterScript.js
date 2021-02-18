document.addEventListener("DOMContentLoaded", function () {
    inputText = document.getElementById("input_text");
    errorMassage = document.querySelector(".error_message");
    outputText = document.querySelector(".output_text");


    document.querySelector(".button").addEventListener("click", function () {
        inputTextValue = inputText.value;

        if (inputTextValue === "") {
            outputText.textContent = "Пожалуйста, заполните поле ввода";
            return;
        }

        if (isNaN(inputTextValue)) {
            outputText.textContent = "В поле ввода присутсвуют недопустимые символы";
            return;
        }

        inputText.value = "";

        valueInKelvin = Number.parseFloat(inputTextValue) + 273.15;
        valueInFahrenheit = inputTextValue * 1.8 + 32;

        outputText.textContent = inputTextValue + " градусов Цельсия = " + Math.round(valueInKelvin * 1000) / 1000 +
            " градусов Кельвина = " + Math.round(valueInFahrenheit * 1000) / 1000 + " градусов Фаренгейта";
    })
});
