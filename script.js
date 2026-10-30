gsap.registerPlugin(ScrollTrigger);


const darkToggle = document.getElementById("darkModeToggle");
const root = document.documentElement;


const saved = localStorage.getItem("minu-theme");
if (saved === "light") {
  root.classList.remove("dark");
} else {
  root.classList.add("dark");
}

function syncLabel() {
  darkToggle.textContent = root.classList.contains("dark") ? "☀ Light" : "🌙 Dark";
}
syncLabel();

darkToggle.addEventListener("click", () => {
  root.classList.toggle("dark");
  localStorage.setItem("minu-theme", root.classList.contains("dark") ? "dark" : "light");
  syncLabel();
});



const introTl = gsap.timeline({ defaults: { duration: 0.6 } });

introTl
  .from("header nav", { y: -20, opacity: 0, ease: "back.out(1.4)" })
  .from("#hero h1",   { y: 30, opacity: 0, ease: "power3.out" }, "-=0.3")
  .from("#hero p",    { y: 20, opacity: 0, ease: "power3.out" }, "-=0.25")
  .from("#hero a, #hero button", { y: 15, opacity: 0, stagger: 0.1, ease: "power2.out" }, "-=0.2");
// total ≈ 1.8s — under the 3s limit


document.getElementById("replayBtn").addEventListener("click", () => {
  introTl.restart();
});



const mm = gsap.matchMedia();

mm.add("(prefers-reduced-motion: no-preference)", () => {

  
  introTl.play();

  
  document.querySelectorAll(".reveal").forEach((el) => {
    gsap.from(el, {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });

  
  gsap.to("#progressBar", {
    scaleX: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.3
    }
  });
});


mm.add("(prefers-reduced-motion: reduce)", () => {
  introTl.progress(1);                    // jump intro to end
  gsap.set(".reveal", { clearProps: "all" });
});