import "./assets/css/style.css";

/* _________________________ cursor _________________________  */
/* _________________________ cursor _________________________  */
/* _________________________ cursor _________________________  */
const cursor = {
  $el: document.querySelector(".cursor"),
  $each_trg: document.querySelectorAll(".trg-mouse"),
  $text: document.querySelector(".cursor__change"),
  $each_value: document.querySelectorAll(".values__card__ctn"),
};

// hide values description
cursor.$each_value.forEach((el) => {
  el.style.opacity = "0";
});

// show initial value (punctuality) as default
cursor.$each_value[0].style.opacity = "1";

// mouse position
const mouse = { x: 0, y: 0 };
// cursor postion
const pos = { x: 0, y: 0 };
// delay follow cursor
const ratio = 0.075;
// set date
const start = Date.now();
const current = start;
const elapsed = 0;
const delta = 16;

// bind
const bindEvents = () => {
  document.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  cursor.$each_trg.forEach((el, index) => {
    el.addEventListener("mouseenter", () => {
      // cursor hover effect
      let text_cursor = el.getAttribute("data-cursor");
      cursor.$el.classList.add("is-mouse");

      if (el.getAttribute("data-cursor")) {
        cursor.$text.innerHTML = text_cursor;
        cursor.$text.style.opacity = "1";
        cursor.$text.style.fontSize = "1.2rem";

        // values hover interaction
        cursor.$each_value[index].classList.add("values__card__display");
        cursor.$each_value[0].style.opacity = "0";
        cursor.$each_value[index].style.opacity = "1";
        cursor.$each_value[index].style.transition =
          "opacity 0.225s ease-in-out";
      }
    });
    el.addEventListener("mouseleave", () => {
      // cursor hover effect
      cursor.$el.classList.remove("is-mouse");
      cursor.$text.innerHTML = "LEARN";

      // values hover interaction
      cursor.$text.style.opacity = "0";
      cursor.$each_value[index].classList.remove("values__card__display");
      cursor.$each_value[index].style.transition = "opacity 0.225s ease-in-out";
      if (cursor.$each_value[index].style.opacity == "1") {
        cursor.$each_value[index].style.opacity = "0";
      }
      cursor.$each_value[0].style.opacity = "1";
    });
  });
};

const tick = () => {
  pos.x += (mouse.x - pos.x) * ratio;
  pos.y += (mouse.y - pos.y) * ratio;

  cursor.$el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
  window.requestAnimationFrame(() => {
    tick();
  });
};

// join the events below
bindEvents();

tick();
