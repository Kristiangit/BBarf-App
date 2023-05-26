// import { TokenKey } from "./secrets";
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();

db = new sqlite3.Database('database.sqlite');


function createTableUser() {
    db.serialize(function () {
        // db.run("DROP TABLE IF EXISTS users");
        db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, mail TEXT, password TEXT, creationDate TEXT)`);
    });
};

function createUser(name, mail, password) {
    
    
    let today = new Date();
    let datestring = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`;

    db.serialize(() => {
        db.run(`INSERT INTO users (name, mail, password, creationDate ) VALUES (?, ?, ?, ?)`, name, mail, password, datestring);
    });
};

createTableUser();
createUser("kristian", "test@teeest.com", "a");

//     // create table if not exists
//     createTableNote() {
//         this.db.serialize(() => {
//             this.db.run(```CREATE TABLE IF NOT EXISTS notes (
//                 id INTEGER PRIMARY KEY,
//                 folderID TEXT
//                 userID INTEGER
//                 type TEXT,
//                 title TEXT,
//                 updateDate TEXT, 
//                 )```);
//         });
//     }
//     createTableUser() {
//             this.db.run(`CREATE TABLE IF NOT EXISTS users (
//                 id INTEGER PRIMARY KEY,
//                 name TEXT,
//                 mail TEXT,
//                 password TEXT,
//                 creationDate TEXT,
//                 )`);
//     }
//     createTableFolder() {
//         this.db.serialize(() => {
//             this.db.run(`CREATE TABLE IF NOT EXISTS folders (
//                 info TEXT
//                 )`);
//         });
//     }


//     // insert data into table lorem with info column value Ipsum 0 to Ipsum 9
//     insertData() {
//         this.db.serialize(() => {
//             const stmt = this.db.prepare("INSERT INTO lorem VALUES (?)");
//             for (let i = 0; i < 10; i++) {
//                 stmt.run("Ipsum " + i);
//             }
//             stmt.finalize();
//         });
//     }
//     createUser(name, mail, password) {
//         let today = new Date();
//         let datestring = `${today.getDate()}-${today.getMonth()+1}-${today.getFullYear()}`; 

//         this.db.serialize(() => {
//             this.db.run(`INSERT INTO user (name, mail, password, creationDate ) VALUES (${name}, ${mail}), ${password}, ${datestring}`);
//         });
//     }

//     // select all data from table lorem and print it to console
//     checkLogin(mail, user) {
//         this.db.serialize(() => {
//             this.db.run("SELECT rowid AS id, info FROM user", (err, row) => {
//                 console.log(row.id + ": " + row.info);
//             });
//         });
//     }
//     selectData() {
//         this.db.serialize(() => {
//             this.db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
//                 console.log(row.id + ": " + row.info);
//             });
//         });
//     }

//     // select data from table lorem where info column value is Ipsum 2 and print it to console
//     selectDataFilter() {
//         this.db.serialize(() => {
//             this.db.each("SELECT rowid AS id, info FROM lorem WHERE info = ?", "Ipsum 2", (err, row) => {
//                 console.log(row.id + ": " + row.info);
//             });
//         });
//     }

//     // delete all data from table lorem
//     deleteData(table) {
//         this.db.serialize(() => {
//             this.db.run(`DELETE FROM ${table}`);
//         });
//     }

//     // delete data from table lorem with info column value Ipsum 2
//     deleteDataFilter() {
//         this.db.serialize(() => {
//             this.db.run("DELETE FROM lorem WHERE info = ?", "Ipsum 2");
//         });
//     }

//     // close database connection
//     close() {
//         this.db.close();
//     }
// }


const generateToken = (user) => {
    // Set the payload data for the token
    const payload = {
      userId: user.id,
      username: user.username,
      // Add additional data as needed
    };
  
    // Sign the token with a secret key
    const token = jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });
  
    return token;
};
  
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Your server obeys your every line!')
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

app.post("/api/register", (req, res) => {

    user_data = req.body;
    createUser(user_data.name, user_data.mail, user_data.password);
    res.send({"message": "Hello World!"})

});

app.post("/api/login", (req, res) => {
    try {
        
    } catch (error) {
        console.log(error, "error")
    }
});
app.get("/api/login", (req, res) => {
    const data = { message: 'Hello, world!' };
    res.json(data);
});

db.close();
