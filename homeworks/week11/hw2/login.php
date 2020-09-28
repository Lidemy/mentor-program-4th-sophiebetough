<?php 
	session_start();
	require_once("conn.php");
	require_once("utils.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="style.css">
	<link rel="stylesheet" href="normalize.css">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>部落格</title>
</head>

<body>
	<!-- navbar -->
	<?php include_once('header.php') ?>

	<!-- banner -->
	<section class="banner">
		<h1>技術存放之地</h1>
		<div>Welcome to my blog</div>		
	</section>	

	<!-- login -->
	<div class="login__wrapper">
		<h2>Log In</h2>
		<?php
			if (!empty($_GET['errCode'])) {
				$code = $_GET['errCode'];
				$msg = 'Error';
				if ($code === '1') {
					$msg = '資料不齊全';
				} else if ($code === '2') {
					$msg = '帳號或密碼輸入錯誤';
				}
				echo '<div class="error">' . '錯誤：' . $msg . '</div>';
			} 
		?>
		<form action="handle_login.php" method="POST">
			<div class="input__wrapper">
				<div class="input__label">USERNAME</div>
				<input class="input__block" type="text" name="username" />
			</div>
			<div class="input__wrapper">
				<div class="input__label">PASSWORD</div>
				<input class="input__block" type="password" name="password" />				
			</div>
			<input type="submit" value="登入" />
		</form>		
	</div>

	<!-- articles -->
	<footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>			
</body>
</html>