const express = require('express')
const app = express()
const port = 3000
app.use(express.json())

// Setup the DB
var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database(':memory:')

// list of people, gender, age, name, email, address
db.serialize(function () {
    // Add additional DB setup inside this function
    db.run('CREATE TABLE score_data (name TEXT, score INT)')
    var stmt = db.prepare('INSERT INTO score_data VALUES (?, ?)')

    data = [['Kyle', 1], ['Danny', 5], ['Drew', 0], ['Duane', 1], ['Jacob', 2], ['Michael', 2]];
    data.forEach(x => {
        stmt.run(x[0], x[1])
    });


    stmt.finalize()

    db.each('SELECT rowid AS id, name, score FROM score_data', function (err, row) {
        //console.log(row.id + ': ' + row.info)
        console.log(row)
    })

    db.run('CREATE TABLE people_data (first_name TEXT, last_name TEXT, gender TEXT, age INT)')
})

//aggregates gender data
app.get('/countGender', (req, res) => {
    db.all('SELECT gender, COUNT(gender) as total FROM people_data GROUP BY gender', (err, rows) => {
        if (err) {
            console.log('DB Error ', err);
            res.send('[]')
        } else {
            //format to chart.js input
            const labels = [];
            const dataset = {
                data: [],
                backgroundColor: []
            };
            rows.forEach(row => {
                labels.push(row.gender);
                dataset.data.push(row.total);
                dataset.backgroundColor.push(row.gender.toLowerCase() === 'male' ? '#26c6da' : '#ef5350');
            });

            const result = {
                labels: labels,
                datasets: [dataset]
            };
            res.json(result);
        }
    })
});

//inserts a row into the people_data table
app.post('/addPerson', (req, res) => {
    console.log(req.body)
    db.run("INSERT INTO people_data ('first_name', 'last_name', 'gender', 'age') VALUES (?, ?, ?, ?)", [req.body.firstName, req.body.lastName, req.body.gender, req.body.age], function (err, row) {
            if (err) {
                res.json(false)
            } else {
                res.json(true)
            }
        }
    )
})

app.get('/getPeople', (req, res) => {
    db.all('SELECT * FROM people_data', function (err, rows) {
        if (err) {
            console.log('DB Error ', err)
            res.json([]);
        } else {
            res.json(rows)
        }
    })
})

// app.get('/', (req, res) => res.send('Hello World!'))
app.get('/', (req, res) => res.redirect('/index.html'))
app.get('/scores', (req, res) => {
    db.all('SELECT rowid as id, name, score from score_data', (err, rows) => {
        if (err) {
            console.log('DB Error ', err)
            // send an empty list to not error out the client that is expecting json
            res.send('[]')
        } else {
            res.send(JSON.stringify(rows))
        }
    })
});

app.use(express.static('frontend/dist/'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// db.close()
