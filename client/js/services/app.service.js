app.service('appService', ['$http','$q', function ($http,$q) {
    var app = {

        getConstants: function () {
            return $http.get('./client/config/constants.json');
        },

        getTemplateConfig: function () {
            return $http.get('./client/config/template.config.json');
        },
        getGridColumns: function (columns) {
            return $http.get('./client/config/columns.json');
        },


         getRolesList: function (URL, filters) {
            var deferred = $q.defer();
            if (filters.length > 0) {
                URL = URL + '?' + filters.join("&");
            }
            $http.get(URL)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        },


    };
    return {
        getTemplateConfig: app.getTemplateConfig,
        getConstants: app.getConstants,
        getGridColumns: app.getGridColumns,
        getRolesList : app.getRolesList
    };

}]);