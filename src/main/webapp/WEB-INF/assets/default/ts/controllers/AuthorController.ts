/// <reference path="./references.ts" />
module Controllers {
    export class AuthorController extends BaseController {
        message = "Author Controller"
        authorService: Services.AuthorService;
        
        static $inject = ['$scope','$compile','logService', 'authorService','$modal']
        constructor($scope,$compile, logService:Services.LogService, authorService: Services.AuthorService,$modal) {
            super($scope,$compile,logService,$modal);
            this.authorService = authorService;         
            this.refresh();
            
        }
        searchAuthor(term) {
            this.logger.log("Searching  Authors Term= "+term);
            var that=this;
            this.authorService.searchAuthor(term,that.currentPage, function (data) { 
                that.reloadAuthorsList(data);
                that.logger.log("Search Success term"+term);    
            });
        }        
        deleteAuthor(authorid) {
            this.logger.log("Deleting Author Record"+authorid);
            var that=this;
            this.authorService.deleteAuthor(authorid,that.currentPage, function (data) { 
                that.reloadAuthorsList(data);
                that.logger.log("Delete Success Author Id"+authorid);    
            });
        }
        reloadAuthorsList(data){
            var numberOfRecords=$(data).find("#numberOfRecords").val();
            this.authorService.totalItems=numberOfRecords;
            this.authorService.nghtml=data;
             
        }
        editAuthor(authorid) {
            return this.openModal('ajax/edit/'+authorid);
        }        
        newAuthor() {
           return this.openModal('ajax/create');
        }
        openModal(templateurl){
            var parent=this;
            return this.$modal.open({
                  templateUrl: templateurl,
                  controller: AuthorModalController,
                  resolve: {
                    $parent: function () {
                      return parent;
                    }
                  }
                
             });     
        }      
        updateAuthor(formId) {
            var frm = $('#'+formId);
            var formdata = this.getFormDataAsJson(frm);
            this.logger.log("Updating Author Record");
            var that=this;
            this.authorService.updateAuthor(formdata,this.currentPage, function (data) {
                that.reloadAuthorsList(data);
                that.cancel();
                that.logger.log("Update Success ");    
            });
         
        }      

        refresh(){
            var that=this;        
             this.authorService.getAllAuthors(that.currentPage,function(data){
                that.reloadAuthorsList(data);
                that.logger.log("Refresh Successpage #"+that.currentPage);             
            });
        }
        saveAuthor(formId) {
            var frm = $('#'+formId);
            var formdata = this.getFormDataAsJson(frm);
            this.logger.log("Saving Author Record");
            var that=this;
            this.authorService.saveAuthor(formdata, function (data) { 
                var msg = "Add an other Author?";
                 that.reloadAuthorsList(data);
                 if ( window.confirm(msg) ) {
                    frm.trigger("reset");
                 }else{
                    that.cancel();
                 } 
                that.logger.log("Save Success ");    
            });
         
        }    
            

    }


}