gsap.to("#Scroll_div1", {
    x: "-=100%",
    duration: 30, // Adjust duration as needed
    repeat: -1,
    ease: "linear",
    onRepeat: () => {
        gsap.set("#Scroll_div1 div", { x: 0 });
    }
  });