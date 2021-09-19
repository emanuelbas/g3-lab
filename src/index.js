const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

require('./database');

app.use(express.json());

app.use(cors());
app.use('/api', require('./routes/index'))

// Serve static files
app.use(express.static(__dirname + '/client/frontend/dist/frontend'));

// Send all requests to index.html
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/frontend/dist/frontend/index.html'));
});

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})

//app.listen(3000);
//console.log('Server on port', 3000);


