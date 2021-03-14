new Vue({
    el: "#app",

    data: {
        notes: [],
        newNoteText: "",
        newId: 1,
        isInvalidInput: false
    },

    methods: {
        addNewNote: function () {
            var text = this.newNoteText;

            if (text.trim() === "") {
                this.isInvalidInput = true;
                return;
            }

            this.isInvalidInput = false;

            this.notes.push({
                id: this.newId,
                text: text,
                isEditing: false,
                isInvalid: false,
                editText: text
            });

            this.newNoteText = "";
            this.newId++;
        },

        deleteNote: function (note) {
            this.notes = this.notes.filter(function (e) {
                return e !== note;
            })
        },

        startEditNote: function (note) {
            note.isEditing = true;
        },

        stopEditNote: function (note) {
            note.isEditing = false;
            note.isInvalid = false;
            note.editText = note.text;
        },

        saveNote: function (note) {
            if (note.editText === "") {
                note.isInvalid = true;
                return;
            }

            note.isInvalid = false;

            note.isEditing = false;
            note.text = note.editText;
        }
    }
});