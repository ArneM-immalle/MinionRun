<?php
include 'database.php';
$pdo = pdo_connect_mysql(); 
$stmt = $pdo->prepare('SELECT * FROM minionrun_scores ORDER BY score DESC');
$stmt->execute();
$highscore = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode($highscore);
?>