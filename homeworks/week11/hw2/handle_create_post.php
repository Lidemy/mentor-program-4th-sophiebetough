<?php
	session_start();
	require_once("conn.php"); 
	require_once("utils.php");
	
	if (empty($_POST["content"] || $_POST['title'])) {
		header("Location: ./create_post.php?errCode=1");
		die("資料不齊全");
	}

	$username = $_SESSION['username'];
	$user = getUserFromUsername($username);

	$title = $_POST['title'];
	$content = $_POST['content'];
	$sql = "INSERT INTO sophiechang_articles(username, content, title) VALUES(?, ?, ?)";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('sss', $username, $content, $title);
	$result = $stmt->execute();
	
	if ($result) {
		header("Location: ./admin.php");
	} else {
		die("failed" . $conn->error );
	}
?>
