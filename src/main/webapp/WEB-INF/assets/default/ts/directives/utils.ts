/// <reference path="../references.ts" />
directives .directive('compile', ['$compile', function ($compile) {
      return function(scope, element, attrs) {
          scope.$watch(
            function(scope) {
               // watch the 'compile' expression for changes
              return scope.$eval(attrs.compile);
            },
            function(value) {
              // when the 'compile' expression changes
              // assign it into the current DOM
              element.html(value);

              // compile the new DOM and link it to the current
              // scope.
              // NOTE: we only compile .childNodes so that
              // we don't get into infinite loop compiling ourselves
              $compile(element.contents())(scope);
            }
        );
    };
}]);
directives.directive('searchText',function(){
        return {
            restrict: 'A',
            link: function($scope, element, attributes){
                element.bind('keydown',function(){$scope.keyDown()});
                element.bind('focus',function(){$scope.start()});
                element.bind('blur',function(){$scope.stop()});                
            },
            controller: function($scope, $element, $attrs,$timeout) {
                $scope.counter = 0;
                $scope.mytimeout=0;
                $scope.keypressed=false;
                $scope.onTimeout = function(){
                    var term=$element.val();
                    $scope.counter++;
                    $scope.mytimeout = $timeout($scope.onTimeout,1000);
                    if($scope.counter==$attrs.interval){
                         $scope.reset();
                        if(term.length>$attrs.minLength && $scope.keypressed)
                        {
                            //cannot hard code get it from attrs and execute this
                            $scope.vm.searchAuthor(term);
                            $scope.keypressed=false;
                        }
                    }
                }
                $scope.keyDown = function(){
                    $scope.reset();
                    $scope.keypressed=true;        
                }
                $scope.stop = function(){
                    $scope.counter = 0;
                    $timeout.cancel($scope.mytimeout);
                }   
                $scope.reset = function(){
                    $scope.counter = 0;
                }
                $scope.start = function(){
                    $scope.mytimeout=$timeout($scope.onTimeout,1000);
                }             
            }

        }
    });