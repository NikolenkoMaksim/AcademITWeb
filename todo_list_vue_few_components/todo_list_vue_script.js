Vue.component("todo-list-note", {
    props: {
        note: {
            type: Object,
            required: true
        }
    },

    data: function () {
        return {
            isEditing: false,
            editText: "",
            isInvalid: false
        };
    },

    template: "#todo-list-note-template",

    methods: {
        startEditNote: function () {
            this.editText = this.note.text;
            this.isEditing = true;
        },

        stopEditNote: function () {
            this.isEditing = false;
        },

        saveNote: function () {
            if (this.editText === "") {
                this.isInvalid = true;
                return;
            }

            this.isInvalid = false;

            this.isEditing = false;
            this.$emit("save-note", this.note, this.editText);
        },

        deleteNote: function () {
            this.$emit("delete-note", this.note);
        }
    }
});

Vue.component("todo-list", {
    data: function () {
        return {
            notes: [],
            newNoteText: "",
            newId: 1
        };
    },

    template: "#todo-list-template",

    methods: {
        addNewNote: function () {
            var text = this.newNoteText;

            if (text.trim() === "") {
                $("#input_text_field").addClass("is-invalid");
                return;
            }

            $("#input_text_field").removeClass("is-invalid");

            this.notes.push({
                id: this.newId,
                text: text
            });

            this.newNoteText = "";
            this.newId++;
        },

        deleteNote: function (note) {
            this.notes = this.notes.filter(function (e) {
                return e !== note;
            });
        },

        saveNote: function (note, newText) {
            note.text = newText;
        },
    }
});

new Vue({
    el: "#app"
});