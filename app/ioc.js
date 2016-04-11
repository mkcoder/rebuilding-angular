var JSIOC = function () {
  var depList = {};
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
  return dep;
};

var register = function (r, fname) {
 var depHandler = new JSIOC();
 var resolved = [this];
 depHandler.registerService('$scope', function () {
    console.log('I am a $scope service.');
 });
 depHandler.registerService('$http', function () {
    console.log('I am a $http service.');
 });
 depHandler.registerService('$myService', function () {
    console.log('I am a custom service.');
 });
 var newR = depHandler.annotate(r);
 newR.forEach(function (e) {
   var handler = depHandler.hasDependency(e);
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

app = register(app, 'app');
app();
