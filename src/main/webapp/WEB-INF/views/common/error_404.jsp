<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>404Error</title>
<meta http-equiv="Content-type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- font -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">
<link rel="stylesheet"	href="//fonts.googleapis.com/earlyaccess/jejugothic.css" />
<link rel="stylesheet"	href="//fonts.googleapis.com/earlyaccess/nanumgothic.css" />
<link rel="stylesheet"	href="//fonts.googleapis.com/css?family=Open+Sans:300,400,600,700|Raleway:500,700" />
</head>
<body>
    <div class="error_all">
        <div class="error_pic">
           <i class="fas fa-exclamation-triangle"></i>
        </div>
        <div class="error_desk">
            <h2>Error 404</h2>
            <h4>The page you were looking for was not found.</h4>
            <p>
              <a class="error_btn" href="/">Go back to home page</a>
            </p>
        </div>
    </div>
</body>
</html>

<style>
body, html{height:100%;margin:0;font-family: 'Open Sans', 'Nanum Gothic', sans-serif;}
.error_all{top: 50%;left: 50%;width: 600px; margin: -140px -300px;height: 290px;position: absolute;}
.error_pic{text-align:center;}
.error_pic i{color:#1abebc;font-size:80px;padding-bottom:35px;}
.error_desk{text-align:center;}
.error_desk h2{font-size: 45px; line-height: 45px; color: rgba(0, 0, 0, .7);margin:0;}
.error_desk h4{font-size: 21px;color: rgba(0, 0, 0, .7);margin:10px 0 40px 0 ;font-weight: normal;}
.error_btn{background-color: #f7f7f7;color: #747474;padding: 11px 20px;border-radius: 5px;box-shadow: inset 0 0 0 1px rgba(0, 0, 0, .03); text-decoration:none;}
</style>