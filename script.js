function locoscroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });
  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locoscroll(); // <--- semicolon added here

function cursorEffect() {
  var page1Content = document.querySelector("#page1-content");
  var cursor = document.querySelector("#cursor");

  page1Content.addEventListener("mousemove", function (dets) {
    //this also work with the help of javascript direct
    // cursor.style.left = dets.x+"px";
    // cursor.style.top = dets.y+"px";
    gsap.to("#cursor", {
      x: dets.x,
      y: dets.y,
    });
  });
  page1Content.addEventListener("mouseenter", function (dets) {
    gsap.to("#cursor", {
      scale: 1,
      opacity: 1,
    });
  });
  page1Content.addEventListener("mouseleave", function (dets) {
    gsap.to("#cursor", {
      scale: 0,
      opacity: 0,
    });
  });
}
cursorEffect();

function heading2() {
  gsap.from("#heading-page2", {
    y: 120,
    y: 0, // Move to 0px from 120px
    stagger: 0.2,
    duration: 1,
    scrollTrigger: {
      trigger: "#page2",
      scroller: "#page2", // Animate within #page2
      start: "top top",
      end: "bottom bottom",
    },
  });
}
heading2(); // <--- semicolon added here

function swiperjs() {
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: true,
    },
  });
}
swiperjs(); // <--- semicolon added here