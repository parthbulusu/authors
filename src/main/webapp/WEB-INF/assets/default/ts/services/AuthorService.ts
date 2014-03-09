/// <reference path="../references.ts" />
module Services {

    export class AuthorService {
        httpService: ng.IHttpService;
        static $inject = ["$http"];
        nghtml:string;
        totalItems = 0;
        constructor($http: ng.IHttpService) {
            this.httpService = $http;
        }
        getAllAuthors(currentPage,successCallback: Function): void {
            this.httpService.get('ajax/list/'+currentPage).success(function(data, status) {
                successCallback(data);
            });
        }
        updateAuthor(data,currentPage, successCallback: Function): void {
            this.httpService.post('ajax/update/'+currentPage,data).success(function(data, status) {
                successCallback(data);
            });
        }        
        saveAuthor(data, successCallback: Function): void {
            this.httpService.post('ajax/save',data).success(function(data, status) {
                successCallback(data);
            });
        }
        saveAuthorsList(data, successCallback: Function): void {
            this.httpService.post('ajax/savelist',data).success(function(data, status) {
                successCallback(data);
            });
        }        
        deleteAuthor(authorId,currentPage, successCallback: Function): void {
            this.httpService.get('ajax/delete/' + authorId+'/'+currentPage).success(function(data, status) {
                successCallback(data);
            });
        }
        searchAuthor(term,currentPage, successCallback: Function): void {
            this.httpService.get('ajax/search/' + term+'/'+currentPage).success(function(data, status) {
                successCallback(data);
            });
        }
    }
}
services.service('authorService', Services.AuthorService);