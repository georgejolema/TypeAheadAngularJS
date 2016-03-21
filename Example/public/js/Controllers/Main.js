angular.module('app').controller('MainController', ['$scope', 'apiUser', function ($scope, apiUser)
{
    $scope.items = null;
	apiUser.getData().then(function(data){
		$scope.items=data;
	});
    $scope.filters = "enabled";
    $scope.disableFilter = function ()
    {
        $scope.filters = "";
    }
}]);