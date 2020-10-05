<?php
	session_start();
	require_once("conn.php"); 
	require_once("utils.php");

	$id = $_POST['id'];
	$title = $_POST['title'];
	$content = $_POST['content'];
	
	if (empty($_POST['content']) || empty($_POST['title'])) {
		header("Location: ./update_post.php?errCode=1&id=" . $_POST['id']);
		exit();
	}

	$sql = "UPDATE sophiechang_articles SET content=?, title=? WHERE id=?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('sss', $content, $title, $id);
	$result = $stmt->execute();
	
	if ($result) {
		header("Location: ./admin.php");
	} else {
		die("failed" . $conn->error );
	}
?>
