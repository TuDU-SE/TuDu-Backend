// ./src/index.js

// libraries
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const pool = require("./db.js")

// --------------------------------------------------------------------------------------
// password hashing

// TODO: error handling inside hashing functions

const bcrypt = require('bcrypt');

const saltRounds = 10;

/** 
 *  generated a hash for this user
 *  hash password with random salt
 *  @param {object} user user has name and password
 *  @return {null}
**/ 
function hash_pwd(user) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            let credentials = [user.name, hash];
            // TODO: store in DB
            console.log(`Hash for user: ${user.name} with random salt: ${hash}`);          
        });
    });    
};

// pwd = TEST_PASSWORD
const MOCK_HASH_IN_DB = "$2b$10$St3dWOhNbNtjdiDknvEncOg/CqLEm4sq02d6.wsMBs6M1qRFrIrue";

/**
 * verifies a user with his given name and password
 * verify (compare) input password to in DB stored hashed password
 * @param {object} user user has name and pwassword
 * @return {null}
 */
function verify(user) {
    // get requested hash from db via user.name -> user_hash
    // TODO: get user data from DB
    bcrypt.compare(user.password, MOCK_HASH_IN_DB, function(err, result) {
        console.log(result);
    });
};

// --------------------------------------------------------------------------------------


// defaults
const port = 8080

const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));


// MIDDLEWARES
app.use((req, res, next) => {
    // the allow origin stuff needs to be configured correctly, up to this point I dont know how
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    });

    console.log("Middleware active!");
    next();
});

// ENDPOINTS

// redirect to base path
app.get('/', (req, res) => {
    res.redirect(301, '/api/v1/hello_world');
});

//Hello-world
app.get('/api/v1/hello_world', (req, res) => {
    res.status(200).send({text: 'Hello world!'});
});

// PASSWORD TEST
app.post('/api/v1/test/login', (req, res) => {
    const usr = req.body;
    console.log(usr);
    hash_pwd(usr);
    verify(usr);
    usr.loggedIn = true;
    usr.login_time = Date.now();
    res.status(200).send(usr);
});

//USER
app.post('/api/v1/register', async (req, res) => {
    try {
        const {email} = req.body;
        const pw_hash = "dummy hash"
        await pool.query(`INSERT INTO users(email, pw_hash) VALUES (${email}, ${pw_hash})`);
        res.status(200).send({text: `This is the placeholder for register a user`});
    } catch (err) {
        console.error(err.message);
        res.status(500).send()
    }

})

app.post('/api/v1/login', async (req, res) => {
    try {
        const {email, pw_hash} = req.body;
        const pw_hash_from_db = await pool.query(`SELECT pw_hash FROM users WHERE email = ${email}`);
        if(pw_hash === pw_hash_from_db){
            await pool.query(`UPDATE users SET auth_token = "auth_test_token" WHERE email = ${email}`);
            await pool.query(`UPDATE users SET refresh_token = "refresh_test_token" WHERE email = ${email}`);
            res.status(200).send({text: `The user has been authentificated. Your Tokens are in the response body.`});
        } else {
            res.status(401).send();
        }


    } catch (err) {
        console.error(err.message);
        res.status(500).send()
    }
})

app.get('/api/v1/logout', async (req, res) => {
    try {
        await pool.query("");
        res.status(200).send({text: `This is the placeholder for logging out a user`});
    } catch (err) {
        console.error(err.message);
        res.status(500).send()
    }
})

//Tasks
app.get('/api/v1/tasks/', async (req, res) => {
    try {
        await pool.query("");
        res.status(200).send({test: "This is the placeholder for read all tasks"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send()
    }
})

app.get('/api/v1/tasks/:id', async (req, res) => {
    try {
        await pool.query("");
        const reqId = req.params.id;
        res.status(200).send({text: `This is the placeholder for read task by id, id = ${reqId}`});
    } catch (err) {
        console.error(err.message);
        res.status(500).send()
    }
})

app.post('/api/v1/tasks/', async (req, res) => {
    try {
        await pool.query("");
        res.status(200).send({text: `This is the placeholder for read all tasks`});
    } catch (err) {
        console.error(err.message);
        res.status(500).send()
    }
})

app.patch('/api/v1/tasks/:id', async (req, res) => {
    try {
        const {email} = req.body;
        await pool.query("");
        res.status(200).send({text: `This is the placeholder for update task by id`});
    } catch (err) {
        console.error(err.message);
        res.status(500).send()
    }
})

app.delete('/api/v1/tasks/:id', async (req, res) => {
    try {
        const {email} = req.body;
        await pool.query("");
        res.status(200).send({text: `This is the placeholder for delete task by id`});
    } catch (err) {
        console.error(err.message);
        res.status(500).send()
    }
})

//Lists
app.get('/api/v1/list/', async (req, res) => {
    try {
        const {email} = req.body;
        await pool.query("");
        res.status(200).send({test: "This is the placeholder for list all tasks"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send()
    }
})

app.get('/api/v1/list/:id', async (req, res) => {
    try {
        const {email} = req.body;
        await pool.query("");
        res.status(200).send({text: `This is the placeholder for register a user`});
    } catch (err) {
        console.error(err.message);
        res.status(500).send()
    }
})

app.post('/api/v1/list/', async (req, res) => {
    try {
        const {email} = req.body;
        await pool.query("");
        res.status(200).send({text: `This is the placeholder for read all lists`});
    } catch (err) {
        console.error(err.message);
        res.status(500).send()
    }
})

app.patch('/api/v1/list/:id', async (req, res) => {
    try {
        const {email} = req.body;
        await pool.query("");
        res.status(200).send({text: `This is the placeholder for update list by id`});
    } catch (err) {
        console.error(err.message);
        res.status(500).send()
    }
})

app.delete('/api/v1/list/:id', async (req, res) => {
    try {
        const {email} = req.body;
        await pool.query("");
        res.status(200).send({text: `This is the placeholder for delete list by id`});
    } catch (err) {
        console.error(err.message);
        res.status(500).send()
    }
})

//init DB for simpler developement
app.post('/api/v1/init_db', async (req, res) => {
    try {
 /*       await  pool.query("DROP TABLE IF EXISTS users");
        await  pool.query("DROP TABLE IF EXISTS lists");
        await  pool.query("DROP TABLE IF EXISTS reoccuring");*/
        await pool.query("DO $$ DECLARE r RECORD; BEGIN FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = current_schema()) LOOP EXECUTE 'DROP TABLE ' || quote_ident(r.tablename) || ' CASCADE'; END LOOP; END $$;");

        await pool.query("CREATE TABLE users (user_id serial NOT NULL PRIMARY KEY ,email varchar(255) NOT NULL UNIQUE,pw_hash varchar(255) NOT NULL, auth_token varchar(255), refresh_token varchar(255))");
	const lists_name =  "dummy" + "_lists";
        await pool.query(`CREATE TABLE ${lists_name} (list_id serial NOT NULL PRIMARY KEY,title varchar(48) NOT NULL);`);
	const tasks_name = "dummy" + "_reoccurring";
        await pool.query(`CREATE TABLE ${tasks_name} (reoccurring_id serial NOT NULL PRIMARY KEY,rule_string varchar(255) NOT NULL)`);
        res.status(200).send({text: `Thank you for initializing DB today`});
    } catch (err) {
        console.error(err.message);
        res.status(500).send()
    }

})

// if none of the above defined endpoints is accessed, error 404 is thrown
app.use((req, res) => res.status(404).send());


// starting the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

