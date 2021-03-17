new Vue({
    el: "#app",

    data: {
        contacts_data_inputs: [
            {
                id: "lastNameInput",
                name: "Фамилия",
                text: "",
                isInvalid: false
            },
            {
                id: "firstNameInput",
                name: "Имя",
                text: "",
                isInvalid: false
            },
            {
                id: "phoneInput",
                name: "Номер телефона",
                text: "",
                isInvalid: false
            }
        ],

        message: "",

        contacts: [],
        contactId: 1
    },

    methods: {
        addContact: function () {
            var isValidationFailed = false;
            this.message = "";

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
                return;
            }

            var samePhoneNumberContact = _.findWhere(this.contacts, {phoneNumber: this.contacts_data_inputs[2].text});
            console.log(samePhoneNumberContact);

            if (samePhoneNumberContact !== undefined) {
                this.message = "Контакт с таким номером уже существует";
                return;
            }

            this.message = "";

            this.contacts.push({
                id: this.contactId,
                lastName: this.contacts_data_inputs[0].text.trim(),
                firstName: this.contacts_data_inputs[1].text.trim(),
                phoneNumber: this.contacts_data_inputs[2].text.trim()
            });

            this.contactId++;

            this.contacts_data_inputs.forEach(function (contact_data_input) {
                contact_data_input.text = "";
            });
        },

        deleteContact: function (contact) {
            this.contacts = this.contacts.filter(function (e) {
                return e !== contact;
            })
        }
    }
});