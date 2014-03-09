var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="./references.ts" />
var Controllers;
(function (Controllers) {
    var AuthorController = (function (_super) {
        __extends(AuthorController, _super);
        function AuthorController($scope, $compile, logService, authorService, $modal) {
            _super.call(this, $scope, $compile, logService, $modal);
            this.message = "Author Controller";
            this.authorService = authorService;
            this.refresh();
        }
        AuthorController.prototype.searchAuthor = function (term) {
            this.logger.log("Searching  Authors Term= " + term);
            var that = this;
            this.authorService.searchAuthor(term, that.currentPage, function (data) {
                that.reloadAuthorsList(data);
                that.logger.log("Search Success term" + term);
            });
        };
        AuthorController.prototype.deleteAuthor = function (authorid) {
            this.logger.log("Deleting Author Record" + authorid);
            var that = this;
            this.authorService.deleteAuthor(authorid, that.currentPage, function (data) {
                that.reloadAuthorsList(data);
                that.logger.log("Delete Success Author Id" + authorid);
            });
        };
        AuthorController.prototype.reloadAuthorsList = function (data) {
            var numberOfRecords = $(data).find("#numberOfRecords").val();
            this.authorService.totalItems = numberOfRecords;
            this.authorService.nghtml = data;
        };
        AuthorController.prototype.editAuthor = function (authorid) {
            return this.openModal('ajax/edit/' + authorid);
        };
        AuthorController.prototype.newAuthor = function () {
            return this.openModal('ajax/create');
        };
        AuthorController.prototype.openModal = function (templateurl) {
            var parent = this;
            return this.$modal.open({
                templateUrl: templateurl,
                controller: Controllers.AuthorModalController,
                resolve: {
                    $parent: function () {
                        return parent;
                    }
                }
            });
        };
        AuthorController.prototype.updateAuthor = function (formId) {
            var frm = $('#' + formId);
            var formdata = this.getFormDataAsJson(frm);
            this.logger.log("Updating Author Record");
            var that = this;
            this.authorService.updateAuthor(formdata, this.currentPage, function (data) {
                that.reloadAuthorsList(data);
                that.cancel();
                that.logger.log("Update Success ");
            });
        };

        AuthorController.prototype.refresh = function () {
            var that = this;
            this.authorService.getAllAuthors(that.currentPage, function (data) {
                that.reloadAuthorsList(data);
                that.logger.log("Refresh Successpage #" + that.currentPage);
            });
        };
        AuthorController.prototype.saveAuthor = function (formId) {
            var frm = $('#' + formId);
            var formdata = this.getFormDataAsJson(frm);
            this.logger.log("Saving Author Record");
            var that = this;
            this.authorService.saveAuthor(formdata, function (data) {
                var msg = "Add an other Author?";
                that.reloadAuthorsList(data);
                if (window.confirm(msg)) {
                    frm.trigger("reset");
                } else {
                    that.cancel();
                }
                that.logger.log("Save Success ");
            });
        };
        AuthorController.$inject = ['$scope', '$compile', 'logService', 'authorService', '$modal'];
        return AuthorController;
    })(Controllers.BaseController);
    Controllers.AuthorController = AuthorController;
})(Controllers || (Controllers = {}));
