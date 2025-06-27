document.addEventListener("DOMContentLoaded", () => {
  // Навигация по меню
  const navLinks = document.querySelectorAll(".sidebar__list__link");
  const sections = document.querySelectorAll(".page-content");

  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const hash = link.getAttribute("href");

      sections.forEach((section) => {
        section.classList.remove("page-content--active");
      });

      const targetSection = document.querySelector(hash);
      if (targetSection) {
        targetSection.classList.add("page-content--active");
      }
    });
  });

  // Загрузка данных пользователя
  function fetchUserData() {
    fetch("https://learn-9fc9-git-main-imsokolovivs-projects.vercel.app/api/adaptation/test")
      .then((response) => response.json())
      .then((data) => {
        const nameElements = document.querySelectorAll(".sidebar__user__name, .header__subtitle");
        nameElements.forEach((el) => {
          el.textContent = data.name;
        });

        const emailEl = document.querySelector(".info__value:nth-of-type(3)");
        if (emailEl) emailEl.textContent = data.email;
      })
      .catch((error) => {
        console.error("Ошибка при получении данных пользователя:", error);
      });
  }

  const editBtn = document.getElementById("editAboutBtn");
  const aboutText = document.getElementById("aboutText");
  const aboutTextarea = document.getElementById("aboutTextarea");

  editBtn.addEventListener("click", () => {
    if (editBtn.textContent === "Редактировать") {
      aboutTextarea.value = aboutText.textContent;
      aboutText.style.display = "none";
      aboutTextarea.style.display = "block";
      editBtn.textContent = "Сохранить";
    } else {
      const updatedText = aboutTextarea.value;
      fetch("https://learn-9fc9-git-main-imsokolovivs-projects.vercel.app/api/adaptation/test", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ about: updatedText }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Ошибка при сохранении данных.");
          return res.json();
        })
        .then(() => {
          aboutText.textContent = updatedText;
          aboutText.style.display = "block";
          aboutTextarea.style.display = "none";
          editBtn.textContent = "Редактировать";
        })
        .catch((err) => {
          console.error("Ошибка при сохранении 'О себе':", err);
          alert("Не удалось сохранить изменения.");
        });
    }
  });

  // Запуск получения данных пользователя при загрузке страницы
  fetchUserData();
});
