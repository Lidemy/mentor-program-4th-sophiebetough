<?php
	session_start();
	require_once("./conn.php"); 
	require_once("./utils.php");
	
	if (empty($_POST['nickname'])) {
		header('Location: ./index.php?errCode=1');
		die("資料不齊全");
	};

	$username =	$_SESSION['username'];
	$nickname = $_POST['nickname'];

	$sql = "UPDATE sophiechang_users SET nickname=? WHERE username=?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('ss', $nickname, $username);
	$result = $stmt->execute();
	
	if ($result) {
		header("Location: ./index.php");
	} else {
		die("failed" . $conn->error );
	};
?>
