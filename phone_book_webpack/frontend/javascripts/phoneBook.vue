<template>
  <div class="container" v-cloak>
    <div class="row">
      <h1 class="h2 col text-center m-3">Телефонная книга</h1>
    </div>

    <template>
      <div v-for="contactDataInput in contactsDataInputs" :key="contactDataInput.id">
        <div class="row mb-2">
          <div class="col pl-4 bolt-text">
            {{ contactDataInput.name }}
          </div>
        </div>
        <div class="row mb-2">
          <div class="col mb-2">
            <input v-model="contactDataInput.text"
                   type="text"
                   class="form-control"
                   :class="{ 'is-invalid': contactDataInput.isInvalid }"
                   maxlength="60">
            <div class="invalid-feedback bolt-text">{{ contactDataInput.errorMessage }}</div>
          </div>
        </div>
      </div>
    </template>

    <div class="row">
      <div class="col text-center">
        <button @click="addContact" type="button" class="btn btn-primary mt-2" aria-pressed="true">
          Добавить контакт
        </button>
      </div>
    </div>

    <div class="row mb-2">
      <div class="col pl-4 bolt-text">Поиск</div>
    </div>
    <div class="row mb-2">
      <div class="col">
        <input v-model="term" class="form-control" type="text" maxlength='60'>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col text-center">
        <button @click="loadContacts" type="button" class="btn btn-primary mt-3 mr-3 add_button"
                aria-pressed="true">
          Поиск
        </button>
        <button @click="clearSearch" type="button" class="btn btn-secondary mt-3 add_button" aria-pressed="true">
          Очистить
        </button>
      </div>
    </div>

    <div class="table-responsive">
      <table class="table table-bordered table-sm contacts-table mt-4">
        <thead class="table-primary">
        <tr>
          <th scope="col" @click="chooseAll" class="text-center limitWidth">
            <template v-if="deleteAllCheckboxValue">
              <img src="../images/checked_checkbox.ico"
                   class="img-fluid justify-content-center"
                   alt="checked_checkbox"
                   title="Снять выделение">
            </template>
            <template v-else>
              <img src="../images/unchecked_checkbox.ico"
                   class="img-fluid"
                   alt="unchecked_checkbox"
                   title="Выделить все">
            </template>
          </th>
          <th scope="col" class="text-center">№</th>
          <th scope="col" class="pl-3">Фамилия</th>
          <th scope="col" class="pl-3">Имя</th>
          <th scope="col" class="pl-3">Номер телефона</th>
          <template v-if="isDeleteContactsButtonShow">
            <th scope="col"
                @click="deleteContacts"
                class="text-center delete-cell"
                title="Удалить выбранные">
              X
            </th>
          </template>
          <template v-else>
            <th scope="col" class="text-center pl-3"></th>
          </template>
        </tr>
        </thead>
        <tbody>
        <template v-if="contacts.length === 0">
          <tr class="empty-row text-center">
            <td scope="row"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </template>
        <tr v-for="(contact, index) in contacts" :key="contact.id">
          <td scope="row" @click="checkContact(contact)" class="text-center limitWidth">
            <template v-if="contact.isChecked">
              <img src="../images/checked_checkbox.ico"
                   class="img-fluid"
                   alt="checked_checkbox"
                   title="Снять выделение">
            </template>
            <template v-else>
              <img src="../images/unchecked_checkbox.ico"
                   class="img-fluid"
                   alt="unchecked_checkbox"
                   title="Выделить">
            </template>
          </td>
          <td class="text-center pl-2">{{ index + 1 }}</td>
          <td class="pl-3">{{ contact.lastName }}</td>
          <td class="pl-3">{{ contact.firstName }}</td>
          <td class="pl-3">{{ contact.phoneNumber }}</td>
          <td @click="deleteContact(contact)"
              class="text-center delete-cell"
              title="Удалить контакт">
            X
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <delete-confirm-dialog ref="confirmDeleteDialog">
      <p>{{ confirmMessage }}</p>

      <template v-slot:title>
        Подтвеждение удаления
      </template>

      <template v-slot:close-button-text>
        Отменить
      </template>

      <template v-slot:ok-button-text>
        Удалить
      </template>
    </delete-confirm-dialog>
  </div>
