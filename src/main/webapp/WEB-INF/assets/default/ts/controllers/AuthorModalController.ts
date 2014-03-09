/// <reference path="./references.ts" />
module Controllers {
    export class AuthorModalController extends AuthorController {
        $modalInstance: any;
        $parent: any;
        static $inject = ['$scope','$compile','logService', 'authorService','$modal','$modalInstance','$parent']
        constructor($scope,$compile, logService:Services.LogService, authorService: Services.AuthorService,$modal,$modalInstance,$parent) {
            super($scope,$compile,logService,authorService,$modal);
            this.$modalInstance = $modalInstance;
            this.$parent = $parent;
            //Uodate needs to stay in the same page. Not go back to the first page
            this.currentPage=$parent.currentPage;
            
        } 
        cancel() {
            this.$modalInstance.dismiss('cancel');
        } 
        refresh(){
            // Do not refresh data
        }
        reloadAuthorsList(data){
            var numberOfRecords=$(data).find("#numberOfRecords").val();
            this.$parent.totalItems=numberOfRecords;
            this.$parent.nghtml=data;
        }            
           
    }
}