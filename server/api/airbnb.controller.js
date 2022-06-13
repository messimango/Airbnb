import AirbnbAccess from "../access/airbnbAccess.js";

export default class AirbnbController {
    static async apiGetAirbnb(req, res, next) {
        const airbnbPerPage = req.query.airbnbPerPage ? parseInt(req.query.airbnbPerPage, 10) : 10
        const page = req.query.page ? parseInt(req.query.page, 10) : 0

        let filters = {}
        if (req.query.country) {
            filters.country = req.query.country;
        } else if (req.query.property) {
            filters.property = req.query.property;
        }  else if (req.query.name) {
            filters.name = req.query.name;
        }

        const { airbnbList, totalAirbnb } = await AirbnbAccess.getAirbnb({
            filters,
            page,
            airbnbPerPage,
        })

        let response = {
            airbnb: airbnbList,
            page: page,
            amount_per_page: airbnbPerPage,
            total_output: totalAirbnb,  
        }
        res.json(response)
    }

    static async apiGetAirbnbById(req, res, next) {
        try {
          let id = req.params.id || {}
          let airbnb = await AirbnbAccess.getAirbnbByID(id)
          if (!airbnb) {
            res.status(404).json({ error: "Not found" })
            return
          }
          res.json(airbnb)
        } catch (e) {
          console.log(`api, ${e}`)
          res.status(500).json({ error: e })
        }
      }
    
      static async apiGetAirbnbCountry(req, res, next) {
        try {
          let country = await AirbnbAccess.getAirbnbCountry()
          res.json(country)
        } catch (e) {
          console.log(`api, ${e}`)
          res.status(500).json({ error: e })
        }
      }

      static async apiGetAirbnbProperty(req, res, next) {
        try {
          let property = await AirbnbAccess.getAirbnbProperty()
          res.json(property)
        } catch (e) {
          console.log(`api, ${e}`)
          res.status(500).json({ error: e })
        }
      }
}
