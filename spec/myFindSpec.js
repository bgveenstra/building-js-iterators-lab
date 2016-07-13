/* This is the test file for myFind function
 *    PLEASE DO NOT EDIT THIS FILE
 * To run these tests do `mocha spec/myFindSpec.js`
*/

var mocha = require('mocha');
var chai = require('chai');
var spies = require('chai-spies');
chai.use(spies);

var expect = chai.expect;
chai.config.includeStack = false; // turn off stack trace
chai.config.showDiff = true; // turn on reporter diff display

var myFind = require('../exercises/myFind');

describe('myFind', function() {
  // sample data
  beforeEach(function() {
    testArr = ['a', 'b', 'c', 'd'];
  });

  it("takes a function as the second argument and calls that function (callback)", function testCallback() {
    function spyOnMe() {}
    var spy = chai.spy(spyOnMe);
    myFind(testArr, spy);
    expect(spy).to.have.been.called();
  });

  it("passes each value in the array to the callback", function testEachItem(){
    var resultingArray = [];
    myFind(testArr, function(item) {
      resultingArray.push(item);
      return false;
    });
    // compare elements in the result to expected array
    console.log('       results: ', resultingArray);
    expect(resultingArray).to.have.members(['a', 'b', 'c', 'd']);
  });


  it("passes each index in the array to the callback as argument 2", function testEachIndex() {
    var resultingArray = [];
    myFind(testArr, function(_item, index) {
      resultingArray.push(index);
      return false;
    });
    // compare elements in the result to expected array
    console.log('       results: ', resultingArray);
    expect(resultingArray).to.have.members([0, 1, 2, 3]);
  });


  it("passes the entire array to the callback as the 3rd argument", function testArrayPassing() {
    var resultingArray = [];
    myFind(testArr, function(_item, _index, arr) {
      console.log('       results: ', arr);
      // each time the callback is called verify that the array is as expected
      // Note: until the callback is called though, this test will still pass
      expect(arr).to.have.members(['a', 'b', 'c', 'd']);
    });
  });

  it("returns an element from the array if one matches (if callback is true)", function() {
    var result = myFind(testArr, function(_item, index, _arr) {
      return index === 2;
    });
    console.log('       result: ', result);
    expect(result).to.be.oneOf(testArr);
  });


  it("returns the first matching element if there are multiple matches", function() {
    var result = myFind(testArr, function(_item, index, _arr) {
      return index === 2 || index === 1;
    });
    console.log('       result: ', result);
    expect(result).to.equal(testArr[1]);
  });


  it("returns undefined if there are no matches", function() {
    var result = myFind(testArr, function(_item, _index, _arr) {
      return false;
    });
    console.log('       result: ', result);
    expect(result).to.be.undefined;
  });

});
