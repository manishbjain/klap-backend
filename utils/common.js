var ObjectID = require('mongodb').ObjectID;

/**
 * This function will remove all the fields which is not included in schema.
 * 
 * @param object
 *            data object
 * @param schema
 *            schema for the object to compare fields
 */
const convertToObjectID = (id) => {
	try {
		return new ObjectID(id);
	} catch (ex) {
		return "0";
	}
}

module.exports = {
    convertToObjectID: convertToObjectID
}