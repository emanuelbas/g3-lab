const express = require('express');
const app = express();
const cors = require('cors');

require('./database');

app.use(express.json());

app.use(cors());
app.use('/api', require('./routes/index'))


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})

//app.listen(3000);
//console.log('Server on port', 3000);


