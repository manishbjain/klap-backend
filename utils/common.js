var ObjectID = require('mongodb').ObjectID;
var constants = require('./constants');
/**
 * This function will remove all the fields which is not included in schema.
 * 
 * @param object
 *            data object
 * @param schema
 *            schema for the object to compare fields
 */
var sanitize = function(object, schema) {
	var schemaKeys = Object.keys(schema.properties);
	var objectKeys = Object.keys(object);
	var constantsValues = Object.values(constants.keys);
	for ( var key in objectKeys) {
		var isValueMatched = false;
		for ( var index in constantsValues) {
			if (constantsValues[index].indexOf(objectKeys[key].substring(0, constantsValues[index].length)) === 0) {
				isValueMatched = true;
				break;
			}
		}
		if (!isValueMatched && schemaKeys.indexOf(objectKeys[key]) === -1) {
			delete object[objectKeys[key]];
		} else {
			var propertyList = Object.keys(schema.properties[objectKeys[key]]);
			for (var index = 0; index < propertyList.length; index++) {
				if (propertyList[index] === '$ref') {
					var refValue = schema.properties[objectKeys[key]];
					var refSchema = refValue.$ref.substring(1, refValue.$ref.length);
					sanitize(object[objectKeys[key]], schemas[refSchema]);
				}
			}
		}
	}
	// logger.info(util.format('%j', object));
	return object;
};
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
	convertToObjectID: convertToObjectID,
	sanitize: sanitize
}