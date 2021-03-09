$(document).ready(function () {
    var lastNameInput = $("#input_last_name");
    var firstNameInput = $("#input_first_name");
    var phoneInput = $("#input_phone");

    var contactsCount = 0;

    $("#add_button").click(function () {
        var errorMessage;

        if (lastNameInput.val() !== "") {
            lastNameInput.removeClass("invalid");
        } else {
            errorMessage = "Необходимо заполнить поле \"Фамилия\"";
            lastNameInput.addClass("invalid");
        }

        if (firstNameInput.val() !== "") {
            firstNameInput.removeClass("invalid");
        } else {
            if (errorMessage === undefined) {
                errorMessage = "Необходимо заполнить поле \"Имя\"";
            } else {
                errorMessage += ", поле  \"Имя\"";
            }

            firstNameInput.addClass("invalid");
        }

        if (phoneInput.val() !== "") {
            phoneInput.removeClass("invalid");
        } else {
            if (errorMessage === undefined) {
                errorMessage = "Необходимо заполнить поле \"Номер телефона\"";
            } else {
                errorMessage += ", поле \"Номер телефона\"";
            }

            phoneInput.addClass("invalid");
        }

        if (errorMessage === undefined) {
            $(".phonebook_phone").not("th").each(function () {
                if ($(this).text() === phoneInput.val()) {
                    errorMessage = "Контакт с таким номером уже существует";
                    return false;
                }
            });
        }

        if (errorMessage === undefined) {
            $(".error_message_block").text("");
        } else {
            $(".error_message_block").text(errorMessage);
            return;
        }

        $(".phonebook_empty_row").hide();

        function setNewContactRow(tableRow) {
            contactsCount++;

            tableRow.html("<td class='phonebook_contact_number'></td>" +
                "<td class='phonebook_last_name'></td>" +
                "<td class='phonebook_first_name'></td>" +
                "<td class='phonebook_phone'></td>" +
                "<td class='phonebook_delete_column'></td>");

            tableRow.find(".phonebook_contact_number").text(contactsCount);
            tableRow.find(".phonebook_last_name").text(lastNameInput.val());
            tableRow.find(".phonebook_first_name").text(firstNameInput.val());
            tableRow.find(".phonebook_phone").text(phoneInput.val());
            tableRow.find(".phonebook_delete_column").text("X");

            lastNameInput.val("");
            firstNameInput.val("");
            phoneInput.val("");

            tableRow.find(".phonebook_delete_column").click(function () {
                $.confirm({
                    title: 'Подтверждение удаления',
                    message: 'После удаления контакт нельзя будет восстановить. <br> Продолжить удаление?',
                    buttons: {
                        'Да': {
                            class: "blue",
                            action: function () {
                                tableRow.remove();
                                contactsCount--;

                                if (contactsCount === 0) {
                                    $(".phonebook_empty_row").show();
                                }

                                $(".phonebook_contact_row").each(function (index) {
                                    $(this).find(".phonebook_contact_number").text(index);
                                })
                            }
                        },
                        'Нет': {
                            class: "gray",
                            action: function () {
                            }
                        }
                    }
                });
            });
        }

        var newContactRow = $("<tr></tr>").addClass("phonebook_contact_row");
        setNewContactRow(newContactRow);

        $(".phonebook_table_block tbody").append(newContactRow);
    });
});