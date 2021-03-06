'use strict';

const isValidVersionNumber = require('./../validators/format').isValidVersionNumber;
const LintIssue = require('./../LintIssue');
const lintId = 'version-format';
const nodeName = 'version';
const message = 'Format must be a valid semantic version';
const ruleType = 'standard';

const lint = function(packageJsonData, severity) {
  if (!isValidVersionNumber(packageJsonData, nodeName)) {
    return new LintIssue(lintId, severity, nodeName, message);
  }

  return true;
};

module.exports.lint = lint;
module.exports.ruleType = ruleType;
