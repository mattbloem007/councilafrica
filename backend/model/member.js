const mongoose = require('mongoose')
const schema = mongoose.Schema

const member = new schema({
  firstname: {
     type: String,
     required: true
   },
  lastname: {
     type: String,
     required: true
  },
  dateofbirth: {
     type: String
   },
   email: {
     type: String
   },
   cellno: {
     type: String
   },
   race: {
     type: String
   },
   gender: {
     type: String
   },
   country: {
     type: String
   },
   province: {
     type: String
   },
   city: {
     type: String
   },
   occupation: {
     type: String
   },
   industry: {
     type: String
   },
   education: {
     type: String
   },
   income: {
     type: String
   },
   alc_brands: {
     type: String
   },
   tob_brands: {
     type: String
   },
   intrests: {
     type: String
   },
   myshopping: {
     type: String
   },
   recruit: {
     type: String
   }
})
module.exports = mongoose.model("Member", member)