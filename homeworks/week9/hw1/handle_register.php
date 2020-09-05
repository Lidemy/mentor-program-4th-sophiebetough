<?php
	session_start();
	require_once("./conn.php"); 

	$nickname = $_POST['nickname'];
	$username = $_POST['username'];
	$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

	if(empty($nickname) || empty($username) || empty($password)) {
		header("Location: ./register.php?errCode=1");
		die();
	}

	$sql = sprintf(
		"INSERT INTO sophiechang_users(nickname, username, password) VALUES('%s', '%s', '%s')",
		$nickname,
		$username,
		$password
	); 

	$result = $conn->query($sql);
	if (!$result) {
		$code = $conn->errno;
		if ($code === 1062) {
			header("Location: ./register.php?errCode=2");
		}
		die($conn->error);
	}

	$_SESSION['username'] = $username;
	header("Location: index.php");
?>
