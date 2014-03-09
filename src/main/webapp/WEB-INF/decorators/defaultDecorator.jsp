<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title><sitemesh:write property='title' /></title>
        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
		<link rel="stylesheet" type="text/css" href="../wro/global.css" />
        <script src="../assets/boilerplate/js/vendor/modernizr-2.6.2-respond-1.1.0.min.js"></script>
		
		<sitemesh:write property='head' />
	</head>
	<body ng-app="myApp">
        <!--[if lt IE 7]>
            <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
        <![endif]-->

        <div class="header-container" ng-controller="PalController">
        
            <header class="wrapper clearfix">
            	<h1 class="title">PAL</h1>

               <nav>
                    <ul>
                        <li><a href="#">test</a></li>
                        <li><a href="#">Upload</a></li>
                        <li><a href="#">Search</a></li>
                    </ul>
                </nav>
            </header>
        </div>
        <div class="main-container">
            <div class="main wrapper clearfix">
            	<div id="content"></div>
            	<sitemesh:write property='body' />
            </div> <!-- #main -->
        </div> <!-- #main-container -->
		
        <div class="footer-container">
            <footer class="wrapper">
                <p id="UtilityNav"><a href="http://open.custhelp.com">Support</a> | <a href="mailto:pal@open.org" target="_blank">Contact Open</a> | <a href="http://pal.open.org" target="_blank">Open Resources</a>| <a href="http://www.open.org/web/aboutus/whatis/policies/p9-26.html" target="_blank">Nondiscrimination Policy</a></p>
            </footer>
        </div>

        <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.1.js"><\/script>')</script>
        
        <script type="text/javascript" src="../wro/global.js"></script>

        <script>
            var _gaq=[['_setAccount','UA-XXXXX-X'],['_trackPageview']];
            (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
            g.src='//www.google-analytics.com/ga.js';
            s.parentNode.insertBefore(g,s)}(document,'script'));
        </script>
    </body>
</html>

