var studentApp = angular.module('shenkarStudents',["ui.router"]);

studentApp.config(function($stateProvider, $urlRouterProvider){

	$urlRouterProvider.otherwise("/");

	$stateProvider.
    state('allExcels', {
		url: "/",
		templateUrl: './templates/studentView.html',
        controller: 'allExcelStudents'
	 }).
    state('yearExcels', {
        url: "/year",
        templateUrl: './templates/chooseYear.html',
    }).
        state('yearExcels.year', {
            url: "/:year",
            templateUrl: './templates/studentView.html',
            controller: 'excelsByYear'
        }).
    state('specificStudents', {
        url: "/specific/",
        templateUrl: './templates/chooseId.html',
        controller: 'checkId'
    }).
        state('specificStudents.id', {
            url: '/:studentId',
            templateUrl: './templates/studentView.html',
            controller: 'excelById'
    })
});

studentApp.controller('allExcelStudents', function($scope, $http) {
        $http.get('https://studentsgrades1905.herokuapp.com/excel' ).success(function(data) {
            $scope.excelStudents = data;

        })
})

studentApp.controller('excelsByYear', function($scope, $http, $stateParams) {
    $http.get('https://studentsgrades1905.herokuapp.com/excel/' + $stateParams.year).success(function(data) {
        $scope.excelStudents = data

    })
})

studentApp.controller('checkId', function($scope) {
    $scope.validate = function(id) {
        console.log('idddd');

        if (!id) {//in case the id parametr is empty
            console.log('test');
            window.event.preventDefault();
        }
    }
})

studentApp.controller('excelById', function($scope, $http, $stateParams) {
    $http.get('https://studentsgrades1905.herokuapp.com/specific/' + $stateParams.studentId).success(function(data) {
        $scope.excelStudents = data;
    })
})
