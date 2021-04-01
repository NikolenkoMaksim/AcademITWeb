new Vue({
    el: "#app",

    data: {
        contactsDataInputs: [
            {
                id: "lastNameInput",
                name: "Фамилия",
                text: "",
                isInvalid: false,
                errorMessage: "Пожалуйста, заполните поле"
            },
            {
                id: "firstNameInput",
                name: "Имя",
                text: "",
                isInvalid: false,
                errorMessage: "Пожалуйста, заполните поле"
            },
            {
                id: "phoneInput",
                name: "Номер телефона",
                text: "",
                isInvalid: false,
                errorMessage: "Пожалуйста, заполните поле"
            }
        ],

        contacts: [],
        contactId: 1
    },

    methods: {
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
                this.contactsDataInputs[2].errorMessage = "Пожалуйста, заполните поле";
                return;
            }

            var self = this;

            if (this.contacts.some(function (c) {
                return c.phoneNumber === self.contactsDataInputs[2].text;
            })) {
                self.contactsDataInputs[2].isInvalid = true;
                self.contactsDataInputs[2].errorMessage = "Контакт с таким номером уже существует";
                return;
            }

            this.contacts.push({
                id: this.contactId,
                lastName: this.contactsDataInputs[0].text,
                firstName: this.contactsDataInputs[1].text,
                phoneNumber: this.contactsDataInputs[2].text
            });

            this.contactId++;

            this.contactsDataInputs.forEach(function (contactDataInput) {
                contactDataInput.text = "";
            });
        },

        deleteContact: function (contact) {
            this.contacts = this.contacts.filter(function (c) {
                return c !== contact;
            });
        }
    }
});