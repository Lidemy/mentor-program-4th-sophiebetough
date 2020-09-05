<?php 
	session_start();
	require_once("./conn.php");
	require_once("./utils.php");

	/*
		1. 從 cookie 裡面讀取 PHPSESSID(token)
		2. 從檔案裡面讀取 session id 的內容
		3. 放到 $_SESSION
	*/

	$username = NULL;
	if(!empty($_SESSION['username'])) {
		$username = $_SESSION['username'];
	}

	$result = $conn->query("SELECT * FROM sophiechang_comments ORDER BY id DESC");
	if(!$result) {
		die('Error:' . $conn->error);
	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>留言板</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<header class="warning">注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>
	<main class="board">
		<?php if (!$username) { ?>
			<a class="board__btn" href="register.php">註冊</a>
			<a class="board__btn" href="login.php">登入</a>
		<?php } else { ?>
			<a class="board__btn" href="logout.php">登出</a>
			<div class="board__greeting">Hello! <?php echo $username; ?></div>
		<?php } ?>	
		<div class="board__title">Comments</div>
		<?php  
			if (!empty($_GET['errCode'])) {
				$code = $_GET['errCode'];
				$msg = 'Error';
				if ($code ==='1') {
					$msg = '資料不齊全';
				}
				echo '<div class="error">' . '錯誤：' . $msg . '</div>';
			}
		?>
		<form class="board__new-comment-form" method="POST" action="./handle_add_comment.php">
			<textarea name="content" rows="5"></textarea>
			<?php if ($username) { ?>
				<input class="board__submit-btn" type="submit">
			<?php } else { ?>
				<h3>請先登入會員</h3>
			<?php } ?>
		</form>
		<div class="board__hr"></div>
		<section>
			<?php while($row = $result->fetch_assoc()) { ?>
			<div class="card">
				<div class="card__avatar"></div>
				<div class="card__body">
					<div class="card__info">
						<div class="card__author"><?php echo escape($row['nickname']); ?></div>
						<div class="card__time"><?php echo escape($row['created_at']); ?></div></div>
					<p class="card__content"><?php echo escape($row['content']); ?></p>
				</div>
			</div>
		  <?php } ?>
		</section>
	</main>	
</body>
</html>
