let app = require('express')(),
    http = require('http').Server(app),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    // Loading socket.io
    io = require('socket.io')(http)
    // ObjectId = require('mongodb').ObjectID;

let Sport = require('./models/Sport')

let port = process.env.PORT || 9005,
    mongoString = 'mongodb://user:user@ds119080.mlab.com:19080/observables'

mongoose.Promise = Promise

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

// -------------------- SPORTS ---------------------------------
app.get('/sports', async (req, res) => {
    let sports = await Sport.find({})

    return res.status(200)
        .send(sports)
})

app.post('/sport', (req, res) => {
    var sportData = req.body;
    console.log('sportData', sportData)

    var sport = new Sport(sportData)
    console.log('sport', sport)

    sport.save((err, result) => {
        if (err) {
            console.error(`ERROR: ${err}`)
            return res.status(401)
                .send({
                    message: 'Could not save the sport...'
                })
        }
        io.emit('sport', sport)
        console.log('io.emit sport: ' + sport);

        return res.status(200)
            .send(sportData)
    })
})

app.delete('/sport/:id', async (req, res) => {
    let reqId = req.params.id
    let sport = await Sport.findByIdAndRemove(reqId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });
        }

        io.emit('delete', reqId)
        console.log('io.emit delete: ' + reqId);

        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.id
        });
    });
    // var sportData = req.body;
    // let objectId = new ObjectId(sportData._id)
    // console.log('sportData', sportData)

    // let all = await Sport.find({})
    // let allBut = all.filter((x => x.id == sportData._id))
    // console.log('allBut', allBut[0])

    // if(allBut)
    // console.log('tak tak tak', allBut[0])
    // let reqId = req.params.id
    // let sport = await Sport.findById(reqId)
    //     // {
    //     // _id: sportData._id
    // // })
    // console.log(reqId, sport)
/*
    if (sport) {
        console.log('tak', sport)
    }

    if (!sport) {
        console.log(false, sport)
        return res.status(401)
            .send({
                message: "This sport doesn't exist."
            })
    }

    let removedSport = sport
*/
    // return res.status(200)
    //     .send({
    //         'removedSport': 'si'//removedSport
    //     })
})

// -------------------- ..... ---------------------------------

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });



    socket.on('message', (message) => {
        wrappedMsg = 'wrapped: *** ' + message
        message = wrappedMsg
        io.emit('message', {
            type: 'new-message',
            text: message
        });
    });
});

mongoose.connect(mongoString, (err) => {
    let _name = mongoString.split('/'),
        dbName = _name[_name.length - 1]
    if (!err)
        console.log(` ===> connected to mLab db: ${dbName} <===`)
})

http.listen(port, () => {
    console.log("I'm listening at " + port)
});