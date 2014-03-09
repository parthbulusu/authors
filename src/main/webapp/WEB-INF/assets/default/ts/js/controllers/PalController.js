var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="./references.ts" />
var Controllers;
(function (Controllers) {
    var PalController = (function (_super) {
        __extends(PalController, _super);
        function PalController() {
            _super.apply(this, arguments);
            this.message = "Testing Pal Controller";
        }
        return PalController;
    })(Controllers.BaseController);
    Controllers.PalController = PalController;
})(Controllers || (Controllers = {}));
