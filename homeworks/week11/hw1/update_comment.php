<?php 
	session_start();
	require_once("./conn.php");
	require_once("./utils.php");

	$id = $_GET['id'];

	$username = NULL;
	$user = NULL;
	$role = NULL;
	if(!empty($_SESSION['username'])) {
		$username = $_SESSION['username'];
		$user = getUserFromUsername($username);
		$role = getUserFromUsername($username)['role'];
	}

	$stmt = $conn->prepare("SELECT * FROM sophiechang_comments WHERE id = ?");
	$stmt->bind_param("s", $id);
	$result = $stmt->execute();
	if(!$result) {
		die('Error:' . $conn->error);
	}

	$result = $stmt->get_result();
	$row = $result->fetch_assoc();

	switch ($role) {
    case 'BANNED':
      header('Location: index.php');
      exit();
      break;
    case 'NORMAL':
      if ($row['username'] !== $username) {
      header('Location: index.php');
      exit();
      } 
      break;
    case 'ADMIN':
      break;
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
		<div class="board__title">編輯留言</div>
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
		<form class="board__new-comment-form" method="POST" action="./handle_update_comment.php">
			<textarea name="content" rows="5"><?php echo $row['content'] ?></textarea>
			<input type="hidden" name="id" value="<?php echo $row['id']  ?>" />
			<input class="board__submit-btn" type="submit">
		</form>
	</main>	
</body>
</html>
