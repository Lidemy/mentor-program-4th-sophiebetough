<?php
	session_start();
	require_once("./conn.php"); 

	$nickname = $_POST['nickname'];
	$username = $_POST['username'];
	$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

	if(empty($nickname) || empty($username) || empty($password)) {
		header("Location: ./register.php?errCode=1");
		die('資料不齊全');
	}

	$sql = "INSERT INTO sophiechang_users(nickname, username, password) VALUES(?, ?, ?)";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('sss', $nickname, $username, $password);
	$result = $stmt->execute();

	if (!$result) {
		$code = $conn->errno;
		if ($code === 1062) {
			header("Location: ./register.php?errCode=2");
		}
		die($conn->error);
	}

	// 註冊完之後，就可以直接登入	
	$_SESSION['username'] = $username;
	header("Location: index.php");
?>
