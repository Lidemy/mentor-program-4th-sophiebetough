<?php
	session_start();
	require_once("./conn.php"); 
	require_once("./utils.php");
	
	if(empty($_GET['id'])) {
		header('Location: ./index.php?errCode=1');
		die("資料不齊全");
	}
  
  $username = $_SESSION['username'];
	$id = $_GET['id'];
	$role = getUserFromUsername($username)['role']; //判斷權限


	//權限
	$sql = "SELECT * FROM sophiechang_comments WHERE id=?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('s', $id);
	$result = $stmt->execute();
	if (!$result) {
		die($conn->error);
	}
	$result = $stmt->get_result();
	$row = $result->fetch_assoc();

	switch ($role) {
    case 'BANNED':
      header('Location: index.php');
        exit();
        break;
    case 'NORMAL':
      if ($row['username'] !== $username) {
        header('Location: index.php');
        exit();
      } 
      break;
    case 'ADMIN':
    	break;
  }

	$sql = "UPDATE sophiechang_comments SET is_deleted=1 WHERE id=?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('s', $id);
	$result = $stmt->execute();
	if ($result) {
		header("Location: ./index.php");
	} else {
		die("failed" . $conn->error );
	}
?>
