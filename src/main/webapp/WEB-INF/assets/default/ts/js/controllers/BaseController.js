/// <reference path="./references.ts" />
var Controllers;
(function (Controllers) {
    var BaseController = (function () {
        function BaseController($scope, $compile, logService, $modal) {
            this.message = "Welcome to PAL";
            this.totalItems = 0;
            this.currentPage = 1;
            this.pageSize = 10;
            this.numPages = 10;
            this.nghtml = "Empty List";
            $scope.vm = this;
            logService.log("Scope Variable injected");
            this.logger = logService;
            this.$scope = $scope;
            this.$compile = $compile;
            this.$modal = $modal;
        }
        BaseController.prototype.getFormDataAsJson = function (form) {
            var o = {};
            var a = form.serializeArray();
            $.each(a, function () {
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
        };

        BaseController.prototype.cancel = function () {
            alert("Not a Modal");
        };
        BaseController.prototype.refresh = function () {
            alert("implement reload");
        };
        BaseController.prototype.setPage = function (pageNo) {
            this.currentPage = pageNo;
            this.refresh();
        };
        BaseController.$inject = ['$scope', '$compile', 'logService', '$modal'];
        return BaseController;
    })();
    Controllers.BaseController = BaseController;
})(Controllers || (Controllers = {}));
