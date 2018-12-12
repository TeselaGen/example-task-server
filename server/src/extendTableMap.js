// Copyright (C) 2018 TeselaGen Biotechnology, Inc.

const queueManager = require("../../../src");
const _ = require("lodash");

module.exports = function extendTableMap(tableMap, opts) {
  return queueManager.extendTableMap(tableMap);
};
