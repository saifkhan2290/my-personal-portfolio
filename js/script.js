const SITE_CONFIG = {
  email: "saifaptech30@gmail.com"
};

const PROJECTS = {
  vital: {
    kicker: "FIGMA TO WORDPRESS · ECOMMERCE",
    title: "Vital Nora",
    description: "A custom Figma design converted into a responsive WordPress eCommerce experience with polished product presentation and a clean wellness-focused visual system.",
    focus: "Figma implementation, Elementor Pro development, responsive refinement and WooCommerce presentation.",
    tools: "Figma · WordPress · Elementor Pro · WooCommerce",
    url: "https://vitalnora.com/"
  },
  velora: {
    kicker: "FIGMA TO WORDPRESS",
    title: "Velora Wellness Studio",
    description: "A premium custom Figma design translated into an accurate, responsive WordPress website with close attention to typography, spacing and visual detail.",
    focus: "Figma implementation, responsive development, Elementor Pro and front-end refinement.",
    tools: "Figma · WordPress · Elementor Pro · Custom CSS",
    url: "https://velorawellnessstudio.com/"
  },
  drone: {
    kicker: "FIGMA TO WORDPRESS · SERVICE WEBSITE",
    title: "Drone Spraying Victoria",
    description: "A custom Figma-to-WordPress build for agricultural and commercial drone spraying, designed around strong service communication and quote-focused conversion paths.",
    focus: "Custom Figma implementation, responsive service layout, Elementor Pro and conversion-focused structure.",
    tools: "Figma · WordPress · Elementor Pro · Responsive Development",
    url: "https://dronesprayingvictoria.com.au/"
  },
  identity: {
    kicker: "FIGMA TO WORDPRESS · CORPORATE",
    title: "Identity Center",
    description: "A custom Figma-to-WordPress corporate website with structured content sections, clean hierarchy and consistent responsive presentation.",
    focus: "Figma implementation, Elementor Pro, responsive layout and front-end customization.",
    tools: "Figma · WordPress · Elementor Pro · HTML/CSS",
    url: "https://identity-center.net/"
  },
  deltatones: {
    kicker: "FIGMA TO WORDPRESS · ENTERTAINMENT",
    title: "Deltatones",
    description: "A bold custom Figma design converted into a responsive WordPress website for a live music duo, with strong media presentation and booking-focused calls to action.",
    focus: "Figma implementation, visual hierarchy, responsive media presentation and Elementor Pro development.",
    tools: "Figma · WordPress · Elementor Pro · Custom CSS",
    url: "https://skyblue-penguin-704713.hostingersite.com/"
  },
  harvest: {
    kicker: "FIGMA TO WORDPRESS · CORPORATE",
    title: "Harvest Connect",
    description: "A clean custom Figma-to-WordPress corporate build with restrained visual styling, clear information architecture and polished responsive behavior.",
    focus: "Figma implementation, corporate content structure, responsive page building and front-end refinement.",
    tools: "Figma · WordPress · Elementor Pro · Responsive Development",
    url: "https://darkblue-swan-671805.hostingersite.com/"
  }
};

