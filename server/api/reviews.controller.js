import ReviewsAccess from "../access/reviewsAccess.js"

export default class ReviewsController {
    static async apiPostReviews(req, res, next) {
        try {        
            const name = req.body.name
            const userId = req.body.user_id 
            const review = req.body.text            
            const date = new Date()           
            const airbnbId = req.body.airbnb_id

            const ReviewResponse = await ReviewsAccess.addReview(              
                name,
                userId,                                               
                date,
                review,
                airbnbId,
            )
            res.json( {status:'success'} )

        } catch (e) {
            res.status(500).json({ error:e.message})
        }
    }

    static async apiUpdateReviews(req, res, next) {
        try {
            const reviewId = req.body.review_id
            const text = req.body.text
            const date = new Date()
            const user_id = req.body.user_id

            const reviewResponse = await ReviewsAccess.updateReview(
                reviewId,
                user_id,
                text,                
                date,
            )

            var { error } = reviewResponse
            if (error) {
                res.status(400).json({error})
            }

            if (reviewResponse.modifiedCount === 0) {
                console.log(user_id)               
                console.log(reviewId)
                throw new Error("User != original user",)
            }
            res.json( {status:'success'} )

        } catch (e) {
            res.status(500).json({ error:e.message})
        }
    }

    static async apiDeleteReviews(req, res, next) {
        try {
            const reviewId = req.query.id
            const userId = req.body.user_id

            const reviewResponse = await ReviewsAccess.deleteReview(
                reviewId,
                userId,
            )            
            console.log(reviewId)
            console.log(userId)
            res.status(400).json({status: "sucess"})
        } catch (e) {
            res.status(500).json({ error:e.message})
        }
    }
}