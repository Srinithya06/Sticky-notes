document.addEventListener("DOMContentLoaded", function () {
    showNotes();

    document.getElementById("addNote").addEventListener("click", () => {
        const title = document.getElementById("title").value.trim();
        const description = document.getElementById("description").value.trim();

        if (title === "" || description === "") {
            alert("Please fill in both title and description.");
            return;
        }

        let notes = localStorage.getItem("notes");
        let notesObj = notes ? JSON.parse(notes) : [];

        notesObj.push({ title, description });
        localStorage.setItem("notes", JSON.stringify(notesObj));

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";

        showNotes();
    });

    document.getElementById("searchTxt").addEventListener("keyup", function () {
        const inputVal = this.value.toLowerCase();
        const noteCards = document.getElementsByClassName("note-card");

        Array.from(noteCards).forEach(card => {
            const cardTitle = card.querySelector(".card-header").innerText.toLowerCase();
            const cardText = card.querySelector(".card-text").innerText.toLowerCase();

            card.style.display = cardTitle.includes(inputVal) || cardText.includes(inputVal) ? "block" : "none";
        });
    });
});

function showNotes() {
    const notes = localStorage.getItem("notes");
    const notesObj = notes ? JSON.parse(notes) : [];

    const notesContainer = document.getElementById("notesContainer");
    notesContainer.innerHTML = "";

    if (notesObj.length === 0) {
        notesContainer.innerHTML = `<b class="text-danger">No notes to show<br>Please Add Some Notes!</b>`;
        return;
    }

    notesObj.forEach((note, index) => {
        const card = document.createElement("div");
        card.className = "card border-primary m-2 note-card";
        card.style.width = "18rem";
        card.innerHTML = `
            <div class="card-header fw-bold">${note.title}</div>
            <div class="card-body text-primary">
                <p class="card-text">${note.description}</p>
                <button class="btn btn-danger" onclick="deleteNote(${index})">Delete</button>
            </div>`;
        notesContainer.appendChild(card);
    });
}

function deleteNote(index) {
    const notes = localStorage.getItem("notes");
    let notesObj = notes ? JSON.parse(notes) : [];

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
