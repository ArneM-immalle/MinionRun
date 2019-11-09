<?php
include 'database.php';
$pdo = pdo_connect_mysql(); 
$stmt = $pdo->prepare('INSERT INTO minionrun_scores VALUES (?, ?, ?)');
$stmt->execute([NULL, $_POST['nickname'], $_POST['score']]);
?>

<!--CREATE TABLE IF NOT EXISTS `MinionRun_Scores` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
  	`ip` varchar(50) NOT NULL,
  	`score` int NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;-->