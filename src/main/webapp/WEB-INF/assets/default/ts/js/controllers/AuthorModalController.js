var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="./references.ts" />
var Controllers;
(function (Controllers) {
    var AuthorModalController = (function (_super) {
        __extends(AuthorModalController, _super);
        function AuthorModalController($scope, $compile, logService, authorService, $modal, $modalInstance, $parent) {
            _super.call(this, $scope, $compile, logService, authorService, $modal);
            this.$modalInstance = $modalInstance;
            this.$parent = $parent;

            //Uodate needs to stay in the same page. Not go back to the first page
            this.currentPage = $parent.currentPage;
        }
        AuthorModalController.prototype.cancel = function () {
            this.$modalInstance.dismiss('cancel');
        };
        AuthorModalController.prototype.refresh = function () {
            // Do not refresh data
        };
        AuthorModalController.prototype.reloadAuthorsList = function (data) {
            var numberOfRecords = $(data).find("#numberOfRecords").val();
            this.$parent.totalItems = numberOfRecords;
            this.$parent.nghtml = data;
        };
        AuthorModalController.$inject = ['$scope', '$compile', 'logService', 'authorService', '$modal', '$modalInstance', '$parent'];
        return AuthorModalController;
    })(Controllers.AuthorController);
    Controllers.AuthorModalController = AuthorModalController;
})(Controllers || (Controllers = {}));
