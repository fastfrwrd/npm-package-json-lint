'use strict';

const isObject = require('./../validators/type').isObject;
const isString = require('./../validators/type').isString;
const LintIssue = require('./../LintIssue');
const lintId = 'bin-type';
const nodeName = 'bin';
const message = 'Type should be either a string or an Object';
const ruleType = 'standard';

const lint = function(packageJsonData, severity) {
  if (!isString(packageJsonData, nodeName) && !isObject(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
