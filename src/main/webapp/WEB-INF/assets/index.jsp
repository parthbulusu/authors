<%@page import="org.apache.commons.lang3.StringUtils"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
    	<%
    		String user=request.getParameter("q");
    	     user=StringUtils.isBlank(user)?"PAL":user;
    	%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <%--<%=user%>  --%>
        <%--Code already written for issue AGL-59 this is just to mimic the checkin for issue1 --%>
        <title>Hello <%=user%></title>
        <script src="./default/ts/js/controllers/parth.js"></script>
    </head>
    <body>

        <h1>Hello <%=user%></h1>
        <form action="/atlassiandemo/index.jsp" method="post">
        	Name : <input type="text" name="q" id="q"> 
        	<input type="submit" name="s">
        </form>
    </body>
</html>
