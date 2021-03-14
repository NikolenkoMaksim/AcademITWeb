new Vue({
    el: "#app",

    data: {
        notes: [],
        newNoteText: "",
        newId: 1
    },

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
                text: text,
                isEditing: false,
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
            note.editText = note.text;
        },

        saveNote: function (note) {
            if (note.editText === "") {
                $(".edit_text").addClass("is-invalid");
                return;
            }

            $(".edit_text").removeClass("is-invalid");

            note.isEditing = false;
            note.text = note.editText;
        }
    }
});