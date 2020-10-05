<?php
	require_once("./conn.php");

	function getUserFromUsername($username) {
		global $conn;
		$sql = "SELECT * FROM sophiechang_users WHERE username=?";
		$stmt = $conn->prepare($sql);
		$stmt->bind_param('s', $username);
		$result = $stmt->execute();
		if(!$result) {
			die('Error:' . $conn->error);
		}

		$result = $stmt->get_result();
		$row = $result->fetch_assoc();
		$nickname = $row['nickname']; //判斷權限
		$role = $row['role']; //判斷權限
		return ['nickname'=>$nickname, 'role'=>$role ]; //判斷權限
		// return $row; //id, nickname, username, role
	}

	function escape($str) {
		return htmlspecialchars($str, ENT_QUOTES);
	}
?>
