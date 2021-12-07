const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

// Para el fileupload
const Estudio = require('./models/Estudio');

require('./database');

// file upload
const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// File upload//


app.post('/api/upload', multipartMiddleware, (req, res) => {

  id = req.headers.id
  filename = req.files.uploads[0].path.split('\\')[1]
  Estudio.findById(id).then((e)=>{
    e.comprobanteFileName = filename
    e.save()
    console.log(e);
    res.json({
      'message': 'File uploaded successfully'
    });
  })

});
// upload fin

app.use(express.json());

app.use(cors());
app.use('/api', require('./routes/index'))
app.use('/api', require('./routes/estudios.routes'))

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


