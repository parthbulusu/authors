/// <reference path="./references.ts" />
module Controllers {
    export class BaseController {
        message = "Welcome to PAL";
        logger: Services.LogService;
        $scope: any;
        $compile: any;
        $modal: any;
        $modalInstance: any;
        $http:any;
        totalItems = 0;
        currentPage = 1;
        pageSize = 10;      
        numPages=10;
        nghtml="Empty List"
        private test:any;
        static $inject = ['$scope', '$compile', 'logService', '$modal'];
        constructor($scope, $compile, logService: Services.LogService, $modal) {
            $scope.vm = this;
            logService.log("Scope Variable injected");
            this.logger = logService;
            this.$scope = $scope;
            this.$compile = $compile;
            this.$modal = $modal;
        }
        getFormDataAsJson(form){
           
            var o = {};
            var a = form.serializeArray();
            $.each(a, function() {
                if (o[this.name] !== undefined) {
                    if (!o[this.name].push) {
                        o[this.name] = [o[this.name]];
                    }
                    o[this.name].push(this.value || '');
                } else {
                    o[this.name] = this.value || '';
                }
            });
            return o;          
        } 
      
        cancel(){
            alert("Not a Modal");
        }
        refresh(){
            alert("implement reload");
        }
        setPage(pageNo){
            
            this.currentPage=pageNo;
            this.refresh();
        }
    }


}