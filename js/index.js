var schedule = [
    {
        title : 'Лекция 1. Адаптивная вёрстка',
        school : 'Школа разработки интерфейсов',
        teacher : 'Дмитрий Душкин',
        date : '03/03/2017'
    },
    {
        title : 'Лекция 2. Работа с сенсорным пользовательским вводом',
        school : 'Школа разработки интерфейсов',
        teacher : 'Дмитрий Душкин',
        date : '03/17/2017'
    },
    {
        title : 'Лекция 3. Мультимедиа: возможности браузера',
        school : 'Школа разработки интерфейсов',
        teacher : 'Максим Васильев',
        date : '04/01/2017'
    },
    {
        title : 'Лекция 4. Нативные приложения на веб-технологиях',
        school : 'Школа разработки интерфейсов',
        teacher : 'Сергей Бережной',
        date : '04/15/2017'
    },
    {
        title : 'Лекция 5. Клиентская оптимизация: базовые знания и лучшие практики',
        school : 'Школа разработки интерфейсов',
        teacher : 'Андрей Морозов',
        date : '04/20/2017'
    },
    {
        title : 'Лекция 6. Клиентская оптимизация: мобильные устройства и инструменты',
        school : 'Школа разработки интерфейсов',
        teacher : 'Иван Карев',
        date : '05/01/2017'
    }
];

function clearHTML(element) {
    element.innerHTML = '';
}

function setHTML(element, html) {
    element.innerHTML = html;
}

function getItemObjectHTML() {
    const template = document.getElementById('template-item').cloneNode(true);;
    template.id = '';
    return template;
}

function getFormatDate(date) {
    var monthNames = [
        "Января", "Февраля", "Марта",
        "Апреля", "Мая", "Июня", "Июля",
        "Августа", "Сентября", "Октября",
        "Ноября", "Декабря"
    ];

    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();

    return day + ' ' + monthNames[month] + ' ' + year;
}

function setupItem(item, data) {
    const title = item.querySelector('.title');
    const school = item.querySelector('.school');
    const teacher = item.querySelector('.teacher');
    const date = item.querySelector('.date-text');

    const strDate = getFormatDate(new Date(data.date));

    setHTML(title, data.title);
    setHTML(school, data.school);
    setHTML(teacher, data.teacher);
    setHTML(date, strDate);

    return item;
}

function showList(list, data) {
    clearHTML(list);
    data.map(function (a) {
        list.appendChild(setupItem(getItemObjectHTML(), a));
    });

}

document.addEventListener("DOMContentLoaded", function(event) {

    const list = document.getElementById('list');
    const tabs = document.getElementById('tabs');
    const form = document.getElementById('filters-form');
    const searchInput = document.getElementById('search-input');
    const dateFrom = document.getElementById('date-from');
    const dateTo = document.getElementById('date-to');


    showList(list, schedule);

    form.addEventListener("submit", function(event){
        event.preventDefault();
        // TODO
    });
});