var mongoose = require('mongoose');


var options = {
    connectTimeoutMS: 5000,
    useUnifiedTopology: true,
    useNewUrlParser: true,
}


mongoose.connect('srv://chmick:Nd15091993*@cluster0.ojslq.mongodb.net/veazit?retryWrites=true&w=majority',
    options,
    function (err) {
        if (err) {
            console.log(error, 'failed to connect to the database because');
        } else {
            console.log(' Database Veazit connection : Success ');
        }
    }
);

module.exports = mongoose