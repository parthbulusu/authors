<%@include file="taglib_includes.jsp" %>

<html>
<head>
	<title><spring:message code="App.Title"></spring:message> </title>
</head>
<body style="font-family: Arial; font-size:smaller;">
	<div class="modal-header">
	    <h3>Create Contact Form</h3>
	</div>
	<jsp:include page="authorForm.jsp"></jsp:include>
		<div class="modal-footer">
			<button class="btn btn-primary" ng-click="vm.updateAuthor('authorForm','{{vm.currentPage}}')">Update</button>
			<button class="btn btn-warning" ng-click="vm.cancel()">Cancel</button>
			
		    
		</div>

</body>
</html>
