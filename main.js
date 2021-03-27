const express = require('express')
const path = require('path')
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000


const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

express()
  .use(bodyParser.urlencoded({ extended: false }))
  .use(express.static("pages"))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/db', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM test_table');
      const results = { 'results': (result) ? result.rows : null};
      res.render('pages/db', results );
      client.release();
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .post('/submit-shit', async (req, res) => {
    try {
      var words = req.body.words;
      const client = await pool.connect();
      var rowsnumber = await client.query('SELECT COUNT(*) FROM test_table');
      var querytext = "INSERT INTO test_table values (1, '" + words + "')";
      console.log(querytext);
      client.query( querytext );
      client.release();
      res.redirect('/db');
    } catch (err) {
      console.error(err);
      res.send("Error " + err);
    }
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))