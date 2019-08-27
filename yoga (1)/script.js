window.addEventListener('DOMContentLoaded', function() {// чтобы подгрузилась вся
                                                         //сначало DOM структура, а потом script

    'use strict'; // переводим код в строгий режим
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');


    function hideTabContent(a) {  // фун-я будет скрывать  ненужные табы на странице
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);// добавляем 1, чтобы скрывались все табы кроме первого

    function showTabContent(b) {  // фун-я будет показывать таб контент(определенный)
        if (tabContent[b].classList.contains('hide')) { // b чтобы сверять, что подставляем
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }

    info.addEventListener('click', function(event) {// применяем делегирование к обработчику событий
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) { // если кликнули сюда
            for(let i = 0; i < tab.length; i++) { // то перебераем, ищем нужный элемент
                if (target == tab[i]) { // если то куда мы нажали совпадает с определенным табом, которые перебираем
                    hideTabContent(0); // то скрываем все табы
                    showTabContent(i); // и показываем тот, который совпал по нумерации[i].
                    break;
                }
            }
        }
    });

    // Делаем таймер
    let deadline = '2019-08-21';

    //Узнаем время между сейчас и deadline
    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),//записываем эту разницу в t
            // получаем из милисекунд сек,мин,час
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));

            return{ // возвращает целый обЪект
                'total' : t,
                'hours' : hours,
                'minutes' : minutes,
                'seconds' : seconds
            };
    }

    //превращаем статическую верстку в динамический код
    function setClock(id, endTime) {// по id ищем таймер
        // получаем наши эл-ты с верстки
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() { //будет вызываться и запускаться каждую сек
            let t = getTimeRemaining(endTime);//используем здесь getTimeRemaining для получения разницы во времени

            function addZero(num){
                if(num <= 9) {
                    return '0' + num;
                } else return num;
            };
                // записываем в эл-ы  верстки обновленные данные
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);

            if (t.total <= 0) {  // останавливаем таймер
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    setClock('timer', deadline);


    // Модальное окно

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

     // открываем модальное окно
    more.addEventListener('click', function () {
        overlay.style.display = 'block';
        this.classList.add('more-splash');// добавляем прописанную в css анимацию
        //блокируем прокрутку страницы при открытом модальном окне
        document.body.style.overflow = 'hidden';
    });

    // закрываем, нажимаем на крестик
    close.addEventListener('click', function () {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        //отменяем блокировку
        document.body.style.overflow = '';
    });


    // Форма, будем использовать AJAX

    let message = {   // создаем объект с сообщениями
        loading: 'Загрузка....',
        success: 'Спасибо, скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    // получаем все эл-ты с которыми будем работать
    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),

        // содаем сообщение для пользователя с аннимацией
        statusMessage = document.createElement('div');
        statusMessage.classList.add('status');

        // вешаем обработчик на form а не на кнопку
    form.addEventListener('submit', function (event) {
        event.preventDefault();// чтобы при нажатии не обновлялась вся страница
        form.appendChild(statusMessage);

        // формируем запрос
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

        let formData = new FormData(form);//создаем и посылаем объект с данными, которы ввел поль-ль

        // превращаем formdata в json(конструкция часто используется)
        let obj = {};// создаем промежуточный объект
        formData.forEach(function (value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);//превращаем javascript объекты в JSON

        request.send(JSON);

        request.addEventListener('readystatechange', function () {
            if (request.readyState < 4){
                statusMessage.innerHTML = message.loading;
            }else if (request.readyState == 4 && request.status == 200){
                statusMessage.innerHTML = message.success;
            }else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i=0; i<input.length; i++ ){ // очищаем inputы
            input[i].value = '';
        }
    });
});