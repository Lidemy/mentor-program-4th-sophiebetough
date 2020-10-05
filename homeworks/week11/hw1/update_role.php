<?php
	session_start();
	require_once("./conn.php"); 
	require_once("./utils.php");
	
	if (empty($_GET['id']) || empty($_GET['role'])) {
		header('Location: ./admin.php');
		die("資料不齊全");
	};

	$username =	$_SESSION['username'];
	$user = getUserFromUsername($username);
	$role = getUserFromUsername($username)['role'];
	$id = $_GET['id'];

	if ($user === NULL || $role !== 'ADMIN') {
		header('Location: ./admin.php');
		exit();
	}


	$sql = "UPDATE sophiechang_users SET role=? WHERE id=?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('ss', $role, $id);
	$result = $stmt->execute();
	
	if ($result) {
		header("Location: ./admin.php");
	} else {
		die("failed" . $conn->error );
	};
?>
