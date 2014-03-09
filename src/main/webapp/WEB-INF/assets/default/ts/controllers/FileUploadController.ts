module Controllers {
    export class FileUploadController extends BaseController {
        dropText = 'Drop files here...';
        dropbox:any;
        progress:any;
        dropClass:any;
        authorService: Services.AuthorService;
        palUtilsService: Services.PalUtilsService;
        static $inject = ['$scope','$compile','logService','$modal','authorService','palUtilsService']
        constructor($scope,$compile, logService:Services.LogService,$modal,authorService:Services.AuthorService,palUtilsService:Services.PalUtilsService) {
            super($scope,$compile,logService,$modal);
            this.dropbox=document.getElementById("dropbox");
            this.setDragEnterLeaveEvent("dragenter");
            this.setDragEnterLeaveEvent("dragleave");
            this.setDragOverEvent();
            this.setDropEvent();
            this.palUtilsService=palUtilsService;
            this.authorService=authorService;
            this.nghtml=authorService.nghtml;
        }
        setDragEnterLeaveEvent(eventType) {
            var that=this;
            this.dropbox.addEventListener(eventType, function(evt){
                that.preventDefault(evt);
                that.$scope.$apply(function(){
                    that.dropText = 'Drop files here...'
                    that.dropClass = ''
                });                
            }, false);

        }
        preventDefault(evt){
            evt.stopPropagation()
            evt.preventDefault()          
        }
        setDragOverEvent() {
            var that=this;
            var clazz = 'not-available'
            this.dropbox.addEventListener("dragover", function(evt){
                that.preventDefault(evt);
                var ok = evt.dataTransfer && evt.dataTransfer.types && evt.dataTransfer.types.indexOf('Files') >= 0;
                that.$scope.$apply(function(){
                    that.dropText = ok ? 'Drop files here...' : 'Only files are allowed!'
                    that.dropClass = ok ? 'over' : 'not-available'
                })                  
            }, false);
          
        }
        setDropEvent(){
            var that=this;
            var files;
            this.dropbox.addEventListener("drop", function(evt){
                that.logger.log('drop evt:'+ JSON.parse(JSON.stringify(evt.dataTransfer)));
                that.preventDefault(evt);
                files = evt.dataTransfer.files;
                that.$scope.$apply(function(){
                    that.dropText = 'Drop files here...'
                    that.dropClass = ''
                })
                if (files.length > 0) {
                    that.$scope.$apply(function(){
                        that.$scope.files = []
                        for (var i = 0; i < files.length; i++) {
                            that.$scope.files.push(files[i])
                        }
                    });
                    
                }                 
            }, false);
           
            
        }
        setFiles(element) {
            var that=this;
            this.$scope.$apply(function() {
                console.log('files:', element.files);
                // Turn the FileList object into an Array
                that.$scope.files = []
                for (var i = 0; i < element.files.length; i++) {
                    that.$scope.files.push(element.files[i])
                }
                that.$scope.progressVisible = false;
            });
        } 
        uploadFile() {
            var fd = new FormData()
            for (var i in this.$scope.files) {
                fd.append("uploadedFile", this.$scope.files[i])
            }
            var xhr = new XMLHttpRequest()
            this.setUploadProgress(xhr,this);
            this.setUploadComplete(xhr,this);
            //xhr.addEventListener("load", this.uploadComplete, false)
            xhr.addEventListener("error", this.uploadFailed, false)
            xhr.addEventListener("abort", this.uploadCanceled, false)
            xhr.open("POST", "ajax/authorListUpload")
            xhr.setRequestHeader("enctype","multipart/form-data");
            this.$scope.progressVisible = true
            xhr.send(fd)
        }
        private setUploadProgress(xhr,that){
            xhr.upload.addEventListener("progress",function(evt) {
                that.$scope.$apply(function(){
                    if (evt.lengthComputable) {
                        that.progress = Math.round(evt.loaded * 100 / evt.total)
                    } else {
                        that.progress = 'unable to compute'
                    }
                })
            }, false)
        }

        setUploadComplete(xhr,that){
            xhr.addEventListener("load", function(evt){
                var data=evt.target.responseText;
                var numberOfRecords=$(data).find("#numberOfRecords").val();
                that.authorService.totalItems=numberOfRecords;
                that.authorService.nghtml=data           
            }, false)
        }

    
        uploadFailed(evt) {
            alert("There was an error attempting to upload the file.")
        }
    
        uploadCanceled(evt) {
            this.$scope.$apply(function(){
                this.$scope.progressVisible = false
            })
            alert("The upload has been canceled by the user or the browser dropped the connection.")
        }
        
    }
}