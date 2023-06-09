const { BadRequestError } = require("../expressError");

/**
 * Helper for making selective update queries.
 *
 * The calling function can use it to make the SET clause of an SQL UPDATE
 * statement.
 *
 * @param dataToUpdate {Object} {field1: newVal, field2: newVal, ...}
 * @param jsToSql {Object} maps js-style data fields to database column names,
 *   like { firstName: "first_name", age: "age" }
 *
 * @returns {Object} {sqlSetCols, values}
 *
 * @example {firstName: 'Aliya', age: 32} =>
 *   { setCols: '"first_name"=$1, "age"=$2',
 *     values: ['Aliya', 32] }
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) {
    throw new BadRequestError("No data");
  }

  const setCols = [];
  const values = [];

  for (let key of keys) {
    setCols.push(`"${jsToSql[key] || key}"=$${values.length + 1}`);
    values.push(dataToUpdate[key]);
  }

  return {
    setCols: setCols.join(", "),
    values: values,
  };
}

module.exports = { sqlForPartialUpdate };

