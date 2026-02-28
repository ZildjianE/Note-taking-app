// ANTA Note-Taking App - JavaScript Functionality

const notes = [];

// Function to create a new note
function createNote(title, content) {
    const note = { id: Date.now(), title, content, createdAt: new Date() };
    notes.push(note);
    displayNotes();
}

// Function to display all notes
function displayNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = ''; // Clear existing notes
    notes.forEach(note => {
        const noteItem = document.createElement('div');
        noteItem.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p>`;
        notesList.appendChild(noteItem);
    });
}

// Function to update a note
function updateNote(id, newTitle, newContent) {
    const note = notes.find(n => n.id === id);
    if (note) {
        note.title = newTitle;
        note.content = newContent;
        displayNotes();
    }
}

// Function to delete a note
function deleteNote(id) {
    const index = notes.findIndex(n => n.id === id);
    if (index > -1) {
        notes.splice(index, 1);
        displayNotes();
    }
}

// Future Memory Capsule Feature
function setMemoryCapsule(noteId, date) {
    const note = notes.find(n => n.id === noteId);
    if (note) {
        setTimeout(() => {
            alert(`Remember this note: ${note.title}`);
        }, date.getTime() - Date.now());
    }
}

// Functions for backup and restore
function backupNotes() {
    localStorage.setItem('notesBackup', JSON.stringify(notes));
}

function restoreNotes() {
    const backup = localStorage.getItem('notesBackup');
    if (backup) {
        notes.length = 0; // Clear current notes
        const restoredNotes = JSON.parse(backup);
        restoredNotes.forEach(note => notes.push(note));
        displayNotes();
    }
}

// Event Listeners for user interactions
document.getElementById('createNoteButton').addEventListener('click', () => {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    createNote(title, content);
});

document.getElementById('backupButton').addEventListener('click', backupNotes);
document.getElementById('restoreButton').addEventListener('click', restoreNotes);

// Initial call to display notes
displayNotes();