(function($){
  "use strict";
  const $window=$(window), $header=$("#siteHeader"), $progress=$(".scroll-progress span");

  setTimeout(()=>$(".page-loader").addClass("hide"),1050);
  setTimeout(()=>$(".hero").addClass("loaded"),1120);

  const sections=["about","skills","journey","work","contact"];
  function onScroll(){
    const y=window.scrollY;
    $header.toggleClass("scrolled",y>18);
    const max=document.documentElement.scrollHeight-window.innerHeight;
    $progress.css("width",(max?y/max*100:0)+"%");
    let current="";
    sections.forEach(id=>{const el=document.getElementById(id);if(el&&y+180>=el.offsetTop)current=id;});
    $(".nav-link").removeClass("active").filter(`[href="#${current}"]`).addClass("active");
  }
  $window.on("scroll",onScroll);onScroll();

  $(".menu-toggle").on("click",function(){
    const open=!$(".mobile-nav").hasClass("open");
    $(".mobile-nav").toggleClass("open",open);
    $(this).attr("aria-expanded",open);
  });

  function scrollToSection(hash, updateHash=true){
    if(!hash || hash==="#") return false;
    const target=document.querySelector(hash);
    if(!target) return false;
    const headerHeight=document.getElementById("siteHeader")?.offsetHeight || 72;
    const top=target.getBoundingClientRect().top+window.pageYOffset-headerHeight-16;
    window.scrollTo({top:Math.max(0,top),behavior:"smooth"});
    if(updateHash && history.pushState){history.pushState(null,"",hash);}
    return true;
  }

  $(document).on("click",'a[href^="#"]',function(e){
    const href=this.getAttribute("href");
    if(scrollToSection(href)){
      e.preventDefault();
      $(".mobile-nav").removeClass("open");
      $(".menu-toggle").attr("aria-expanded","false");
      $(".nav-link").removeClass("active");
      $(".nav-link").filter(`[href="${href}"]`).addClass("active");
    }
  });

  if(window.location.hash){
    setTimeout(()=>scrollToSection(window.location.hash,false),120);
  }

  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.11});
  document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

  $(".filter-btn").on("click",function(){const filter=$(this).data("filter");$(".filter-btn").removeClass("active");$(this).addClass("active");$(".project-card").each(function(){const match=filter==="all"||String($(this).data("category")||"").includes(filter);$(this).stop(true,true)[match?"fadeIn":"fadeOut"](260);});});


  const $modal=$("#projectModal");
  $(".project-open").on("click",function(){const p=PROJECTS[$(this).data("project")];if(!p)return;$("#modalKicker").text(p.kicker);$("#modalTitle").text(p.title);$("#modalDescription").text(p.description);$("#modalFocus").text(p.focus);$("#modalTools").text(p.tools);$("#modalLive").attr("href",p.url);$modal.addClass("open").attr("aria-hidden","false");$("body").addClass("modal-open");});
  function closeModal(){$modal.removeClass("open").attr("aria-hidden","true");$("body").removeClass("modal-open");}
  $("[data-close-modal]").on("click",closeModal);$(document).on("keydown",e=>{if(e.key==="Escape")closeModal();});

  if(window.matchMedia("(pointer:fine)").matches){
    const dot=document.querySelector(".cursor-dot"),ring=document.querySelector(".cursor-ring");let mx=0,my=0,rx=0,ry=0;dot.style.opacity=ring.style.opacity=1;
    document.addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`;});
    function animateCursor(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;requestAnimationFrame(animateCursor);}animateCursor();
    $("a,button,.project-shot").on("mouseenter",()=>ring.classList.add("hover")).on("mouseleave",()=>ring.classList.remove("hover"));
  }

  $(".magnetic").on("mousemove",function(e){if(window.innerWidth<768)return;const r=this.getBoundingClientRect(),x=e.clientX-r.left-r.width/2,y=e.clientY-r.top-r.height/2;$(this).css("transform",`translate(${x*.12}px,${y*.12}px)`);}).on("mouseleave",function(){$(this).css("transform","");});

  $(".project-card").on("mousemove",function(e){if(window.innerWidth<900)return;const r=this.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;$(this).find(".project-shot").css("transform",`perspective(900px) rotateY(${x*1.3}deg) rotateX(${-y*1.3}deg)`);}).on("mouseleave",function(){$(this).find(".project-shot").css("transform","");});

  if(SITE_CONFIG.email){$("#emailDisplay").attr("href",`mailto:${SITE_CONFIG.email}`).text(SITE_CONFIG.email);$("#heroEmail").attr("href",`mailto:${SITE_CONFIG.email}`);}
  $("#year").text(new Date().getFullYear());
})(jQuery);

/* Contact form UX: FormSubmit handles delivery on GitHub Pages. */
(function($){
  const $form = $("#contactForm");
  if(!$form.length) return;
  $form.on("submit", function(){
    const $btn = $(this).find(".form-submit");
    $btn.find("span").text("Sending...");
    $btn.prop("disabled", true);
  });
})(jQuery);
