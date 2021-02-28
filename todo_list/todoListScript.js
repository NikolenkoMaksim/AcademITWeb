document.addEventListener("DOMContentLoaded", function () {
    var inputTextField = document.getElementById("input_text_field");
    var errorMessageBlock = document.querySelector(".error_message_block");
    var list = document.getElementById("todo_list")


    document.getElementById("add_button").addEventListener("click", function () {
        var noteText = inputTextField.value;

        if (noteText === "") {
            errorMessageBlock.textContent = "Пожалуйста, заполните поле ввода";
            errorMessageBlock.classList.remove("empty_block");
            return;
        }

        errorMessageBlock.classList.add("empty_block");

        function setViewMode(listItem) {
            listItem.innerHTML = "<span class='note_text'></span>" +
                "<button class='edit_button' type='button'>Редактировать</button>" +
                "<button class='delete_button' type='button'>Удалить</button>";

            listItem.querySelector(".note_text").textContent = noteText;

            listItem.querySelector(".delete_button").addEventListener("click", function () {
                list.removeChild(listItem);
            });

            listItem.querySelector(".edit_button").addEventListener("click", function () {
                listItem.innerHTML = "<div>" +
                    "<input class='edit_text' type='text'>" +
                    "<button class='save_button' type='button'>Сохранить</button>" +
                    "<button class='cancel_button' type='button'>Закрыть</button>" +
                    "</div>" +
                    "<div class='error_message_block hidden_block'></div>";

                listItem.querySelector(".edit_text").value = noteText;
                listItem.querySelector(".edit_text").maxLength = 58;

                listItem.querySelector(".save_button").addEventListener("click", function () {
                    if (listItem.querySelector(".edit_text").value === "") {
                        listItem.querySelector(".error_message_block").textContent = "Пожалуйста, заполните поле ввода";
                        listItem.querySelector(".error_message_block").classList.remove("hidden_block");
                        return;
                    }

                    listItem.querySelector(".error_message_block").textContent = "";
                    listItem.querySelector(".error_message_block").classList.add("empty_block")
                    noteText = listItem.querySelector(".edit_text").value;
                    setViewMode(listItem);
                });

                listItem.querySelector(".cancel_button").addEventListener("click", function () {
                    setViewMode(listItem);
                });
            });
        }

        var listItem = document.createElement("li");
        setViewMode(listItem);

        list.prepend(listItem);
        inputTextField.value = "";
        errorMessageBlock.textContent = "";
    })
});