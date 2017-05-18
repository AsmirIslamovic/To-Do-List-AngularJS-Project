var app = angular.module("TodoList", ['ngStorage']);
app.controller("Controller",["$scope","$localStorage",
	function($scope,$localStorage) {
		
		$scope.items = [];
		$scope.id = 0;
		$scope.error = "";
		if($localStorage.items){
			$scope.items = $localStorage.items;
			$scope.id = $localStorage.id;
		} 
		console.log(JSON.stringify($scope.items));
		setInterval(function(){
			$localStorage.items = $scope.items;
			$localStorage.id = $scope.id;
		},5000);
		
		$scope.addItem = function() {
			if(!$scope.newTitle){
				$scope.error = "You need to provide a title.";
			} else if(!$scope.newDetails){
				$scope.error = "You need to prodive details.";
			} else if(!$scope.newDate){
				$scope.error = "You need to provide a date.";
			} else {
				$scope.items.push({"id":$scope.id,
					"title":$scope.newTitle,
					"detail":$scope.newDetails,
					"isDone":false,
					"date":$scope.newDate.toLocaleDateString(),
					"showDetails":false});
				$scope.id++;
			}
		}
		$scope.mark = function(id) {
			for(var i=0;i < $scope.items.length;i++) {
				if($scope.items[i].id == id){
					$scope.items[i].isDone = !$scope.items[i].isDone;
				}
			}
		}

		$scope.removeItem = function(id) {
			if(confirm("Are you sure you want to delete this item?")){
				for(var i=0;i < $scope.items.length;i++) {
					if($scope.items[i].id == id){
						var x = $scope.items.indexOf($scope.items[i]);
					}
				}
				$scope.items.splice(x,1);
			}
		}

		$scope.showDetail = function(x) {
			for(var i=0;i < $scope.items.length;i++) {
				if($scope.items[i].id == x){
					$scope.items[i].showDetails = !$scope.items[i].showDetails;
				} else {
					$scope.items[i].showDetails = false;
				}
			}
		}
	}]);