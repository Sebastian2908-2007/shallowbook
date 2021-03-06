const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shallowbook', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
mongoose.set('debug', true);


app.listen(PORT, () => console.log(`connected on the best port! ${PORT}`));