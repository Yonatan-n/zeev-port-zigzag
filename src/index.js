import "./styles.css";
class createCarousleState {
  constructor(list, id) {
    this.list = list;
    this.index = 0;
    this.id = id;
  }
  safeInc(dir) {
    this.index = (this.index + dir + this.list.length) % this.list.length;
  }
}
const state = {
  carousels_img: [
    new createCarousleState(
      ["1.jpg", "2.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "pyramid.jpg"].map(
        (name) => "assets/" + name
      ),
      0
    ),
    new createCarousleState(
      ["1.jpg", "2.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "pyramid.jpg"].map(
        (name) => "assets/" + name
      ),
      0
    ),
    new createCarousleState(
      ["1.jpg", "2.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "pyramid.jpg"].map(
        (name) => "assets/" + name
      ),
      0
    ),
    new createCarousleState(
      ["1.jpg", "2.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "pyramid.jpg"].map(
        (name) => "assets/" + name
      ),
      0
    )
  ]
};

const imagesCaroselSrcs = ["7.jpg", "8.jpg", "pyramid.jpg"].map(
  (name) => "assets/" + name
);

const imagesCaroselSrcs2 = ["1.jpg", "2.jpg", "5.jpg", "6.jpg"].map(
  (name) => "assets/" + name
);

const imagesCaroselSrcs3 = ["3.jpg", "4.jpg"].map((name) => "assets/" + name);
const videoCarosel = [
  "https://www.youtube.com/embed/TMmDebW_OBI",
  "https://www.youtube.com/embed/R6reyiSpKuw",
  "https://www.youtube.com/embed/kUu46J_OHQ4"
];
// window.onload = function (e) {
//   init();
//   loadGallery();
// };
// loadGallery();

function initNavBar() {
  const navs = {
    "#home": "Home",
    "#services1": "Graphic Design",
    "#services2": "Sketches",
    "#services3": "Video Editing",
    "#services4": "Video Animations",
    "#contact": "Contact Me"
  };
  let navBar = document.getElementById("navbar");

  Object.entries(navs).forEach(([href, name]) => {
    let aBtn = document.createElement("a");
    aBtn.className = "navButtons";
    aBtn.href = href;
    aBtn.innerText = name;
    aBtn.onclick = (e) => {
      e.preventDefault();
      let id = e.target.href.split("#")[1];
      document.getElementById(id).scrollIntoView({
        behavior: "smooth"
      });
    };
    navBar.appendChild(aBtn);
  });
}
function TEMP_NO_ACTIVE_CODE() {
  const servicesParent = document.querySelector(".all-services");
  [
    {
      // id: "services1",
      title: "Graphic Design",
      imageSrc: "assets/2.jpg",
      videoSrc: null,
      content:
        "Some of my best graphic designs art, including that one time i that was so funny we shold disccuse it in a businuess meeting"
    },
    {
      // id: "services1",
      title: "Sketch",
      imageSrc: "assets/4.jpg",
      videoSrc: null,
      content:
        "Insperation hit you when you least expect it. who would have tought i would be such avangraduain artist in this day and age?"
    },
    {
      title: "Video Editing",
      imageSrc: null,
      videoSrc: "https://www.youtube.com/embed/TMmDebW_OBI",
      content:
        "Insperation hit you when you least expect it. who would have tought i would be such avangraduain artist in this day and age?"
    }
  ].forEach(({ imageSrc, title, videoSrc, content }, i) => {
    const section = document.createElement("section");
    const image = `<img src="${imageSrc}" />`;
    //"border: black solid 2px;";
    const video = `<iframe 
  src=${videoSrc} type="text/html"
  class="iframe-container" 
  allow="fullscreen; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
  loading="lazy"
  
  ></iframe>`;
    const template = `
  <div class="services-container">
    <div class="service-text-container">
      <h3>${title}</h3>
      <h4>${content}</h4>
    </div>
    <div class="service-image-container">
      ${imageSrc ? image : video}
    </div>
  </div>`;
    section.id = `services${i + 1}`;
    section.className = "services-container-background";
    section.innerHTML = template;
    servicesParent.appendChild(section);
  });
}
[...document.querySelectorAll(".service-image-container > img")].map(
  (img, i) => {
    img.addEventListener("mouseover", function (e) {
      // if (this.isHover !== true && this.isHover !== false) {
      //   this.isHover = false;
      // }

      const img = e.target;
      if (this.isHover) return null;
      this.isHover = true;
      img.classList.add("inline-carousle-out");
      img.ontransitionend = (e) => {
        const current = state.carousels_img[i];
        console.log("first", current.index, this.isHover, e);
        current.safeInc(1);
        img.src = current.list[current.index];
        img.onload = () => {
          img.classList.add("inline-carousle-in");

          img.ontransitionend = (e) => {
            console.log("Done,", e);
            img.classList.remove("inline-carousle-out");
            img.classList.remove("inline-carousle-in");
            setTimeout(() => (this.isHover = false), 500); // to prevent double hover
          };
        };
      };
    });
    return null;
  }
);
// document.getElementById("app").innerHTML = `
// <h1>Hello Vanilla!</h1>
// <div>
//   We use the same configuration as Parcel to bundle this sandbox, you can find more
//   info about Parcel
//   <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
// </div>
// `;

