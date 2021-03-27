new Vue({
    el: "#app",

    data: {
        contacts_data_inputs: [
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

            this.contacts_data_inputs.forEach(function (contact_data_input) {
                if (contact_data_input.text.trim() === "") {
                    isValidationFailed = true;
                    contact_data_input.isInvalid = true;
                    contact_data_input.text = "";
                } else {
                    contact_data_input.isInvalid = false;
                }
            });

            if (isValidationFailed) {
                this.contacts_data_inputs[2].errorMessage = "Пожалуйста, заполните поле";
                return;
            }

            var self = this;

            if (this.contacts.some(function (c) {
                return c.phoneNumber === self.contacts_data_inputs[2].text;
            })) {
                self.contacts_data_inputs[2].isInvalid = true;
                self.contacts_data_inputs[2].errorMessage = "Контакт с таким номером уже существует";
                return;
            }

            this.contacts.push({
                id: this.contactId,
                lastName: this.contacts_data_inputs[0].text,
                firstName: this.contacts_data_inputs[1].text,
                phoneNumber: this.contacts_data_inputs[2].text
            });

            this.contactId++;

            this.contacts_data_inputs.forEach(function (contact_data_input) {
                contact_data_input.text = "";
            });
        },

        deleteContact: function (contact) {
            this.contacts = this.contacts.filter(function (c) {
                return c !== contact;
            });
        }
    }
});