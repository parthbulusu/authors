<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title><sitemesh:write property='title' /></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width">
		<link rel="stylesheet" type="text/css" href="../wro/global.css" />
        <style>
            body {
                padding-top: 50px;
                padding-bottom: 20px;
            }
        </style>		
        <script src="../assets/boilerplate/js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
		<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
	
		<sitemesh:write property='head' />

    </head>
	<body ng-app="myApp">
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->
    <div class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">PAL</a>
        </div>
        <div class="navbar-collapse collapse">
          
          <ul class="nav navbar-nav">
            <li class="active"><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dropdown <b class="caret"></b></a>
              <ul class="dropdown-menu">
                <li><a href="#">Action</a></li>
                <li><a href="#">Another action</a></li>
                <li><a href="#">Something else here</a></li>
                <li class="divider"></li>
                <li class="dropdown-header">Nav header</li>
                <li><a href="#">Separated link</a></li>
                <li><a href="#">One more separated link</a></li>
              </ul>
            </li>
          </ul>
           
          <sec:authorize ifAnyGranted="ROLE_ANONYMOUS">
          	  <div id="login-error">${error}</div>
			  <form class="navbar-form navbar-right" action="/pal/j_spring_security_check" method="post">
				  <div class="form-group">
				    <input id="j_username" name="j_username" type="text" placeholder="Username" class="form-control">
				    
				  </div>
				  <div class="form-group">
				  	<input id="j_password" name="j_password" type="password" placeholder="Password" class="form-control"/>
				  </div>
				  <button type="submit" class="btn btn-success">Sign in</button>
			  </form>       	
          </sec:authorize>
          <sec:authorize ifNotGranted="ROLE_ANONYMOUS">
          	<ul id="user-profile" class="nav navbar-nav navbar-right"><li class="active"><a href="#">Welcome ${pageContext.request.userPrincipal.name}</a> </li><li class="active"><a href="../auth/logout">Signout</a></li></ul>
          </sec:authorize>
          
          

        </div><!--/.navbar-collapse -->
      </div>
    </div>

	<div class="main-body">
  
		<div class="container">
			<sitemesh:write property='body' />
	      <hr>
		
	      <footer>
                <p id="UtilityNav"><a href="http://open.custhelp.com">Support</a> | <a href="mailto:pal@open.org" target="_blank">Contact Open</a> | <a href="http://pal.open.org" target="_blank">Open Resources</a>| <a href="http://www.open.org/web/aboutus/whatis/policies/p9-26.html" target="_blank">Nondiscrimination Policy</a></p>
	      </footer>
	    </div> <!-- /container -->  
	</div>
          <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.1.min.js"><\/script>')</script>

        <script type="text/javascript" src="../wro/global.js"></script>

        <script>
            var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src='//www.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));
        </script>
    </body>
</html>