// // When the user scrolls the page, execute myFunction
// window.onscroll = function() {myFunction()};

// // Get the navbar
// var navbar = document.getElementById("navbar");

// // Get the offset position of the navbar
// var sticky = navbar.offsetTop;

// // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
// function myFunction() {
//   if (window.pageYOffset >= sticky) {
//     navbar.classList.add("sticky")
//   } else {
//     navbar.classList.remove("sticky");
//   }
// }

function caroselNextImage(args) {
  const { id, list, idPrev, idNext } = args;
  return (direction) => {
    let container = document.getElementById(id);
    if (direction === 0) {
      document
        .querySelector(idPrev)
        .addEventListener("click", () => caroselNextImage(args)(-1));
      document
        .querySelector(idNext)
        .addEventListener("click", () => caroselNextImage(args)(1));
      let mainImg = document.createElement("img");
      mainImg.src = list[args.index];
      mainImg.className = "carosuel-item";
      container.appendChild(mainImg);
      return;
    }
    let oldImg = container.children[0];
    console.log(oldImg, args.index);
    oldImg.classList.remove("carosel-image-fade-in");
    oldImg.classList.add("carosel-image-fade-out");

    oldImg.ontransitionend = () => {
      console.log("startt");
      args.index = (list.length + (args.index + direction)) % list.length;
      oldImg.src = list[args.index];
      oldImg.classList.remove("carosel-image-fade-out");
      oldImg.classList.add("carosel-image-fade-in");
      oldImg.ontransitionend = () => null;
    };
  };
}

function caroselNextVideo(args) {
  const { id, idPrev, idNext } = args;
  return (direction) => {
    let container = document.getElementById(id);
    let iframe = document.createElement("iframe");
    if (direction === 0) {
      document
        .querySelector(idPrev)
        .addEventListener("click", () => caroselNextImage(args)(-1));
      document
        .querySelector(idNext)
        .addEventListener("click", () => caroselNextImage(args)(1));
      let iframe = document.createElement("iframe");
      iframe.src = args.list[args.index];
      iframe.width = "100%";
      // iframe.height = "200px";
      iframe.style = "border: black solid 2px;";
      iframe.type = "text/html";
      iframe.allowFullscreen = true;
      iframe.allow =
        "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
      iframe.loading = "lazy";
      container.appendChild(iframe);
      return;
    }
    iframe.src = args.list[args.index];
  };
}
(function () {
  window.addEventListener(
    "scroll",
    () => {
      document.body.style.setProperty(
        "--scroll",
        window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
      );
    },
    false
  );
  initNavBar();
  // window.carousel1 = {
  //   id: "carosel-image-container",
  //   index: 0,
  //   list: imagesCaroselSrcs,
  //   idPrev: "#caroselPrev",
  //   idNext: "#caroselNext"
  // };
  // caroselNextImage(window.carousel1)(0);

  // window.carousel2 = {
  //   id: "carosel-image-container2",
  //   index: 0,
  //   list: imagesCaroselSrcs2,
  //   idPrev: "#caroselPrev2",
  //   idNext: "#caroselNext2"
  // };
  // caroselNextImage(window.carousel2)(0);

  // window.carousel3 = {
  //   id: "carosel-image-container3",
  //   index: 0,
  //   list: imagesCaroselSrcs3,
  //   idPrev: "#caroselPrev3",
  //   idNext: "#caroselNext3"
  // };
  // caroselNextImage(window.carousel3)(0);
  // window.carouselVideo = {
  //   id: "carosel-image-container4",
  //   index: 0,
  //   list: videoCarosel,
  //   idPrev: "#caroselPrev4",
  //   idNext: "#caroselNext4"
  // };
  // caroselNextVideo(window.carouselVideo)(0);
  // 2nd carousel
})();
