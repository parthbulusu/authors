<%@include file="taglib_includes.jsp" %>
	<c:set var="resultPage" value="${SEARCH_AUTHORS_RESULTS_PAGE}"/>
	<c:set var="resultList" value="${resultPage.content}"/>
<div>
<input type="hidden" id="numberOfRecords" value="${resultPage.totalElements}"/>
	<table class="table table-striped"  style="border-collapse: collapse;" border="1" bordercolor="#006699">
		<c:if test="${empty resultList}">
		<tr>
			<td colspan="5">No Results found</td>
		</tr>
		</c:if>
		<c:if test="${! empty resultList}">
			<tr bgcolor="lightblue">
				<th>Firstname</th>			
				<th>Lastname</th>	
				<th>Affiliation</th>
				<th>Paper Title</th>			
				<th>Prohibited From</th>	
				<th>Start Date</th>
				<th>End Date</th>				
				<th>Email</th>			
				<th></th>
			</tr>		
			<c:forEach var="author" items="${resultList}">		
		    <tr>
				<td><c:out value="${author.firstname}"></c:out></td>
				<td><c:out value="${author.lastname}"></c:out></td>
				<td><c:out value="${author.affiliation}"></c:out> </td>
				<td><c:out value="${author.paperTitle}"></c:out></td>
				<td><c:out value="${author.prohibitedFrom}"></c:out></td>
				<td><c:out value="${author.startdate}"></c:out> </td>				
				<td><c:out value="${author.enddate}"></c:out></td>
				<td><c:out value="${author.email}"></c:out></td>
				<td>
					<p class=action ng-click="vm.editAuthor('${author.id}')"><i class="glyphicon glyphicon-edit"></i>Edit</p>
					<p class=action ng-click="vm.deleteAuthor('${author.id}')"><i class="glyphicon glyphicon-trash"></i>Delete</p>
				</td>
			</tr>
			</c:forEach>

		</c:if>	
					
	</table>
</div>