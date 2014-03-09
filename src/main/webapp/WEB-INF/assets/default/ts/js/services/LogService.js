var Services;
(function (Services) {
    var LogService = (function () {
        function LogService() {
        }
        LogService.prototype.log = function (msg) {
            console.log(msg);
        };
        return LogService;
    })();
    Services.LogService = LogService;
})(Services || (Services = {}));
services.service('logService', Services.LogService);
