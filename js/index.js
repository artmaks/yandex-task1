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

var teachers = {
    "Дмитрий Душкин" : {
        photo : "assets/imgs/teachers/dmitry.jpeg",
        about : "Кандидат технических наук, научный сотрудник ИПУ РАН с 2008 по 2013. " +
        "Пришёл в Яндекс.Картинки в 2014 году, отвечал за мобильную версию и рост " +
        "производительности сервиса. В 2016 перешёл в Yandex Data Factory," +
        "где разрабатывает интерфейсы и дизайн веб-приложений для B2B."

    }
};

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

function getScheduleForTeacher(data, name) {
    const filterData = data.filter(function (a) {
        if(a.teacher.indexOf(name) !== -1) {
            return true;
        }
    });
    return filterData;
}

function getScheduleMinDate(data, date) {
    const filterData = data.filter(function (a) {
        const itemDate = new Date(a.date);
        itemDate.setHours(0,0,0,0);
        date.setHours(0,0,0,0);
        if(itemDate.getTime() >= date.getTime()) {
            return true;
        }
    });
    return filterData;
}

function getScheduleMaxDate(data, date) {
    const filterData = data.filter(function (a) {
        const itemDate = new Date(a.date);
        itemDate.setHours(0,0,0,0);
        date.setHours(0,0,0,0);
        if(itemDate.getTime() <= date.getTime()) {
            return true;
        }
    });
    return filterData;
}

function setupItem(item, data) {
    const title = item.querySelector('.title');
    const school = item.querySelector('.school');
    const teacher = item.querySelector('.teacher-text');
    const date = item.querySelector('.date-text');

    const teacherName = item.querySelector('.name');
    const teacherAbout = item.querySelector('.about');
    const teacherPhoto = item.querySelector('.teacher-photo');

    const strDate = getFormatDate(new Date(data.date));

    setHTML(title, data.title);
    setHTML(school, data.school);
    setHTML(teacher, data.teacher);
    setHTML(date, strDate);
    setHTML(name, teacher);
    teacherData = teachers[data.teacher];

    if(teacherData) {
        setHTML(teacherName, data.teacher);
        setHTML(teacherAbout, teacherData.about);
        teacherPhoto.src = teacherData.photo;
    } else {
        const tooltip = item.querySelector('.tooltiptext');
        tooltip.parentNode.removeChild(tooltip);
    }
    return item;
}

function showList(list, data) {
    clearHTML(list);
    data.map(function (a) {
        list.appendChild(setupItem(getItemObjectHTML(), a));
    });
}

function getFilteredData(data, name, date1, date2) {
    var filtered = getScheduleForTeacher(data, name);
    filtered = !isNaN(date1.getTime()) ? getScheduleMinDate(filtered, date1) : filtered;
    filtered = !isNaN(date2.getTime()) ? getScheduleMaxDate(filtered, date2) : filtered;
    return filtered;
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

    });

    searchInput.addEventListener("change", function (event) {
        const searchInputValue = searchInput.value;
        const dateFromValue = new Date(dateFrom.value);
        const dateToValue = new Date(dateTo.value);

        const filtered = getFilteredData(schedule, searchInputValue, dateFromValue, dateToValue);
        showList(list, filtered);
    });

    dateFrom.addEventListener("change", function (event) {
        const searchInputValue = searchInput.value;
        const dateFromValue = new Date(dateFrom.value);
        const dateToValue = new Date(dateTo.value);

        const filtered = getFilteredData(schedule, searchInputValue, dateFromValue, dateToValue);
        showList(list, filtered);
    });

    dateTo.addEventListener("change", function (event) {
        const searchInputValue = searchInput.value;
        const dateFromValue = new Date(dateFrom.value);
        const dateToValue = new Date(dateTo.value);

        const filtered = getFilteredData(schedule, searchInputValue, dateFromValue, dateToValue);
        showList(list, filtered);
    });
});