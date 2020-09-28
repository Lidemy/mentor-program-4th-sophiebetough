<?php 
	session_start();
	require_once("./conn.php");
	require_once("./utils.php");

	$username = NULL;
	$user = NULL;
	$role = NULL;
	if(!empty($_SESSION['username'])) {
		$username = $_SESSION['username'];
		$user = getUserFromUsername($username); 
		$role = getUserFromUsername($username)['role'];
		$nickname = getUserFromUsername($username)['nickname'];
	}

	if ($user === NULL || $role !== 'ADMIN') {
		header('Location: index.php');
		exit();
	}

	$sql= "SELECT * FROM sophiechang_users ORDER BY id ASC";
	$stmt = $conn->prepare($sql);
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
	<title>後台管理</title>
	<link rel="stylesheet" href="style.css">
</head>
<body>
	<header class="warning">注意！本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</header>
	<main class="board">
		<a class="board__btn" href="index.php">回留言板</a>
		<div class="board__title-admin">後台管理</div>
		<div class="board__hr"></div>
		
		<section>
			<?php while($row = $result->fetch_assoc()) { ?>
			<div class="card">
				<div class="card__avatar"></div>
				<div class="card__body">
					<div class="card__info">
						<span class="card__author"><?php echo escape($row['nickname']); ?>(@<?php echo escape($row['username']); ?>)</span>
						<div>身份：<?php echo escape($row['role']); ?></div>
						<div class=card__role-admin>調整身份：
							<a href="handle_update_role.php?role=ADMIN&id=<?php echo escape($row['id']); ?>">管理員</a>
							<a href="handle_update_role.php?role=NORMAL&id=<?php echo escape($row['id']); ?>">使用者</a>
							<a href="handle_update_role.php?role=BANNED&id=<?php echo escape($row['id']); ?>">停權者</a>
						</div>
					</div>
				</div>
			</div>
			<div class="board__hr"></div>
		  <?php } ?>
		</section>
	</main>	
</body>
</html>
