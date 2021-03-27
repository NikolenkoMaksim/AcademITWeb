var express = require("express");
var router = express.Router();

var contacts = [];
var newId = 1;

router.get("/api/getContacts", function (reg, res) {
    var term = (reg.query.term || "").toUpperCase();

    var result = term.length === 0
        ? contacts
        : contacts.filter(function (c) {
            return c.lastName.toUpperCase().indexOf(term) >= 0 ||
                c.firstName.toUpperCase().indexOf(term) >= 0 ||
                c.phoneNumber.toUpperCase().indexOf(term) >= 0;
        });

    return res.send(result);
});

router.post("/api/deleteContacts", function (reg, res) {
    var contactsIds = reg.body.contactsIds;
    console.log(contactsIds);

    contactsIds.forEach(function (contactId) {
        contacts = contacts.filter(function (c) {
            return c.id !== contactId;
        });
    });

    res.send({
        success: true,
        message: null
    });
});

router.post("/api/createContact", function (reg, res) {
    contact = reg.body.contact;

    if (!contact) {
        res.send({
            success: false,
            message: "Неверный формат данных"
        });

        return;
    }

    if (!contact.lastName) {
        res.send({
            success: false,
            message: "Необходимо задать фимилию контакта"
        });

        return;
    }

    if (!contact.firstName) {
        res.send({
            success: false,
            message: "Необходимо задать имя контакта"
        });

        return;
    }

    if (!contact.phoneNumber) {
        res.send({
            success: false,
            message: "Необходимо задать телефонный номер контакта"
        });

        return;
    }

    if (contacts.some(function (c) {
        return c.phoneNumber.toUpperCase() === contact.phoneNumber.toUpperCase();
    })) {
        res.send({
            success: false,
            message: "Контакт с таким номером уже существует"
        });

        return;
    }

    contact.id = newId;
    newId++;
    contact.isChecked = false;

    contacts.push(contact);

    res.send({
        success: true,
        message: null
    });
});

router.get('/', function (req, res) {
    res.render("index");
});

module.exports = router;
