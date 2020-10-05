<?php 
	session_start();
	require_once("./conn.php");
	require_once("./utils.php");

	/*
		1. 從 cookie 裡面讀取 PHPSESSID(token)<- 通行證
		2. 從檔案裡面讀取 session id 的內容
		3. 放到 $_SESSION
	*/

	$username = NULL;
	$user = NULL;
	$role = NULL;
	if(!empty($_SESSION['username'])) {
		$username = $_SESSION['username'];
		$user = getUserFromUsername($username); 
		$role = getUserFromUsername($username)['role'];
		$nickname = getUserFromUsername($username)['nickname'];
	}

	$page = 1;
	if (!empty($_GET['page'])) {
		$page = intval($_GET['page']);
	}
	$item_per_page = 6;
	$offset = ($page - 1) * $item_per_page;

	$sql= "SELECT U.role AS role, C.id AS id, C.content AS content, C.created_at AS created_at, U.nickname AS nickname, U.username AS username FROM sophiechang_comments AS C LEFT JOIN sophiechang_users AS U ON C.username = U.username WHERE C.is_deleted is NULL ORDER BY C.id DESC LIMIT ? offset ?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('ii', $item_per_page, $offset);
	$result = $stmt->execute();
	if(!$result) {
		die('Error:' . $conn->error);
	}
	$result = $stmt->get_result();
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
		<?php if(!$username) { ?>
			<a class="board__btn" href="register.php">註冊</a>
			<a class="board__btn" href="login.php">登入</a>
	  <?php } else { ?>
	  	<a class="board__btn" href="logout.php">登出</a>
	    <?php if($role == 'NORMAL' || $role == 'ADMIN') { ?>
	      <a class="update-nickname board__btn">修改暱稱</a>
	    <?php } ?>	
	    <?php if($role == 'ADMIN') { ?>
	      <a class="board__btn" href="admin.php">管理員專區</a>
	    <?php } ?>	
	  <?php } ?>

		<form class="hide board__nickname-form board__new-comment-form" method="POST" action="update_user.php">
			<div class="board__nickname"><span>新的暱稱：</span><input type="text" name="nickname" /></div>
			<input class="board__submit-btn" type="submit" />
		</form>
    
    <?php if ($username) { ?>
			<div class="board__greeting">Hello! <?php echo escape($user['nickname']); ?></div>
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
			<?php if($username) { ?>
				<?php if ($role == 'BANNED') { ?>
					<h3>你已被停權！</h3>
				<?php } else { ?>
					<input class="board__submit-btn" type="submit" />
				<?php } ?>
			<?php } ?>
			<?php if(empty($username)) { ?>
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
						<span class="card__author"><?php echo escape($row['nickname']); ?>(@<?php echo escape($row['username']); ?>)</span>
						<span class="card__time"><?php echo escape($row['created_at']); ?></span>
						<?php
							switch ($role) {
								case 'BANNED':
									break;
								case 'NORMAL':
									if ($row['username'] === $username) {
										echo sprintf("<a href='update_comment.php?id=%s'>編輯</a> ", $row['id']);
                    echo sprintf("<a href='delete_comment.php?id=%s'>刪除</a>", $row['id']);
									}
									break;
								case 'ADMIN':
                  echo sprintf("<a href='update_comment.php?id=%s'>編輯</a> ", $row['id']);
                  echo sprintf("<a href='delete_comment.php?id=%s'>刪除</a>", $row['id']);
                  break;
							} 
						?>
					</div>
					<p class="card__content"><?php echo escape($row['content']); ?></p>
				</div>
			</div>
		  <?php } ?>
		</section>

		<div class="board__hr"></div>
		<?php 
			$stmt = $conn->prepare("SELECT count(id) AS count FROM sophiechang_comments WHERE is_deleted is NULL");
			$result = $stmt->execute(); 
			$result = $stmt->get_result();
			$row = $result->fetch_assoc();
			$count = $row['count'];
			$total_page = ceil($count / $item_per_page);
		?>	
		<div class="page__info">
			<span>總共有<?php echo $count ?>筆留言，</span><span><?php echo $page ?> / <?php echo $total_page ?></span>
		</div>
		<div class="paginator">
			<?php if ($page != 1) { ?>
				<a href="index.php?page=1">首頁</a>
				<a href="index.php?page=<?php echo $page - 1 ?>">上一頁</a>
			<?php } ?>
			<?php if ($page != $total_page) { ?>
				<a href="index.php?page=<?php echo $page + 1 ?>">下一頁</a>
				<a href="index.php?page=<?php echo $total_page ?>">最後一頁</a>	
		  <?php } ?>
		</div>
	</main>	
	<script>
		const btn = document.querySelector('.update-nickname')
		btn.addEventListener('click', function() {
			const form = document.querySelector('.board__nickname-form')
			form.classList.toggle('hide')
		});
  </script>
</body>
</html>
