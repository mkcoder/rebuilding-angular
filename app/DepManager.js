var DepManager = function () {
    var DependencyManager = function () {                     
        return {
            count: 0,
            dependencyDict: {},
            add: function(key, value) {
                this.dependencyDict[key] = value;
                this.count++;
            },
            get: function(key) {
                return this.dependencyDict[key];
            },
            size: function () {
                console.log(this.count);
                return this.count;
            },
            delete: function (key) {
                delete this.dependencyDict[key];
            }
        };
   };
   var a = new DependencyManager();
   return {     
      add: function (key, value) {
        a.add(key,value);
      },
      get: function (key) {
        return a.get(key);
      },
      size: function () {
           return a.size();
      },
      remove: function (key) {
          a.delete(key);
      }
   };
};