use 'strict';

// IOC.js
var IOC = (function () {
    var arrayList = (fucntion () {
                     
                     var dependencyDict = {};
                     
                     function add(key, value) {
                        dependencyDict[key] = value;
                     }
                     
                     })();
    
    
})();



var JSIOC = function () {
  var dep = {
    add: function(key, value) {
       this.depsList[key] = value;
    },
    hasDependency: function (prop) {
      if ( this.depsList[prop] !== undefined )
        {
          return this.depsList[prop];
        }
    },
    annotate: function (f) {
      var regex = /(\(.+\))/igm;
      var match = f.toString().match(regex)[0];
      var requestedDepList = match.substring(1, match.length-1).split(",");
      requestedDepList.forEach(function (e, i) {
        requestedDepList[i] = e.trim();       
      });
      return requestedDepList;      
    },
    depsList: {},
    registerService: function (serviceName, fn) {      
      this.add(serviceName, fn);
    }
  };
 {
    registerService: dep.add,
    resolve: function () {
        
        
    };
  };
    
 return dep;
};



var register = function (r, fname, ioc) { 
 // a list of resolved deps 
 var resolved = [this];
 // register our own services
 ioc.registerService('$scope', function () {
    console.log('I am a $scope service.');
     return '$scope';
 }); 
 ioc.registerService('$http', function () {
    console.log('I am a $http service.');
     return '$http';
 });
// get a list of requested deps in the function r
 var newR = ioc.annotate(r);
// resolve everything and bind it to the function r
 newR.forEach(function (e) {
   var handler = ioc.hasDependency(e);
   if ( handler !== undefined ) {
     resolved.push(handler);
   }
 });       
 return this[fname].bind.apply(this[fname], resolved);
};



var app = function($scope, $http, $myService) {
  $scope();
  $http();
  $myService();
};
// create a IOC container
var IOC = new JSIOC();
IOC.registerService('$myService', function () {
   console.log('i am a custom service!');
});
app = register(app, 'app', IOC);
app();
