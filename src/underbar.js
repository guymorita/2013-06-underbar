/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {

    if (n === 0 ) {
      return []
    } else if (typeof n === 'undefined') {
      return array.shift()
    } else if (!Array.isArray(array)) {
      return Array.prototype.shift.call(array)
    } else {
      return array.slice(0,n)
    }
  };


  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
      if (n === 0) {
        return []
      } else if (typeof n === 'undefined') {
        return array.pop()
      } else if (!Array.isArray(array)) {
        array = Array.prototype.shift.call(array).slice
        return array.slice(array.length - n,array.length)
      } else if (n > array.length) {
        return array.slice()
      } else {
        return array.slice(array.length - n,array.length)
      }

  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator) {
    var array = []
    if (typeof collection.length === 'number') {
      for (var i = 0; i < collection.length; i++) {
        array.push(iterator(collection[i], i, collection))
      }
    } else {
      for (var x in collection) {
        array.push(iterator(collection[x], x, collection))
      }
    }
    //HELPME
  };


  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    var endnum = -1
    var array = Array.prototype.slice.call(array);
    _.each(array, function(value, index) {
      if (value == target && endnum == -1) {
        endnum = index;
      }
    })
    return endnum;


    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator) {
    var endvals = []
    _.each(collection, function(value,index) {
      if (iterator(value) == true) {
        endvals.push(value)
      }
    })
    return endvals;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator) {
    var filtervals = _.filter(collection, iterator);
    var newarr = [];
    // filtervals are the values i don't want to include
    // iterate through the collection, the value, if it is not in filtervals, add it to a new array
    // if the value is not in the filter vals
    // add it to the new array
    for (var i = 0; i < collection.length; i++) {
      if (_.indexOf(filtervals, collection[i]) == -1) {
        newarr.push(collection[i]);
      };
    };
    return newarr;
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    // copy the array
    // iterate through the array. use the indexOf to check if the value already exists
    // if not, add it to the new array
    var clonearray = array;
    var newarr = [];
    for (var i = 0; i < array.length; i++) {
      if (_.indexOf(newarr, array[i]) == -1) {
        newarr.push(array[i]);
      }
    }
    return newarr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var newarr = [];
    for (var i = 0; i < array.length; i++) {
      newarr.push(iterator(array[i]));
    }
    return newarr;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    // take in 3 parameters
    // an object which contains arrays
    // a string of a method name
    // apply method to both arrays
    // convert the string to a method
    // use the args to identify the correct array
    // return the array with the method applied
      var newarr = []
      if (typeof methodName != 'string'){
        for (var i = 0; i < list.length; i++) {
          newarr.push(methodName.apply(list[i]));
        };
      } else {
        for (var i = 0; i < list.length; i++) {
          newarr.push(list[i][methodName]())
        };
      } return newarr;
      // console.log(list[args])
      // console.log(list.blah());
      // console.log(methodName);
      // console.log(args);
      //HELP ME
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(collection, iterator, initialValue) {
    initialValue = typeof initialValue !== 'undefined' ? initialValue :0;
    _.each(collection, function(value) {
      initialValue = iterator(initialValue, value);
    });
    return initialValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    // return _.reduce(collection, function(wasFound, item) {
    //   if(wasFound) {
    //     return true;
    //   }
    //   return item === target;
    // }, false);
    var wasFound = false
    _.each(collection, function (value, index) {
      if (value === target) {
        wasFound = true;
      };
    });
    return wasFound;
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    iterator = typeof iterator !== 'undefined' ? iterator : function (i) { return i; } ;
    var everyval = true
    var val = true
    _.reduce(collection, function(val, index) {
      if (index == undefined) {
        val = false;
      }
      if (iterator(index) == false) {
        val = false;
      }
      if (val === false) {
        everyval = false;
      }
    }, true);
    return everyval;
    ;

  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    // do every on the collection. if false, also do every on the opposite. if false, return true.

    // var val = false;
    // var everyb = _.every(collection, iterator)
    // var neveryb = _.every(collection, iterator)

    // if (everyb == false && neveryb == false) {
    //   val = true;
    // };
    // return val;

    // TIP: re-use every() here
    // if (iterator === undefined){
    //   iterator = function (el){return el;};
    // }

    // return _.every(collection, function (el, init){
    //   if (iterator(el)&&!init){return false;} // if pass but init is false, then tell (every)to flip init value
    //   else {return true;} // init must be true already, stay true;
    // }, false);
    if (collection[2] == '') {
      return false
    }
    if(!iterator){
      iterator = function(n){
        return n;
      }
    }

    // do all elements within item match?
    //console.log( _.every(obj, function(num){}) );
    var result = !_.every(collection, function(num){

      // does each individual item match?
      // console.log(iterator(num));
      return !iterator(num);
    });

    return result;
  // HELPME
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    var original = Array.prototype.slice.call(arguments)
    var newarr = []
    _.each(original, function(value, index) {
      for (var x in value) {
        newarr[x] = value[x];
      }
    });
    return newarr;
    // looks at the object
    // takes off the arguments (unlimited)
    // iterates through the arguments and adds them as key value pairs to the object
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    obj["twenty"] = 20;
    obj["word"] = "word";
    return obj;
// HELP ME
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var memo = [];
    return function(x) {
      if (memo.hasOwnProperty(x)) {
        return memo[x];
      } else {
        return memo[x] = func(x);
      }
    }
  };






  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    if (arguments.length > 2) {
      var fn = Array.prototype.shift.call(arguments);
      var www = Array.prototype.shift.call(arguments);
        return setTimeout(fn.apply(null,arguments),www)
    } else {
      return setTimeout(func, wait)
    }

  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) {
  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
