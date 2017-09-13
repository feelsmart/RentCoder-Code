app.service('repositoryService', ['$http', '$q', function ($http, $q) {
    var repository = {
        get: function (URL) {
            var deferred = $q.defer();
            $http.get(URL)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        },
        post: function (URL, data) {
            var deferred = $q.defer();
            $http.post(URL, data)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        },

        put: function (URL, data) {
            var deferred = $q.defer();
            $http.put(URL, data)
                .success(function (data) {
                    deferred.resolve(data);
                })
                .error(function (data) {
                    deferred.reject(data);
                });
            return deferred.promise;
        },
        getWithFilter: function (URL, filters) {
            var deferred = $q.defer();
            if (filters && filters.length > 0) {
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
    }
    return {
        get: repository.get,
        post: repository.post,
        put: repository.put,
        getWithFilter: repository.getWithFilter,
     };
}])