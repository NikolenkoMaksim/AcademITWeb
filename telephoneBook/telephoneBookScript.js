$(document).ready(function () {
    var familyNameInput = $("#input_family_name");
    var nameFieldInput = $("#input_name");
    var telephoneInput = $("#input_telephone");

    var contacntsCount = 0;

    $("#add_button").click(function () {
        console.log("skdskd");

        contact.html("<tr class=\"phonebook_normal_row\">" +
                "<td class=\"phonebook_contact_number\">contacntsCount</td>" +
                "<td class=\"phonebook_first_name\">familyNameInput.text()</td>" +
                "<td class=\"phonebook_last_name\">nameFieldInput.text()</td>" +
                "<td class=\"phonebook_phone\">telephoneInput.text()</td>" +
                "<td class=\"phonebook_delete_column\">X</td>" +
            "</tr>");

        $("phonebook_tbody").append(contact);
    });


});

