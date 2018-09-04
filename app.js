const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const history=require('connect-history-api-fallback')

const userRoutes = require('./server/api/user')
const videoRoutes = require('./server/api/video')
const commentRoutes = require('./server/api/comment')
const imageRoutes = require('./server/api/image')
const uploadRoutes = require('./server/api/upload')

const jwt_middleware = require('./server/middlewares/jwt')



const env = process.env.NODE_ENV || 'development'

let dbUrl = 'mongodb://localhost:27017/vnpastime'

mongoose.connect(dbUrl, { useNewUrlParser: true });
mongoose.Promise = global.Promise

const app = express();

app.use(cors());
app.set('tokenSecret', 'mattxu_tomato');
app.use(bodyParser.json())

app.use('/auth', userRoutes)
app.use(jwt_middleware)
app.use('/api', videoRoutes)
app.use('/api', imageRoutes)
app.use('/api', commentRoutes)
app.use('/api', uploadRoutes)

app.use(history())

app.use((err, req, res, next) => {
  res.status(442).send({
    error: err
  });
})


const server = app.listen(4001, () => {
  console.log(`Express started in ${app.get('env')} mode on http://localhost:4001`);
})
