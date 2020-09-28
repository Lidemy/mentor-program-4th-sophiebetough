<?php 
	session_start();
	require_once("conn.php");
	require_once("utils.php");

	if (empty($_SESSION['username'])) {
		header('Location: index.php');
		exit();
	}
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

	<!-- edited-area -->
	<div class="container__wrapper">
		<div class="container">
			<div class="edit-post">
				<form action="handle_create_post.php" method="POST">
					<div class="edit-post__title">發布文章</div>
					<div class="edit-post__input-wrapper">
						<input name="title" class="edit-post__input" placeholder="請輸入文章標題" name="title">
					</div>
					<select class="selectior_category" name="category">						
					</select>
					<div class="edit-post__input-wrapper">
            <textarea name="content" rows="20" class="edit-post__content" name='content'></textarea>
          </div>
          <div class="edit-post__btn-wrapper">
          	<?php  
				      if (!empty($_GET['errCode'])) {
								$code = $_GET['errCode'];
								$msg = 'Error';
								if ($code === '1') {
									$msg = '資料不齊全';
								}
								echo '<div class="error">' . '錯誤：' . $msg . '</div>';
							} 
						?>
              <input type='submit' class="edit-post__btn" value='送出'>
          </div>
				</form>		
			</div>			
		</div>
	</div>

	<!-- articles -->
	<footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>			
</body>
</html>