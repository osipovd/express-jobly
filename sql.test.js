const { sqlForPartialUpdate } = require("./sql");

describe("sqlForPartialUpdate", function () {
  test("works: 1 item", function () {
    const dataToUpdate = { f1: "v1" };
    const jsToSql = { f1: "f1", fF2: "f2" };
    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
    const expected = {
      setCols: "\"f1\"=$1",
      values: ["v1"],
    };
    expect(result).toEqual(expected);
  });

  test("works: 2 items", function () {
    const dataToUpdate = { f1: "v1", jsF2: "v2" };
    const jsToSql = { jsF2: "f2" };
    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);
    const expected = {
      setCols: "\"f1\"=$1, \"f2\"=$2",
      values: ["v1", "v2"],
    };
    expect(result).toEqual(expected);
  });
});


