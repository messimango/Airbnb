import { ObjectId } from 'mongodb';
let airbnb

export default class AirbnbAccess {
    static async injectDB(conn) {
        if (airbnb) {
            return
        }
        try {
            airbnb = await conn.db(process.env.AIRBNB_NS).collection("listingsAndReviews")
        } catch (e) {
            console.error(`no collection in airbnbaccess: ${e}`,
            )
        }
    }

    static async getAirbnb({
        page = 0,
        filters = null,
        airbnbPerPage = 10,
    } = {}) {
        let query
        if (filters) {
            if ("name" in filters) {
                query = { $text: { $search: filters["name"] }}
            } else if ("property" in filters) {
                query = { "property_type": { $eq: [filters["property_type"]] }}
            } else if ("country" in filters) {
                query = { "address.country": { $eq: filters["country"] }}
            }
        }

        let cursor
        try {
            cursor = await airbnb

            .find(query)
        } catch (e) {
            console.error(`Unable to find ${e}`)
            return { airbnbList: [], totalAirbnb: 0}
        }

        const displayCursor = cursor.limit(airbnbPerPage).skip(airbnbPerPage * page)

        try {
            const airbnbList = await displayCursor.toArray()
            const totalAirbnb =  await airbnb.countDocuments(query)

            return { airbnbList, totalAirbnb }
        } catch (e) {
            console.error(
                `Cursor not converting ${e}`,
            )
            return { airbnbList: [], totalAirbnb: 0 }
        }
    }
    
    static async getAirbnbByID(id) {
        try {
          const pipeline = [
            {
                $match: {
                    _id: id,
                },
            },
                  {
                      $lookup: {
                          from: "Reviews",
                          let: {
                              id: "$_id",
                          },
                          pipeline: [
                              {
                                  $match: {
                                      $expr: {
                                          $eq: ["$airbnb_id", "$$id"],
                                      },
                                  },
                              },
                              {
                                  $sort: {
                                      date: -1,
                                  },
                              },
                          ],
                          as: "reviews",
                      },
                  },
                  {
                      $addFields: {
                          reviews: "$reviews",
                      },
                  },
              ]
          return await airbnb.aggregate(pipeline).next()
        } catch (e) {
            console.error(`Something went wrong in getAirbnbByID: ${e}`)
            throw e
        }
    }
    
    static async getAirbnbProperty() {
        let property = []
        try {
          property = await airbnb.distinct("property_type")
          return property
        } catch (e) {
          console.error(`Unable to get property type, ${e}`)
          return property
        }
    }
    
    static async getAirbnbCountry() {
        let country = []
        try {
          country = await airbnb.distinct("address.country")
          return country
        } catch (e) {
          console.error(`Unable to get countr, ${e}`)
          return country
        }
    }  
}
