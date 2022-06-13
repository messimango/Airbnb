import { ObjectId } from 'mongodb';
let reviews

export default class ReviewsAccess {
  static async injectDB(conn) {
    if (reviews) {
      return
    }
    try {
      reviews = await conn.db(process.env.AIRBNB_NS).collection("Reviews")
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addReview(name, userId, date, review, airbnbId) {
    try {
      const reviewDoc = { 
          name: name,
          user_id: userId,
          date: date,
          text: review,          
          airbnb_id: airbnbId, }

      return await reviews.insertOne(reviewDoc)
    } catch (e) {
      console.error(`Unable to post review: ${e}`)
      return { error: e }
    }
  }

  static async updateReview(reviewId, user_id, text, date) {
    try {
      const updateResponse = await reviews.updateOne(
        { user_id: user_id, review_id: reviewId},
        { $set: { text: text, date: date  } },
      )

      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

  static async deleteReview(reviewId, userId) {

    try {
      const deleteResponse = await reviews.deleteOne({
        _id: reviewId,
        user_id: userId,
      })
      console.log(_id)
      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }

}