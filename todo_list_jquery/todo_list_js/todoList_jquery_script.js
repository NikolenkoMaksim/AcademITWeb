$(document).ready(function () {
    var inputTextField = $("#input_text_field");
    var errorMessageBlock = $(".error_message_block");
    var list = $("#todo_list")

    $("#add_button").click(function () {
        var noteText = inputTextField.val();

        if (noteText === "") {
            errorMessageBlock.removeClass("empty_block").text("Пожалуйста, заполните поле ввода");
            return;
        }

        errorMessageBlock.addClass("empty_block");

        function setViewMode(listItem) {
            listItem.html("<span class='note_text'></span>" +
                "<button class='edit_button' type='button'>Редактировать</button>" +
                "<button class='delete_button' type='button'>Удалить</button>");

            listItem.find(".note_text").text(noteText);

            listItem.find(".delete_button").click(function () {
                listItem.remove();
            });

            listItem.find(".edit_button").click(function () {
                listItem.html("<div>" +
                    "<input class='edit_text' type='text' maxlength='58'>" +
                    "<button class='save_button' type='button'>Сохранить</button>" +
                    "<button class='cancel_button' type='button'>Закрыть</button>" +
                    "</div>" +
                    "<div class='error_message_block hidden_block'></div>");

                listItem.find(".edit_text").val(noteText);

                listItem.find(".save_button").click(function () {
                    if (listItem.find(".edit_text").val() === "") {
                        listItem.find(".error_message_block").removeClass("hidden_block").text("Пожалуйста, заполните поле ввода");
                        return;
                    }

                    listItem.find(".error_message_block").text("");
                    noteText = listItem.find(".edit_text").val();
                    setViewMode(listItem);
                });

                listItem.find(".cancel_button").click(function () {
                    setViewMode(listItem);
                });
            });
        }

        var listItem = $("<li></li>");
        setViewMode(listItem);

        list.prepend(listItem);
        inputTextField.val("");
        errorMessageBlock.text("");
    });
});