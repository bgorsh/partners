/* PHP: обработка mail.php */

<?php
// mail.php

// Установим заголовки для корректной работы с CORS, если нужно:
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Headers: Content-Type");

// Получаем сырые данные JSON из тела запроса
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($data && isset($data['name'], $data['email'], $data['tel'])) {
  $name = htmlspecialchars($data['name']);
  $email = htmlspecialchars($data['email']);
  $tel = htmlspecialchars($data['tel']);

  $to = 'gorshunov65@inbox.ru';
  $subject = 'Заявка с формы';
  $message = "Имя: $name\nEmail: $email\nТелефон: $tel";
  $headers = "Content-Type: text/plain; charset=utf-8\r\n";
  $headers .= "From: noreply@yourdomain.com\r\n";

  if (mail($to, $subject, $message, $headers)) {
    http_response_code(200);
    echo json_encode(['status' => 'success']);
  } else {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Ошибка при отправке письма.']);
  }
} else {
  http_response_code(400);
  echo json_encode(['status' => 'error', 'message' => 'Некорректные данные.']);
}
?>