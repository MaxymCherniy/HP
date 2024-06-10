import mongoose from "mongoose";

const Get = new mongoose.Schema({
	name: {type: String},
	alternate_names: {type: String},
	house: {type: String},
	dateOfBirth: {type: String}
})


export default mongoose.model('Get', Get);