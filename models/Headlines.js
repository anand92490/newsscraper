const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HeadlineSchema = new Schema({
    title:  String,
    link: String,
    date: { type: Date, default: Date.now },
    note: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note",
            type: Date, default: Date.now 
        }
    ],
    saved: {
		type: Boolean,
		default: false
	},

});

const Headline = mongoose.model("Headline", HeadlineSchema);

module.exports = Headline;