angular.module('app').factory('apiUser', ['$resource', function($resource){
	return{
		getData: getData
	};
	
	function getData(){
		var Users =  $resource('/api/data');
		var users = Users.query();
		
		return users.$promise;
	}
}]);