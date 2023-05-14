const addbtn = document.querySelector("#addBtn")
const main = document.querySelector("#main")

addbtn.addEventListener(
    "click",
    function(){
        addNote()
    }
)

const addNote = (text = "") =>{
    const note = document.createElement("div")
    note.classList.add("note")
    note.innerHTML = `
    <div class="tool">
                <i class="edit fas fa-edit"></i>
                <i class="save fas fa-save"></i>
                <i class="trash fas fa-trash"></i>
            </div>
            <textarea>${text}</textarea>
    `;
    note.querySelector(".trash").addEventListener(
        "click",
        function(){
            note.remove()
            saveNotes()
        }
    )
    note.querySelector(".save").addEventListener(
        "click",
        function(){
            saveNotes()
        }
    )
    note.querySelector(".edit").addEventListener(
        "click",
        function() {
            const textarea = this.parentElement.nextElementSibling;
            textarea.readOnly = false;
            textarea.focus();
        }
    );
    
    note.querySelector("textarea").addEventListener(
        "focusout",
        function() {
            this.readOnly = true;
            saveNotes()
        }
    )
    main.appendChild(note)
    saveNotes()
}

const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea")
    const data = []
    notes.forEach(
        (note) => {
            data.push(note.value)
        }
    )
    //console.log(data)
    if (data.length === 0) {
        localStorage.removeItem("notes")
    } else {
        localStorage.setItem("notes", JSON.stringify(data))
    }
}

(
    function() {
        const lsNotes = JSON.parse(localStorage.getItem("notes"));
        if (lsNotes === null) {
            addNote()
        } else {
            lsNotes.forEach(
                (lsNote) => {
                    addNote(lsNote)
                }
            )
        }

    }
)()