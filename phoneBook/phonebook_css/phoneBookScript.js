$(document).ready(function () {
    var lastNameInput = $("#input_last_name");
    var firstNameInput = $("#input_first_name");
    var phoneInput = $("#input_phone");

    var contactsCount = 0;

    $("#add_button").click(function () {
        var errorMessage;

        if (lastNameInput.val() === "") {
            errorMessage = "Необходимо заполнить поле \"Фамилия\"";
            lastNameInput.parent().addClass("unvalidated");
        } else {
            lastNameInput.parent().removeClass("unvalidated");
        }

        if (firstNameInput.val() === "") {
            if (errorMessage === undefined) {
                errorMessage = "Необходимо заполнить поле \"Имя\"";
            } else {
                errorMessage += ", поле  \"Имя\"";
            }

            firstNameInput.parent().addClass("unvalidated");
        } else {
            firstNameInput.parent().removeClass("unvalidated");
        }

        if (phoneInput.val() === "") {
            if (errorMessage === undefined) {
                errorMessage = "Необходимо заполнить поле \"Номер телефона\"";
            } else {
                errorMessage += ", поле \"Номер телефона\"";
            }

            phoneInput.parent().addClass("unvalidated");
        } else {
            phoneInput.parent().removeClass("unvalidated")
        }

        if (errorMessage === undefined) {
            $(".phonebook_phone").not("th").each(function () {
                if ($(this).text() === phoneInput.val()) {
                    errorMessage = "Контакт с таким номером уже существует";
                }
            });
        }

        if (errorMessage !== undefined) {
            $(".error_message_block").text(errorMessage);
            $("#add_button").removeClass("with_bottom_margin");

            return;
        } else {
            $(".error_message_block").text("");
            $("#add_button").addClass("with_bottom_margin");
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
                var elem = $(this).closest('.item');

                $.confirm({
                    'title': 'Подтверждение удаления',
                    'message': 'После удаления контакт нельзя будет восстановить. <br> Продолжить удаление?',
                    'buttons': {
                        'Да': {
                            'class': 'blue',
                            'action': function () {
                                tableRow.remove();
                                contactsCount--;

                                if (contactsCount === 0) {
                                    $(".phonebook_empty_row").show();
                                }

                                $(".phonebook_normal_row").each(function (index) {
                                    $(this).find(".phonebook_contact_number").text(index);
                                })
                            }
                        },
                        'Нет': {
                            'class': 'gray',
                            'action': function () {
                            }
                        }
                    }
                });
            });
        }

        var newContactRow = $("<tr></tr>").addClass("phonebook_normal_row");
        setNewContactRow(newContactRow);

        $(".phonebook_tbody").append(newContactRow);
    });


});

