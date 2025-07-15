document.addEventListener("DOMContentLoaded", function () {
  // URL вашего API
  const apiUrl = "https://learn-9fc9-git-main-imsokolovivs-projects.vercel.app/api/adaptation/test";

  // Функция для выполнения GET-запроса
  async function fetchData() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Ошибка при получении данных");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Ошибка:", error);
      return null;
    }
  }

  // Функция для заполнения данных пользователя
  function populateUserData(employee) {
    // Заполняем основную информацию
    document.querySelector(".sidebar__user__name").textContent = `${employee.firstName} ${employee.secondName}`;

    document.querySelector(".header__subtitle").textContent =
      `${employee.firstName} ${employee.secondName} ${employee.lastName}`;

    document.querySelector(".user__icon").src = employee.photo;

    // Заполняем информацию в профиле
    const infoItems = document.querySelectorAll(".info__item, .info_2__item");
    infoItems[0].querySelector(".info__value").textContent = employee.organization;
    infoItems[1].querySelector(".info__value").textContent = employee.department;
    infoItems[2].querySelector(".info__value").textContent = employee.phone;
    infoItems[3].querySelector(".info_2__value").textContent = employee.department;
    infoItems[4].querySelector(".info_2__value").textContent = employee.position;
    infoItems[5].querySelector(".info_2__value").textContent = employee.officeAddress;

    // Заполняем раздел "О себе"
    document.getElementById("aboutText").textContent = employee.about;
  }

  // Функция для заполнения документов
  function populateDocuments(documents) {
    const docsList = document.querySelector(".documents__list");
    docsList.innerHTML = ""; // Очищаем существующие элементы

    documents.forEach((doc) => {
      const docItem = document.createElement("li");
      docItem.className = "documents__item";

      // Определяем иконку в зависимости от типа документа
      let iconSrc = "public/icons/Files.png";
      if (doc.includes("Паспорт")) iconSrc = "public/icons/pasport.png";
      else if (doc.includes("Трудовая")) iconSrc = "public/icons/workBook.png";
      else if (doc.includes("СНИЛС") || doc.includes("ИНН")) iconSrc = "public/icons/snilsINN.png";
      else if (doc.includes("Военный")) iconSrc = "public/icons/soulja.png";
      else if (doc.includes("Диплом")) iconSrc = "public/icons/diplom.png";
      else if (doc.includes("адрес")) iconSrc = "public/icons/adrees.png";
      else if (doc.includes("телефон")) iconSrc = "public/icons/phone.png";
      else if (doc.includes("почты")) iconSrc = "public/icons/email.png";
      else if (doc.includes("карты")) iconSrc = "public/icons/bankcard.png";
      else if (doc.includes("НДФЛ")) iconSrc = "public/icons/spravka.png";

      docItem.innerHTML = `
        <img class="docs__img" src="${iconSrc}" alt="${doc}" />
        <h4>${doc}</h4>
        <p class="documents__description">${getDocumentDescription(doc)}</p>
      `;

      docsList.appendChild(docItem);
    });
  }

  // Функция для получения описания документа
  function getDocumentDescription(docName) {
    const descriptions = {
      "Паспорт РФ": "Необходимо предоставить оригинал и копию паспорта",
      "Трудовая книжка либо форма СТД-Р": "Трудовая книжка либо форма СТД-P с предыдущего места работы",
      СНИЛС: "Страховое свидетельство государственного пенсионного страхования",
      ИНН: "Свидетельство о постановке на учёт в налоговом органе",
      "Военный билет (для военнообязанных)": "Военный билет для военнообязанных либо документ, его заменяющий",
      "Диплом об образовании": "Диплом (свидетельство, сертификат и т.д.) об образовании",
      "Фактический адрес (если отличается от прописки)": "Если отличается от прописки",
      "Номер телефона": "Контактный номер телефона",
      "Адрес личной электронной почты": "Личный e-mail для связи",
      "Реквизиты банковской карты": "Для перечисления заработной платы",
      "Справка по форме 2-НДФЛ": "Нужна для налоговых вычетов на детей",
    };

    return descriptions[docName] || "Необходимо предоставить указанный документ";
  }

  // Функция для заполнения контактов наставников и HR
  function populateContacts(mentors, helpContacts) {
    // Заполняем наставника
    if (mentors && mentors.length > 0) {
      const mentor = mentors[0];
      const mentorBlock = document.querySelectorAll(".mentors__person")[1];

      mentorBlock.querySelector(".mentors__name").textContent = mentor.fullName;
      mentorBlock.querySelector(".mentors__position").textContent = mentor.position;

      // Добавляем контакты
      const mentorContacts = mentorBlock.querySelector(".contact__list");
      mentorContacts.innerHTML = `
        <a href="mailto:${mentor.email}" class="contact__icon">
          <img src="public/icons/sms1.png" alt="email">
        </a>
        <a href="tel:${mentor.phone.replace(/[^0-9+]/g, "")}" class="contact__icon">
          <img src="public/icons/phonenum.png" alt="phone">
        </a>
      `;
    }

    // Заполняем HR-специалиста
    if (helpContacts && helpContacts.length > 0) {
      const hr = helpContacts[0];
      const hrBlock = document.querySelectorAll(".contacts__person")[2];

      hrBlock.querySelector(".contacts__name").textContent = hr.fullName;
      hrBlock.querySelector(".contacts__position").textContent = hr.position;
      hrBlock.querySelector(".contacts__responsibility").textContent = "Вопросы:";

      const questionsList = hrBlock.querySelector(".contacts__list");
      questionsList.innerHTML = hr.questions.map((q) => `<li class="contacts__item">${q}</li>`).join("");

      // Добавляем контакты
      const hrContacts = hrBlock.querySelector(".contact__list");
      hrContacts.innerHTML = `
        <a href="mailto:${hr.email}" class="contact__icon">
          <img src="public/icons/sms1.png" alt="email">
        </a>
        <a href="tel:${hr.phone.replace(/[^0-9+]/g, "")}" class="contact__icon">
          <img src="public/icons/phonenum.png" alt="phone">
        </a>
      `;
    }
  }

  // Основная функция инициализации
  async function init() {
    const data = await fetchData();
    if (data) {
      populateUserData(data.employee);
      populateDocuments(data.documents);
      populateContacts(data.mentors, data.helpContacts);
    }
  }

  // Запускаем приложение
  init();
});
