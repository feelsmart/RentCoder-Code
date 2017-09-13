app.controller('BaseController', ['$scope', 'appService', '$q',  'toaster',  'blockUI', '$location',
    function ($scope, appService, $q,  toaster,  blockUI, $location) {

        if (window.sessionStorage.token == undefined || window.sessionStorage.token == "") {
            $scope.currentLoggedInUser = {
                UserID: "",
                Email: "",
                UserName: "",
                ProfileImage: "",
                EnterpriseID: "",
                RoleID: "",
                RoleGroupID: ""
            };

            $scope.currentResident = {
                ResidentID: ""
            };
        }
        // $scope.currentResident='';
        // $scope.residentprovider='';
        $scope.init = function (resource, activeMenu) {
            var deferred = $q.defer();
            $scope.subMenu = false;

           

            return deferred.promise;
        };


    }
]);
