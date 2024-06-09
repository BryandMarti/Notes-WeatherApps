// const fs = require('fs')

// //its common to stick with the forever use name for this variable just to not have any problems, and for best practice

// // this was a small excersice I was given at the begining of the section.

// // loaded and used a node.js module
// fs.appendFileSync('notes.txt', ' How are you doing today?')



// Importing the 'fs' module for file system operations
const fs = require('fs');

// Importing the 'chalk' module for colored console output

////Came back to the file to refactor the syntags.
/////taking advantage of the short hand syntags... poor candidates for methods, but great for everthing else
const chalk = require('chalk'); 
// Function to add a new note
const addNote = (title, body) => {
    const notes = loadNotes(); // Loading existing notes


    // Checking for duplicate titles
    const duplicateNote = notes.find((note) => note.title === title);
    if (!duplicateNote) { // If title is unique
        notes.push({
            title: title,
            body: body
        });
        saveNotes(notes); // Saving the updated notes
        console.log(chalk.green.inverse('New note added!')); // Success message
    } else {
        // If title is already taken
        console.log(chalk.red.inverse('Note title taken!')); // Error message
    }
};
 debugger
// Function to remove a note
const removeNote = (title) => {
    const notes = loadNotes(); // Loading existing notes
    const notesToKeep = notes.filter((note) => note.title !== title); // Filtering out the note to be removed
    if (notes.length > notesToKeep.length) { // If note was found and removed
        console.log(chalk.green.inverse('Note removed!')); // Success message
        saveNotes(notesToKeep); // Saving the updated notes
    } else {
        // If no note found
        console.log(chalk.red.inverse('No note found!')); // Error message
    }
};

// Function to list all notes
const listNotes = () => {
    const notes = loadNotes(); // Loading existing notes
    console.log(chalk.inverse('Your notes'));
    notes.forEach((note) => {
        console.log(note.title); // Printing each note title
    });
};

// Function to read a specific note
const readNote = (title) => {
    const notes = loadNotes(); // Loading existing notes
    const note = notes.find((note) => note.title === title); // Finding the requested note
    if (note) {
        console.log(chalk.inverse(note.title)); // Printing note title
        console.log(note.body); // Printing note body
    } else {
        // If note not found
        console.log(chalk.red.inverse('Note not found!')); // Error message
    }
};

// Function to save notes to file
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes); // Converting notes array to JSON
    fs.writeFileSync('notes.json', dataJSON); // Writing JSON data to file
};

// Function to load notes from file
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json'); // Reading file data
        const dataJSON = dataBuffer.toString(); // Converting buffer to string
        return JSON.parse(dataJSON); // Parsing JSON data to object
    } catch (e) {
        // Return an empty array if file not found
        return [];
    }
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};