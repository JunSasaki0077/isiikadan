let swipeOption = {
  loop: true,
  effect: "fade",
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  speed: 2000,
};
new Swiper(".swiper-container", swipeOption);

$(function () {
  $(".js-modal-open").on("click", function () {
    $(".js-modal").fadeIn();
    $("body").addClass("modal-no_scroll");
    return false;
  });
  $(".js-modal-close").on("click", function () {
    $("js-modal").attr("style", "");
    $("body").removeClass("modal-no_scroll");
    $(".js-modal").fadeOut();
    return false;
  });
});

flatpickr(".flatpickr", {
  minDate: "today",
  mode: "range",
});

AOS.init({
  offset: 100,
  duration: 1000,
  easing: "ease",
  delay: 100,
  once: false,
  anchorPlacement: "bottom-center",
});

window.addEventListener("scroll", function () {
  let header = document.querySelector(".top-header");
  if ($(header).hasClass("top-header")) {
    header.classList.toggle("js-top-header", window.scrollY > 0);
  } else;
});

window.onscroll = function () {
  let scrollTop = window.pageYOffset;

  if (scrollTop == 0) {
    $(".top-header__logo").css("opacity", "1");
    $(".top-header__logo").css("transition", "0.5s");

    $(".js-top-header__logo").css("opacity", "0");
    $(".js-top-header__logo").css("transition", "0.5s");
  }
  if (scrollTop > 10) {
    $(".top-header__logo").css("opacity", "0");
    $(".top-header__logo").css("transition", "0.5s");

    $(".js-top-header__logo").css("opacity", "1");
    $(".js-top-header__logo").css("transition", "0.5s");
  }
};

$(function () {
  let tabs = $(".news__nav-item");
  $(".news__nav-item").on("click", function () {
    $(".js-active").removeClass("js-active");
    $(this).addClass("js-active");
    const index = tabs.index(this);
    $(".news__wrapper").removeClass("js-show").eq(index).addClass("js-show");
  });
});

$(".burger-btn").on("click", function () {
  $(".burger-btn").toggleClass("active");
  $(".js-gnav").fadeToggle(500);
  return false;
});

let nav = $(".burger-btn");
$("section").click(function () {
  if (nav.hasClass("active")) {
    $(".burger-btn").removeClass("active");
    $(".js-gnav").fadeToggle(500);
  }
});
