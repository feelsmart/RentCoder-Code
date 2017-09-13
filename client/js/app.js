// var underscore = angular.module('underscore', []);
// underscore.factory('_', ['$window', function ($window) {
//     return $window._; // assumes underscore has already been loaded on the page
// }]);

var app = angular.module('OathTechApp', ['ngRoute', 'blockUI', 'ngMaterial','cl.paging','ngTouch','ngMessages', 'ui.grid', 'ui.grid.autoResize', 'angularUtils.directives.dirPagination', 'toaster', 'ngAnimate',"smDateTimeRangePicker"]);

// configure our routes
app.config(function($routeProvider) {
    $routeProvider
        // general navigation
        // route for the home page
        .when('/', {
            templateUrl: '/views/home/register.html',
            controller: 'RegisterController'
        })
});

// configure interceptor to send add token in required requests
app.config(function($httpProvider, $windowProvider) {
    // alternatively, register the interceptor via an anonymous factory
    $httpProvider.interceptors.push(function($q, $window) {
        return {
            'request': function(config) {
                if ($window.sessionStorage.token) {
                    config.headers['x-access-token'] = $window.sessionStorage.token;
                }
                return config;
            },

            'response': function(response_config) {
                if (response_config.headers()["x-access-token"]) {
                    $window.sessionStorage.token = response_config.headers()["x-access-token"];
                    // $window.sessionStorage.token_updated_time = new Date();
                }
                return response_config;
            },
            'responseError': function(rejection) {
                if (rejection.status == 403) {
                    var i = sessionStorage.length;
                    while (i--) {
                        var key = sessionStorage.key(i);
                        sessionStorage.removeItem(key);
                    }
                    $window.location.href = "#signIn";
                    if (rejection.data.error.show_error) {
                        // setTimeout(function(){
                        // 	$('#myDuplicateLoginModal').modal('show');
                        // }, 500);
                    }
                }
                return $q.reject(rejection);
            }
        };
    });
});

app.run(function($rootScope, $location, $window, $http) {
    $http.get('./client/config/constants.json').then(function(CONSTANTS) {
        var homeUrls = new RegExp("^\/views\/home\/");
        // register listener to watch route changes
        /**
         * Summary: This listener will be called on every route change. So when user hits any URL that does not require authentication 
         * even after he has successfully logged in, we need to redirect him to his respective home page that appears once he log in. 
         * If the user hits URLs that need authentication without authentication we need to redirect him to login page. 
         */
        $rootScope.$on("$routeChangeStart", function(event, next) {
            // we need to check for array of urls to skip
            if ($window.sessionStorage.token !== undefined && homeUrls.test(next.templateUrl)) {
                $location.path(CONSTANTS.data.NAVIGATION[JSON.parse(atob($window.sessionStorage.currentLoggedInUser)).RoleGroup.toUpperCase()]);
            } else if ($window.sessionStorage.token == undefined && next.templateUrl != undefined && !homeUrls.test(next.templateUrl)) {
                // write code to redirect to login page
                $location.path("/register");
            }
        });
    })

});