
// header-menu

const indicator = document.querySelector('.header__menu-indicator');
const items = document.querySelectorAll('.header__menu-item');

function handleIndicator(el) {
  items.forEach(item => {
    item.classList.remove('is-active');
    item.removeAttribute('style');
  });

  indicator.style.width = `${el.offsetWidth}px`;
  indicator.style.left = `${el.offsetLeft}px`;
  indicator.style.backgroundColor = el.getAttribute('active-color');

  el.classList.add('is-active');
  el.style.color = el.getAttribute('active-color');
}


items.forEach((item, index) => {
  item.addEventListener('click', (e) => { handleIndicator(e.target) });
  item.classList.contains('is-active') && handleIndicator(item);
});



// scroll to courses

const scrollButton = document.querySelector('.btn__explore[data-goto]');
if (scrollButton) {
  scrollButton.addEventListener("click", onScrollButtonClick);
};

function onScrollButtonClick(e) {
  const scrollButton = e.target;
  if (scrollButton.dataset.goto && document.querySelector(scrollButton.dataset.goto)) {
    const gotoBlock = document.querySelector(scrollButton.dataset.goto);
    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

    window.scrollTo({
      top: gotoBlockValue,
      behavior: "smooth"
    });
    e.preventDefault();
  }
}


// popup


const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");
const video = document.getElementById('popup__video-id');

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}


const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const closeElement = popupCloseIcon[index];
    closeElement.addEventListener('click', function (e) {
      popupClose(closeElement.closest('.popup'));
      e.preventDefault();
    });
  }
}


function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener("click", function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    video.pause();
    if (doUnlock) {
      bodyUnLock()
    }
  }
}


function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  if (lockPadding) {
    for (let index = 0; index < lockPadding.length; index++) {
      const element = lockPadding[index];
      element.style.paddingRight = lockPaddingValue;
    }
  }

  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    for (let index = 0; index < lockPadding.length; index++) {
      const element = lockPadding[index];
      element.style.paddingRight = '0px';
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);

  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}


// header popup (input)

function expand(lbl) {
  const elemId = lbl.getAttribute("for");
  document.getElementById(elemId).style.height = "45px";
  document.getElementById(elemId).classList.add("my-style");
  lbl.style.transform = "translateY(-45px)";
}



// Slider 

const sliderItems = document.querySelectorAll('.slider__item');
const controlls = document.querySelectorAll('.controlls');
let indexSlider = 0;

function show(index) {
  sliderItems[indexSlider].classList.remove('active');
  sliderItems[index].classList.add('active');
  indexSlider = index;
}

controlls.forEach((e) => {
  e.addEventListener('click', () => {
    if (event.target.classList.contains('prev')) {
      let index = indexSlider - 1;

      if (index < 0) {
        index = sliderItems.length - 1;
      }

      show(index)
    } else if (event.target.classList.contains('next')) {
      let index = indexSlider + 1;

      if (index >= sliderItems.length) {
        index = 0;
      }
      show(index);
    }
  })
})

show(indexSlider);




// Text more ( learn more )

const linkBox = document.querySelectorAll(".btn-more");

linkBox.forEach((box) => {
  box.addEventListener("click", () => {
    let elem = document.querySelector(box.getAttribute("href"));
    readItem(elem);
  });
});

function readItem(elem) {
  elem.classList.toggle('_show');
}



// View all

const btnView = document.querySelector(".btn-view__active");

btnView.addEventListener("click", () => {
  let viewItem = document.querySelector(btnView.getAttribute("href"));
  viewAll(viewItem);
});

function viewAll(viewItem) {
  viewItem.classList.toggle('_active');
}






