const mysql = require('mysql');
const express = require('express');
const cors = require('cors');

const connection = mysql.createConnection({
	host: 'localhost',
	database: 'chile',
	user: 'root',
	password: ''
});

const app = express();
app.use(cors());

connection.connect((error) => {
	if (error) {
		throw error;
	} else {
		console.log('Connection Succeful!');
	}
})


app.get('/api/regions', (req, res) => {
	connection.query('SELECT * FROM regions', (error, results, fields) => {
		if (error) {
			throw error;
		}

		res.json(results);
	});
});

app.get('/api/communes/:region_id', (req, res) => {
  const region_id = req.params.region_id;
  connection.query('SELECT * FROM communes WHERE region_id = ?', [region_id], (error, results, fields) => {
    if (error) {
      throw error;
    }

    res.json(results);``
  });
});

app.listen(15000, () => {
	console.log('Server is running on port 15000');
});

