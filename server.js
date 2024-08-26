#!/usr/bin/env node

const { Command } = require("commander");
const fs = require("fs");
const program = new Command();

program
    .name('fileOperation')
    .description("CLI to perform various file operations")
    .version('0.8.0');

// Count the number of words in a file
program
    .command('countWord')
    .description("Count the number of words in a file")
    .argument("<file>", 'Path to the file')
    .action((file) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) {
                console.error(`Error reading file "${file}": ${err.message}`);
            } else {
                const count = data.split(' ').length;
                console.log(`The file "${file}" contains ${count} word${count > 1 ? 's' : ''}.`);
            }
        });
    });




// Count the number of lines in a file
program
    .command('countLine')
    .description('Count the number of lines in a file')
    .argument("<file>", "Path to the file")
    .action((file) => {
        fs.readFile(file, "utf-8", (err, data) => {
            if (err) {
                console.error(`Error reading file "${file}": ${err.message}`);
            } else {
                const len = data.split('\n').length;
                console.log(`The file "${file}" contains ${len} line${len > 1 ? 's' : ''}.`);
            }
        });
    });





// Create a new file
program
    .command("createFile")
    .description("Create a new file")
    .argument("<file>", "Path to the new file")
    .action((file) => {
        if (fs.existsSync(file)) {
            console.log(`The file "${file}" already exists. Please choose a different name.`);
        } else {
            fs.writeFile(file, '', (err) => {
                if (err) {
                    console.error(`Error creating file "${file}": ${err.message}`);
                } else {
                    console.log(`Successfully created the file "${file}".`);
                }
            });
        }
    });




// Read the content of a file
program
    .command("readFile")
    .description("Read the content of a file")
    .argument("<file>", 'Path to the file')
    .action((file) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) {
                console.error(`Error reading file "${file}": ${err.message}`);
            } else {
                console.log(`Content of "${file}":\n${data}`);
            }
        });
    });




// Write content to a file
program
    .command("writeFile")
    .description("Write content to a file")
    .argument("<file>", "Path to the file")
    .argument("<content>", "Content to write")
    .action((file, content) => {
        fs.writeFile(file, content, (err) => {
            if (err) {
                console.error(`Error writing to file "${file}": ${err.message}`);
            } else {
                console.log(`Successfully wrote content to "${file}".`);
            }
        });
    });



// Edit the content of a file
program
    .command("editFile")
    .description("Replace old content in a file with new content")
    .argument("<file>", "Path to the file")
    .argument("<oldText>", "Text to replace")
    .argument("<newText>", "New text to insert")
    .action((file, oldText, newText) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) {
                console.error(`Error reading file "${file}": ${err.message}`);
            } else {
                console.log(`Current content of "${file}":\n${data}`);
                const updatedContent = data.replace(new RegExp(oldText, 'g'), newText);
                fs.writeFile(file, updatedContent, (err) => {
                    if (err) {
                        console.error(`Error updating file "${file}": ${err.message}`);
                    } else {
                        console.log(`Successfully updated content in "${file}".`);
                    }
                });
            }
        });
    });



// Delete a file
program
    .command('deleteFile')
    .description('Delete a specified file')
    .argument('<file>', 'Path to the file')
    .action((file) => {
        if (fs.existsSync(file)) {
            fs.unlink(file, (err) => {
                if (err) {
                    console.error(`Error deleting file "${file}": ${err.message}`);
                } else {
                    console.log(`Successfully deleted the file "${file}".`);
                }
            });
        } else {
            console.log(`The file "${file}" does not exist.`);
        }
    });

program.parse();
