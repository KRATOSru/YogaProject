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
});