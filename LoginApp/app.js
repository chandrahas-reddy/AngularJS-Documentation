var app = angular.module('LoginApp', ["ngRoute"]);

app.config(function ($routeProvider) {

    $routeProvider
        .when("/welcome", {
            templateUrl: "views/welcome.html",
            controller: "WelcomeCtrl"
        })
        .when("/home", {
            templateUrl: "views/home.html",
            controller: "HomeCtrl"
        })
        .when("/login", {
            templateUrl: "views/login.html",
            controller: "LoginCtrl"
        })
        .when("/register", {
            templateUrl: "views/register.html",
            controller: "RegisterCtrl"
        })
        .otherwise({
            redirectTo: "/welcome"
        });
});

app.controller('WelcomeCtrl', function ($scope, $http) {


});

app.controller('HomeCtrl', function ($scope, $http, $location) {
    $scope.logout = function() {
        
        firebase.auth().signOut().then(function() {
                // Sign-out successful.
                $window.location.href = '/welcome';
                //redirection can be done either using above method or below
                //$location.path('/welcome');
        }, function(error) {
                // An error happened.
                console.log(error);
        });
    }

});

app.controller('LoginCtrl', function ($scope, $http, $location) {
    $scope.login = function(email, password) {
        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function(authData) {
              $window.location.href = '/home';
                //redirection can be done either using above method or below
                //$location.path('/home'); 
             })
             
            .catch(function(error) {
              // Handle Errors here.
              var errorCode = error.code;
              var errorMessage = error.message;
              alert(errorMessage);
            });
    }

});

app.controller('RegisterCtrl', function ($scope, $http, $location) {

    $scope.register = function (email, password) {
        
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (authData) {
                $window.location.href = '/home';
                //redirection can be done either using above method or below
                //$location.path('/home');
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage);

            });

    }
    
});