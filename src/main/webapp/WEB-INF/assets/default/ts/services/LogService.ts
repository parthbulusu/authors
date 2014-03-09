module Services{
   export class LogService{
        log(msg:any)
        {
            console.log(msg);
        }
   }
}
services.service('logService',Services.LogService);