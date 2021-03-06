'use strict';

/* eslint class-methods-use-this: 'off' */

const fs = require('fs');
const stripComments = require('strip-json-comments');

/**
 * Require JavaScript file
 *
 * @param  {String} fileName String file path of file to load
 * @return {Object}          Config object from file.
 * @throws {Error}           If the file cannot be read.
 */
const requireFile = function(fileName) {
  return require(fileName);
};

/**
 * Sychronously reads file from file system
 *
 * @param  {String} fileName String file path of file to load
 * @return {String}          File contents with BOM removed.
 * @throws {Error}           If the file cannot be read.
 */
const readFile = function(fileName) {
  return fs.readFileSync(fileName, 'utf8').replace(/^\ufeff/, '');
};

/**
 * Helper method for throwing errors when file fails to load.
 *
 * @param {String} fileName Name of the file that failed to load.
 * @param {Object} err      Error object
 * @returns {Undefined} No return
 * @throws {Error}
 */
const handleError = function(fileName, err) {
  throw new Error(`Failed to read config file: ${fileName}. \nError: ${err.message}`);
};

/**
 * Public Parser class
 * @class
 */
class Parser {

  /**
   * Parse a JSON file
   *
   * @param  {String} fileName String file path of file to load
   * @return {Object}          Valid JavaScript object
   * @static
   */
  static parseJsonFile(fileName) {
    let json = {};

    try {
      const fileContents = readFile(fileName);

      json = JSON.parse(stripComments(fileContents));
    } catch (err) {
      handleError(fileName, err);
    }

    return json;
  }

  /**
   * Parse a JavaScript file
   *
   * @param  {String} fileName String file path of file to load
   * @return {Object}          Valid JavaScript object
   * @static
   */
  static parseJavaScriptFile(fileName) {
    let obj = {};

    try {
      obj = requireFile(fileName);
    } catch (err) {
      handleError(fileName, err);
    }

    return obj;
  }

}

module.exports = Parser;
