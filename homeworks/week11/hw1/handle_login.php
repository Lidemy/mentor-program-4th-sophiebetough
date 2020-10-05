<?php
	session_start();
	require_once("./conn.php");
	require_once("./utils.php"); 

	$username = $_POST['username'];
	$password = $_POST['password'];

	if (empty($username) || empty($password)) {
		header("Location: ./login.php?errCode=1");
		die();
	}

	$sql = "SELECT * FROM sophiechang_users WHERE username=?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('s', $username);
	$result = $stmt->execute();

	if (!$result) {
		die($conn->error);
		}

	$result = $stmt->get_result();

	if ($result->num_rows === 0) {
		header("Location: login.php?errCode=2");
		exit();
	}
	// 有查到使用者
	$row = $result->fetch_assoc();
	if (password_verify($password, $row['password'])) {
		// 登入成功
		/*
			1. 產生 session id (token)
			2. 把 username 寫入檔案
			3. set-cookie: session-id (設定到 client 端)
		*/
		$_SESSION['username'] = $username;
		header("Location: index.php");
	} else {
		header("Location: login.php?errCode=2");
	}
?>
