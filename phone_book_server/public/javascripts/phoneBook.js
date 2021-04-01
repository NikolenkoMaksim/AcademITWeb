function get(url, data) {
    return $.get(url, data);
}

function post(url, data) {
    return $.post({
        url: url,
        contentType: "application/json",
        data: JSON.stringify(data)
    });
}

function PhoneBookService() {
    this.baseUrl = "/api/";

    this.getContacts = function (term) {
        return get(this.baseUrl + "getContacts", {term: term});
    };

    this.createContact = function (contact) {
        return post(this.baseUrl + "createContact", {contact: contact});
    };

    this.deleteContacts = function (contactsIds) {
        return post(this.baseUrl + "deleteContacts", {contactsIds: contactsIds});
    };
}

Vue.component("modal", {
    template: "#modal-template",

    data: function () {
        return {
            onOk: null
        };
    },

    methods: {
        show: function (onOk) {
            this.onOk = onOk;
            $(this.$refs.modal).modal("show");
        },

        ok: function () {
            this.onOk();
            $(this.$refs.modal).modal("hide");
        }
    }
});

new Vue({
    el: "#app",

    data: {
        contactsDataInputs: [
            {
                id: "lastNameInput",
                name: "Фамилия",
                text: "",
                isInvalid: false,
                errorMessage: "Пожалйста, заполните поле"
            },
            {
                id: "firstNameInput",
                name: "Имя",
                text: "",
                isInvalid: false,
                errorMessage: "Пожалйста, заполните поле"
            },
            {
                id: "phoneInput",
                name: "Номер телефона",
                text: "",
                isInvalid: false,
                errorMessage: "Пожалйста, заполните поле"
            }
        ],

        contacts: [],
        term: "",
        deleteAllCheckboxValue: false,
        service: new PhoneBookService()
    },

    created: function () {
        this.loadContacts();
    },

    methods: {
        loadContacts: function () {
            var self = this;

            this.service.getContacts(this.term.trim()).done(function (response) {
                self.contacts = response;
            }).fail(function () {
                alert("Не удалось загрузить список контактов");
            });
        },

        clearSearch: function () {
            this.term = "";
            this.loadContacts();
        },

        addContact: function () {
            var isValidationFailed = false;

            this.contactsDataInputs.forEach(function (contactDataInput) {
                if (contactDataInput.text.trim() === "") {
                    isValidationFailed = true;
                    contactDataInput.isInvalid = true;
                    contactDataInput.text = "";
                } else {
                    contactDataInput.isInvalid = false;
                }
            });

            if (isValidationFailed) {
                this.contactsDataInputs[2].errorMessage = "Пожалйста, заполните поле";
                return;
            }

            var contact = {
                lastName: this.contactsDataInputs[0].text,
                firstName: this.contactsDataInputs[1].text,
                phoneNumber: this.contactsDataInputs[2].text
            };

            var self = this;

            this.service.createContact(contact).done(function (response) {
                if (!response.success) {
                    self.contactsDataInputs[2].isInvalid = true;
                    self.contactsDataInputs[2].errorMessage = "Контакт с таким номером уже существует";
                    return;
                }

                self.term = "";
                self.loadContacts();

                self.contactsDataInputs.forEach(function (contactDataInput) {
                    contactDataInput.text = "";
                });
            }).fail(function () {
                alert("Не удалось создать контакт");
            });
        },

        deleteContacts: function (contact) {
            var self = this;

            this.$refs.confirmDeleteDialog.show(function () {
                contact.isChecked = true;

                var contactsIds = [];

                self.contacts.forEach(function (c) {
                    if (c.isChecked) {
                        contactsIds.push(c.id);
                    }
                });

                self.service.deleteContacts(contactsIds).done(function (response) {
                    if (!response.success) {
                        alert(response.message);
                        return;
                    }

                    self.deleteAllCheckboxValue = false;
                    self.loadContacts();
                }).fail(function () {
                    alert("Не удалось удалить контакт");
                });
            });
        },

        chooseAll: function () {
            this.deleteAllCheckboxValue = !this.deleteAllCheckboxValue;
            var self = this;

            this.contacts.forEach(function (c) {
                c.isChecked = self.deleteAllCheckboxValue;
            });
        },

        checkContact: function (contact) {
            contact.isChecked = !contact.isChecked;

            var self = this;
            self.deleteAllCheckboxValue = true;

            this.contacts.forEach(function (c) {
                if (c.isChecked === false) {
                    self.deleteAllCheckboxValue = false;
                    return false;
                }
            });
        }
    }
});