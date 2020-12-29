document.getElementById("year").innerHTML = new Date().getFullYear();


$(document).ready(function() { // вся магия после загрузки страницы
    $("form").submit(submitForm);
});

function submitForm(){ // перехватываем все при событии отправки
    var form = $(this); // запишем форму, чтобы потом не было проблем с this
    var error = false; // предварительно ошибок нет
    var alert = $(".custom-alert")


    if (!error) { // если ошибки нет
        var data = form.serialize(); // подготавливаем данные
        $.ajax({ // инициализируем ajax запрос
            type: 'POST', // отправляем в POST формате, можно GET
            url: 'telegram01.php', // путь до обработчика, у нас он лежит в той же папке
            dataType: 'json', // ответ ждем в json формате
            data: data, // данные для отправки
            beforeSend: function(data) { // событие до отправки
                form.find('input[type="submit"]').attr('disabled', 'disabled'); // например, отключим кнопку, чтобы не жали по 100 раз
            },
            success: function(data){ // событие после удачного обращения к серверу и получения ответа
                if (data['error']) { // если обработчик вернул ошибку
                    alert(data['error']); // покажем её текст
                    alert.removeClass("hide-msg");
                    alert.addClass("alert-warning");
                    alert.html("Не получилось. Попробуйте позвонить нам")
                } else { // если все прошло ок
                    $("#miniform")[0].reset();
                    alert.removeClass("hide-msg");
                    alert.addClass("alert-success");
                    alert.html("Заявка отправлена, ждите звонка")
                }
            },
            error: function (xhr, ajaxOptions, thrownError) { // в случае неудачного завершения запроса к серверу
                alert(xhr.status); // покажем ответ сервера
                alert(thrownError); // и текст ошибки
            },
            complete: function(data) { // событие после любого исхода
                form.find('input[type="submit"]').prop('disabled', false); // в любом случае включим кнопку обратно
            }

        });
    }
    return false; // вырубаем стандартную отправку формы
}