</template>

<script>
import PhoneBookService from "./phoneBookServise";
import DeleteConfirmDialog from "./DeleteConfirmDialog.vue"

export default ({
  components: {
    DeleteConfirmDialog
  },

  data() {
    return {
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
      term: "",
      deleteAllCheckboxValue: false,
      isDeleteContactsButtonShow: false,
      service: new PhoneBookService(),
      confirmMessage: ""
    }
  },

  created: function () {
    this.loadContacts();
  },

  methods: {
    loadContacts() {
      this.service.getContacts(this.term.trim()).done(response => {
        this.contacts = response;
        this.checkDeleteAllCheckBox();
      }).fail(() => {
        alert("Не удалось загрузить список контактов");
      });
    },

    clearSearch() {
      this.term = "";
      this.loadContacts();
    },

    addContact() {
      let isValidationFailed = false;

      this.contactsDataInputs.forEach((contactDataInput) => {
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

      const contact = {
        lastName: this.contactsDataInputs[0].text,
        firstName: this.contactsDataInputs[1].text,
        phoneNumber: this.contactsDataInputs[2].text
      };

      this.service.createContact(contact).done(response => {
        if (!response.success) {
          this.contactsDataInputs[2].isInvalid = true;
          this.contactsDataInputs[2].errorMessage = "Контакт с таким номером уже существует";
          return;
        }

        this.term = "";
        this.loadContacts();

        this.contactsDataInputs.forEach(contactDataInput => {
          contactDataInput.text = "";
        });
      }).fail(() => {
        alert("Не удалось создать контакт");
      });
    },

    deleteContacts() {
      this.confirmMessage = "Вы уверены, что хотите удалить выбранные контакты?";

      this.$refs.confirmDeleteDialog.show(() => {
        let contactsIds = [];

        this.contacts.forEach(c => {
          if (c.isChecked) {
            contactsIds.push(c.id);
          }
        });

        if (contactsIds.length === 0) {
          alert("Не выбрано ни одного контакта");
          return;
        }

        this.service.deleteContacts(contactsIds).done(response => {
          if (!response.success) {
            alert(response.message);
            return;
          }

          this.loadContacts();
        }).fail(() => {
          alert("Не удалось удалить контакты");
        });
      });
    },

    deleteContact(contact) {
      this.confirmMessage = "Вы уверены, что хотите удалить контакт?";

      this.$refs.confirmDeleteDialog.show(() => {
        this.service.deleteContacts([contact.id]).done(response => {
          if (!response.success) {
            alert(response.message);
            return;
          }

          this.loadContacts();
        }).fail(() => {
          alert("Не удалось удалить контакт");
        });
      });
    },

    chooseAll() {
      this.deleteAllCheckboxValue = !this.deleteAllCheckboxValue;
      this.isDeleteContactsButtonShow = this.deleteAllCheckboxValue;

      this.contacts.forEach(c => {
        c.isChecked = this.deleteAllCheckboxValue;
      });
    },

    checkContact(contact) {
      contact.isChecked = !contact.isChecked;

      this.checkDeleteAllCheckBox();
    },

    checkDeleteAllCheckBox() {
      let checkedContactsCount = 0;

      this.contacts.forEach(c => {
        if (c.isChecked) {
          checkedContactsCount++;
        }
      });

      this.isDeleteContactsButtonShow = checkedContactsCount !== 0;
      this.deleteAllCheckboxValue = checkedContactsCount === this.contacts.length && checkedContactsCount !== 0;
    }
  }
});
</script>

<style scoped>

</style>