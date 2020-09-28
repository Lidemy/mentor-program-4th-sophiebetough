<?php
	session_start();
	require_once("./conn.php"); 
	require_once("./utils.php");
	
	if(empty($_GET['id'])) {
		header('Location: ./admin.php');
		die("資料不齊全");
	}
  
	$id = $_GET['id'];
	
	$sql = "UPDATE sophiechang_articles SET is_deleted=1 WHERE id=?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('s', $id);
	$result = $stmt->execute();
	if ($result) {
		header("Location: ./admin.php");
	} else {
		die("failed" . $conn->error );
	}
?>
