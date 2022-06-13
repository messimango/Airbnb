import app from "./server.js";
import mongodb from 'mongodb';
import dotenv from 'dotenv';
import airbnbAccess from "./access/airbnbAccess.js";
import ReviewsAccess from "./access/reviewsAccess.js";

dotenv.config()

const MongoClient = mongodb.MongoClient

const port = process.env.PORT || 8000

MongoClient.connect(
    process.env.AIRBNBREVIEWS_DB_URI,
    {
        maxPoolSize: 20,
        wtimeoutMS: 3000,
        useNewUrlParser: true   
    })
    .catch(err => {
        console.error(err.stack)
        process.exit(1)
    })
    .then(async client => {
        await airbnbAccess.injectDB(client)
        await ReviewsAccess.injectDB(client)
        app.listen(port, () => {
            console.log(`Running on port: ${port}`)
        })
    })