/// <reference path="../references.ts" />
var Services;
(function (Services) {
    var AuthorService = (function () {
        function AuthorService($http) {
            this.totalItems = 0;
            this.httpService = $http;
        }
        AuthorService.prototype.getAllAuthors = function (currentPage, successCallback) {
            this.httpService.get('ajax/list/' + currentPage).success(function (data, status) {
                successCallback(data);
            });
        };
        AuthorService.prototype.updateAuthor = function (data, currentPage, successCallback) {
            this.httpService.post('ajax/update/' + currentPage, data).success(function (data, status) {
                successCallback(data);
            });
        };
        AuthorService.prototype.saveAuthor = function (data, successCallback) {
            this.httpService.post('ajax/save', data).success(function (data, status) {
                successCallback(data);
            });
        };
        AuthorService.prototype.saveAuthorsList = function (data, successCallback) {
            this.httpService.post('ajax/savelist', data).success(function (data, status) {
                successCallback(data);
            });
        };
        AuthorService.prototype.deleteAuthor = function (authorId, currentPage, successCallback) {
            this.httpService.get('ajax/delete/' + authorId + '/' + currentPage).success(function (data, status) {
                successCallback(data);
            });
        };
        AuthorService.prototype.searchAuthor = function (term, currentPage, successCallback) {
            this.httpService.get('ajax/search/' + term + '/' + currentPage).success(function (data, status) {
                successCallback(data);
            });
        };
        AuthorService.$inject = ["$http"];
        return AuthorService;
    })();
    Services.AuthorService = AuthorService;
})(Services || (Services = {}));
services.service('authorService', Services.AuthorService);
