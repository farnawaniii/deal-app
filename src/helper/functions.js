module.exports.convertObjectToListOfValues = (object) => {
	const map = new Map(Object.entries(object));
	return [...map.values()];
};