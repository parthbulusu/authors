<%@include file="taglib_includes.jsp" %>


	
		<div class="modal-body">
			<form:form id="authorForm" method="post" commandName="authorForm">
				<form:hidden path="id"/>
				<table  style="border-collapse: collapse;" border="0" bordercolor="#006699" cellspacing="2" cellpadding="2">	
					<tr>
						<td width="100" align="right">First Name</td>
						<td width="150">
						<form:input path="firstname"/></td>
						<td align="left">
						<form:errors path="firstname" cssStyle="color:red"></form:errors> 
						</td>
					</tr>
					
					<tr>
						<td width="100" align="right">Last Name</td>
						<td width="150">
						<form:input path="lastname"/></td>
						<td align="left">
						<form:errors path="lastname" cssStyle="color:red"></form:errors> 
						</td>
					</tr>
					<tr>
						<td width="100" align="right">Affiliation</td>
						<td width="150">
						<form:input path="affiliation"/></td>
						<td align="left">
						<form:errors path="affiliation" cssStyle="color:red"></form:errors> 
						</td>
					</tr>
					<tr>
						<td width="100" align="right">Paper Title</td>
						<td width="150">
						<form:input path="paperTitle"/></td>
						<td align="left">
						<form:errors path="paperTitle" cssStyle="color:red"></form:errors> 
						</td>
					</tr>
					<tr>
						<td width="100" align="right">Prohibited From</td>
						<td width="150">
						<form:input path="prohibitedFrom"/></td>
						<td align="left">
						<form:errors path="prohibitedFrom" cssStyle="color:red"></form:errors> 
						</td>
					</tr>					
					<tr>
						<td width="100" align="right">Start Date</td>
						<td width="150">
						<form:input path="startdate"/></td>
						<td align="left">
						<form:errors path="startdate" cssStyle="color:red"></form:errors> 
						</td>
					</tr>
					
					<tr>
						<td width="100" align="right">End Date</td>
						<td width="150">
						<form:input path="enddate"/></td>
						<td align="left">
						<form:errors path="enddate" cssStyle="color:red"></form:errors> 
						</td>
					</tr>

					<tr>
						<td width="100" align="right">Email</td>
						<td><form:input path="email"/></td>
						<td align="left"><form:errors path="email" cssStyle="color:red"></form:errors>  </td>
					</tr>	
					<tr>
						<td colspan="3" align="right"><button type="reset" class="btn ">Clear</button></td>
					</tr>						
				</table>			
			</form:form>
		</div>

