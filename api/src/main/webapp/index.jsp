<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="en">
  <head>
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="Klee Group">
    <title>Rodolphe Demo</title>
    <!--link rel="icon" type="image/png" href="static/images/favicon.png"/-->
   

    <script src="//code.jquery.com/jquery-1.10.2.min.js"></script>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css" />
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js" ></script>
    <!--script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.12.2/react.js"></script-->
    <script src=" https://cdnjs.cloudflare.com/ajax/libs/react/0.13.1/react.js"></script>

  	<!--Material design -->
  	
  	<script src="//code.jquery.com/jquery-1.10.2.min.js"></script>
  	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.2.2/css/material-wfont.css">
  	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.2.2/css/material.css">
  	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.2.2/css/ripples.css">

  	<link rel="font" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.2.2/fonts/Material-Design-Icons.eot">
  	<link rel="font" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.2.2/fonts/Material-Design-Icons.svg">
  	<link rel="font" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.2.2/fonts/Material-Design-Icons.ttf">
  	<link rel="font" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.2.2/fonts/Material-Design-Icons.woff">
  
  	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.2.2/js/material.js"/>
  	<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-material-design/0.2.2/js/ripples.min.js"></script>

    <!-- End material desgn-->
    
    <link rel="stylesheet" href="static/stylesheets/app.css">
    <script src='static/javascripts/vendor.js'></script>
    <script src='static/javascripts/app.js'></script>

</head>
<body>
	<div id="pageContent">
		<div id="leftMenu">
			<div id="logo"><img/></div>
			<div id="search"><a href="#filterResult"><img src="static/img/search.png"/></a></div>
		</div>
		<div id="container">
			<div id="header">
			</div>
			<div id="page"></div>
			<div id="lineResume"></div>
		</div>
	</div>
	<script>require('./index');</script>

</body>
</html>
