var mongoose = require('mongoose');
var Schema = mongoose.Schema;
EmpSchema = new Schema({
  name : String,
  password :String
});
module.exports = mongoose.model('employees', EmpSchema);
