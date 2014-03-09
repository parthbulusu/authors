<%@include file="taglib_includes.jsp"%>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title><spring:message code="App.Title"></spring:message></title>
</head>
<body style="font-family: Arial; font-size: smaller;">
	<div class="view">
		<div class="row clearfix">
			<div class="col-md-8 column ui-sortable">
				<div ng-controller="AuthorController">
					<form action="search" method="post">
						<table style="border-collapse: collapse;" border="0"
							bordercolor="#006699" cellpadding="20px">
							<tr>
								<td>Enter Search term</td>
								<td>
								<%--@todo on-interval for now hard coded in utils.ts --%>
								<input search-text interval="1" on-interval="vm.searchAuthor" min-length="3"  />
								 &nbsp;&nbsp;<input	type="submit" value="Search" /> <input type="button"
									value="New Contact" ng-click="vm.newAuthor()" /></td>

							</tr>
						</table>
					</form>
					<div class="pagination-extra">

						<pagination on-select-page="vm.setPage(page)"
							total-items="vm.authorService.totalItems"
							page="vm.currentPage" max-size="vm.pageSize"
							boundary-links="true" rotate="false" num-pages="vm.numPages"></pagination>
							<div class="pagination-right">Page: {{vm.currentPage}} / {{vm.numPages}}</div>
					</div>
					<div id="authorsListHTML" compile="vm.authorService.nghtml"></div>
					<div class="pagination-extra">
						<pagination on-select-page="vm.setPage(page)"
							total-items="vm.authorService.totalItems"
							page="vm.currentPage" max-size="vm.pageSize"
							boundary-links="true" rotate="false" num-pages="vm.numPages"></pagination>
						<div class="pagination-right">Page: {{vm.currentPage}} / {{vm.numPages}}</div>
					</div>
				</div>
			</div>
			<div class="col-md-4 column ui-sortable">
				<div ng-controller="FileUploadController">
					<div class="row">
						<label for="fileToUpload">Select a File to Upload</label><br /> <input
							type="file" ng-model-instant id="fileToUpload" multiple
							onchange="angular.element(this).scope().vm.setFiles(this)" />
					</div>
					<div id="dropbox" class="dropbox" ng-class="dropClass">
						<span>{{vm.dropText}}</span>
					</div>
					<div ng-show="files.length">
						<div ng-repeat="file in files.slice(0)">
							<span>{{file.webkitRelativePath || file.name}}</span> (<span
								ng-switch="file.size > 1024*1024"> <span
								ng-switch-when="true">{{file.size / 1024 / 1024 |
									number:2}} MB</span> <span ng-switch-default>{{file.size / 1024
									| number:2}} kB</span>
							</span>)
						</div>
						<input type="button" ng-click="vm.uploadFile()" value="Upload" />
						<div class="col-sm-4">
							<progressbar class="progress-striped" value="vm.progress"
								type="info">{{vm.progress}}%</progressbar>
						</div>


					</div>
				</div>
			</div>
		</div>
	</div>


</body>
</html>