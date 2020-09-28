<?php
	session_start();
	require_once("./conn.php"); 
	require_once("./utils.php");
	
	$username =	$_SESSION['username'];
	$user = getUserFromUsername($username);
	$role = getUserFromUsername($username)['role'];


	if ($role !== 'ADMIN') {
		header('Location: ./index.php');
		exit();
	}

	$id = $_GET['id'];
	$role = $_GET['role'];

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
