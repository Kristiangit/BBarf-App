const express = require('express')
const app = express()
const port = 3000


const sqlite3 = require('sqlite3').verbose();




class Database {
    constructor() {
        this.db = new sqlite3.Database('database.sqlite');
    }

    // create table if not exists
    createTableNote() {
        this.db.serialize(() => {
            this.db.run(```CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY,
                folderID TEXT
                userID INTEGER
                type TEXT,
                title TEXT,
                updateDate TEXT, 
                )```);
        });
    }
    createTableUser() {
        this.db.serialize(() => {
            this.db.run(```CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY,
                name TEXT,
                mail TEXT,
                password TEXT,
                creationDate TEXT,
                jwt TEXT,
                )```);
        });
    }
    createTableFolder() {
        this.db.serialize(() => {
            this.db.run(`CREATE TABLE IF NOT EXISTS folders (
                info TEXT
                )`);
        });
    }

    // insert data into table lorem with info column value Ipsum 0 to Ipsum 9
    insertData() {
        this.db.serialize(() => {
            const stmt = this.db.prepare("INSERT INTO lorem VALUES (?)");
            for (let i = 0; i < 10; i++) {
                stmt.run("Ipsum " + i);
            }
            stmt.finalize();
        });
    }

    // select all data from table lorem and print it to console
    selectData() {
        this.db.serialize(() => {
            this.db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
                console.log(row.id + ": " + row.info);
            });
        });
    }

    // select data from table lorem where info column value is Ipsum 2 and print it to console
    selectDataFilter() {
        this.db.serialize(() => {
            this.db.each("SELECT rowid AS id, info FROM lorem WHERE info = ?", "Ipsum 2", (err, row) => {
                console.log(row.id + ": " + row.info);
            });
        });
    }

    // delete all data from table lorem
    deleteData(table) {
        this.db.serialize(() => {
            this.db.run(`DELETE FROM ${table}`);
        });
    }

    // delete data from table lorem with info column value Ipsum 2
    deleteDataFilter() {
        this.db.serialize(() => {
            this.db.run("DELETE FROM lorem WHERE info = ?", "Ipsum 2");
        });
    }

    // close database connection
    close() {
        this.db.close();
    }
}

const db = new Database();
//each method are executed in order
// database.createTable();
// database.deleteData();
// database.insertData();
// database.selectData();
// database.selectDataFilter();
// database.close();



app.get('/', (req, res) => {
    res.send('Your server obeys your every line!')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

app.post("/api/register", (req, res) => {
    try {
        
    } catch (error) {
        console.log(error, "error")
    }
});

app.post("/api/login", (req, res) => {
    try {
        
    } catch (error) {
        console.log(error, "error")
    }
});

