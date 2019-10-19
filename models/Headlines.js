var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var HeadlineSchema = new Schema({
  headline: {
    type: String,
    required: false
  },
  summary: {
    type: String,
    required: false
  },
   image: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required: false,
    date: { type: Date, default: Date.now },
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note",      
  },
  saved: {
    type: Boolean,
    default: false
}

});
var Headline = mongoose.model("Headline", HeadlineSchema);
module.exports = Headline;

