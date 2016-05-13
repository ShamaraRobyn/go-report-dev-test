(function(){
	
	//api locations
	var MQ_API_LOCATION = "http://movie-quotes-2.herokuapp.com/api/v1/quotes";
	var SQ_API_LOCATION = "http://movie-quotes-2.herokuapp.com/api/v1/quotes/";
	var RQ_API_LOCATION = "http://movie-quotes-2.herokuapp.com/api/v1/quotes/random";

	var app = angular.module('movieQuotes', []);
	
	//I don't think I even used this, oh well
	app.filter('num', function() {
	 return function(input) {
	   return parseInt(input, 10);
    		};
	});	
	
	// Controller
	app.controller('getQuote', function($scope, $http) {
		// Function to call every time we update the page data
		$scope.updateFields = function(){
			for (var i = 0; i < $scope.quotes.length; i++){
				if($scope.quotes[i].year != null){
				$scope.quotes[i].year = "(" + $scope.quotes[i].year + ")";
			}
	        $scope.quoteIdInput = $scope.quotes[0].id;
			}
		}
		// Retrieve all the quotes
		$scope.getQuotes = function(){
			$http.get(MQ_API_LOCATION)
	    	.then(function(response){
	    		$scope.quotes = response.data;
	    		$scope.updateFields();
	    	})
		}
		//Retrieve quote with ID specified in field
		$scope.getQuoteById = function(){
			$http.get(SQ_API_LOCATION+(parseInt($scope.quoteIdInput)))
	    	.then(function(response){
	    		$scope.quotes = [response.data];
	    		$scope.updateFields();
	    	})
		}
		//Retrieve quote with ID specified in field + 1
		$scope.nextQuote = function(){
			$http.get(SQ_API_LOCATION+ (parseInt($scope.quotes[0].id) + 1))
	    	.then(function(response){
	    		$scope.quotes = [response.data];
	    		$scope.updateFields();
	    	})
		}
		//Retrieve quote with ID specified in field - 1
		$scope.prevQuote = function(){
			$http.get(SQ_API_LOCATION+ (parseInt($scope.quotes[0].id) - 1))
	    	.then(function(response){
	    		$scope.quotes = [response.data];
	    		$scope.updateFields();
	    	})
		}
		//Ask api for random quote
		$scope.randomQuote = function(){
		    $http.get(RQ_API_LOCATION)
		    .then(function(response) {
		        $scope.quotes = [response.data];
		        $scope.updateFields();
		    })
	    }
	    $scope.randomQuote();
});
})();

