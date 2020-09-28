<?php
	session_start();
	require_once("./conn.php"); 
	require_once("./utils.php");
	
	if (empty($_POST["content"])) {
		header("Location: ./index.php?errCode=1");
		die("資料不齊全");
	}

	$username = $_SESSION['username'];
	$content = $_POST['content'];
	$nickname = getUserFromUsername($username)['nickname']; //判斷權限
	$role = getUserFromUsername($username)['role']; //判斷權限

	if ($role !== 'NORMAL' && $role !== 'ADMIN') {
		header('Locarion: ./index.php');
		exit();
	} //判斷權限

	$sql = "INSERT INTO sophiechang_comments(username, content) VALUES(?, ?)";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('ss', $username, $content);
	$result = $stmt->execute();
	
	if ($result) {
		header("Location: ./index.php");
	} else {
		die("failed" . $conn->error );
	}
?>
