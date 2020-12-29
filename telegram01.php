<?php

if ($_POST) { // если передан массив POST
    $name = htmlspecialchars($_POST["name"]); // пишем данные в переменные и экранируем спецсимволы
    $phone = htmlspecialchars($_POST["phone"]);
    $token = "1490681577:AAFEB0D3OJm8DWnQhp2cG2oh0dL5K9zxZGM";
    $chat_id = "1354682500";
    
    $json = array(); // подготовим массив ответа
    
    $arr = array(
        'Телефон: ' => $phone,
        'Имя: ' => $name,
    );
    
    $json['error'] = 0; // ошибок не было
    
    foreach($arr as $key => $value) {
        
        $txt .= "<b>".$key."</b> ".$value."%0A";
        
    };
    
    $sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");
    
    echo json_encode($json); // выводим массив ответа
} else { // если массив POST не был передан
    echo 'GET LOST!'; // высылаем
}