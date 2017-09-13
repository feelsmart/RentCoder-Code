app.controller('RegisterController', [ '$scope', '$controller', 'repositoryService', 'appService', 'blockUI', '$q','toaster',
    function ($scope, $controller, repositoryService, appService, blockUI, $q,toaster) {
        //$controller('BaseController', { $scope: $scope });

        //  $scope.init('HOME', 'register').then(function () {
            $scope.employer = {};
         
          //  $scope.employerPOSTURL = $scope.constants.POST_EMPLOYER_INFO;
            //this method is to add a new Employer Info
            $scope.createEployerInfo = function () {
                blockUI.start();
                repositoryService.post("/api/employer/info", $scope.employer).then(
                    function (response) {
                        console.log(response);
                        toaster.pop('success','Thank You for Registering with us, Our Support Team will contact you soon.');
                        $scope.employer = {};
                        blockUI.stop();
                    },
                    function (response) {
                        console.log(response);
                        toaster.pop('error','something went wrong');
                        blockUI.stop();
                    }
                );
            };
          
         
        // });
    }
]);
