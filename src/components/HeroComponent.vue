<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export default {
  name: 'HeroComponent',
  data() {
    return {
      lastScrollPosition: 0,
    }
  },
  methods: {
    animateUp() {
      gsap.to(".image-wrapper img", {
        y: 0, // Настроить значение в соответствии с вашими требованиями
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
      });
      gsap.to(".hero-content", {
        y: 0, // Настроить значение в соответствии с вашими требованиями
        opacity: 1,
        duration: 0.5,
        stagger: 0.1,
      });
      gsap.to(".hero", { backgroundImage: "#FFFFFF", duration: 1 });
    },
    animateDown() {
      gsap.to(".image-wrapper img", {
        y: -100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
      });
      gsap.to(".hero-content", {
        y: -100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
      });
      gsap.to(".hero", { backgroundColor: "#некоторый_исходный_цвет", duration: 1 });
    },
    handleScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition > this.lastScrollPosition) {
        // Скролл вниз
        this.animateDown();
      } else {
        // Скролл вверх
        this.animateUp();
      }
      this.lastScrollPosition = currentScrollPosition;
    },
    initParallax() {
      if (this.isMobile()) {
        // Инициализация параллакса для мобильных устройств
        window.addEventListener('deviceorientation', this.handleOrientation);
      } else {
        // Инициализация параллакса для десктопов
        window.addEventListener('mousemove', this.handleMouseMove);
      }
    },
    isMobile() {
      // Простая проверка на мобильное устройство
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },
    handleOrientation(event) {
      const { beta, gamma } = event; // Получение данных ориентации
      gsap.to('.image-1', { x: gamma * 0.5, y: beta * 0.5, ease: "none" });
    },
    animateImages() {
      gsap.to(".image-1", {
        duration: 1.5, // Продолжительность анимации
        y: -20, // Перемещение вверх и вниз на 20px
        ease: "sine.inOut", // Плавное движение вверх и вниз
        yoyo: true, // Возврат в исходное положение
        repeat: -1, // Бесконечное повторение
        delay: 0, // Начальная задержка
      });
      gsap.to(".image-2", {
        duration: 1.2,
        y: -10,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".image-3", {
        duration: 1,
        y: -10,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".image-4", {
        duration: 1.3,
        y: -10,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(".image-5", {
        duration: 1.5,
        y: -10,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    handleMouseMove(event) {
      const { clientX, clientY } = event;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Рассчитываем смещение курсора от центра экрана
      const moveX = (clientX - screenWidth / 2) / (screenWidth / 2);
      const moveY = (clientY - screenHeight / 2) / (screenHeight / 2);

      // Применяем эффект параллакса к изображениям с различной интенсивностью
      gsap.to(".image-1", { x: moveX * 10, y: moveY * 10, ease: "none", overwrite: 'auto' });
      gsap.to(".image-2", { x: moveX * 20, y: moveY * 20, ease: "none", overwrite: 'auto' });
      gsap.to(".image-3", { x: moveX * 15, y: moveY * 15, ease: "none", overwrite: 'auto' });
      gsap.to(".image-4", { x: moveX * 5, y: moveY * 5, ease: "none", overwrite: 'auto' });
      gsap.to(".image-5", { x: moveX * 25, y: moveY * 25, ease: "none", overwrite: 'auto' });
      gsap.to(".image-6", { x: moveX * 15, y: moveY * 15, ease: "none", overwrite: 'auto' });

      gsap.to(".text-container", {
        rotationY: moveX * 5,
        rotationX: moveY * 5,
        transformPerspective: 500, // Увеличивает "глубину" 3D эффекта
        ease: "none",
        overwrite: 'auto'
      });
    }
  },
  mounted() {
    this.lastScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    window.addEventListener('scroll', this.handleScroll);
    this.animateImages();
    window.addEventListener('mousemove', this.handleMouseMove);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('mousemove', this.handleMouseMove);
  },
}
</script>

<template>
  <aos-vue animation="fade-up">
    <div class="hero min-h-screen bg-base-200">
      <div class="images-wrapper animate__animated animate__fadeIn animate__delay-1s">
        <div class="image-wrapper">
          <img class="image-1" src="../assets/hero-images/1.png" height="178" width="122"/>
        </div>
        <div class="image-wrapper">
          <img class="image-2" src="../assets/hero-images/2.png" height="67" width="61"/>
        </div>
        <div class="image-wrapper">
          <img class="image-3" src="../assets/hero-images/3.png" height="300" width="200"/>
        </div>
        <div class="image-wrapper">
          <img class="image-4" src="../assets/hero-images/4.png" height="300" width="200"/>
        </div>
        <div class="image-wrapper">
          <img class="image-5" src="../assets/hero-images/5.png" height="79" width="78"/>
        </div>
        <div class="image-wrapper">
          <img class="image-6" src="../assets/hero-images/6.png" height="178" width="122"/>
        </div>
      </div>
      <div class="hero-content flex-col flex items-center ">
        <div class="flex animate__animated animate__fadeIn animate__delay-0.5s justify-center items-center align-center flex-col text-container">
          <h1 class="animate__animated animate__fadeIn text-center text-5xl font-bold hero-heading">Персонал для<br> вашего бизнеса</h1>
          <p class="py-6 text-neutral offers"> Повышаем эффективность рекрутинга благодаря современным технологиям. <br>Наши соискатели это: <span class="accent">кассиры</span>, <span class="accent">повара</span>, <span class="accent">баристы</span>, <span class="accent">хостес</span> и <span class="accent">промоутеры</span>. <br><br><b>Готовы повысить эффективность вашего бизнеса!?</b></p>
          <div class="flex btn-row flex-row justify-center align-center items-center mb-5">
            <button class="btn btn-outline btn-accent btn-offer animate__animated animate__fadeIn" onclick="modal.showModal()">Оставить заявку</button>
          </div>
          <div class="flex scroll-row flex-row justify-center align-center items-center">
            <svg width="40px" height="100%" viewBox="0 0 247 390" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;">
              <path id="wheel" d="M123.359,79.775l0,72.843" style="fill:none;stroke:#171717;stroke-width:20px;"/>
              <path id="mouse" d="M236.717,123.359c0,-62.565 -50.794,-113.359 -113.358,-113.359c-62.565,0 -113.359,50.794 -113.359,113.359l0,143.237c0,62.565 50.794,113.359 113.359,113.359c62.564,0 113.358,-50.794 113.358,-113.359l0,-143.237Z" style="fill:none;stroke:#171717;stroke-width:20px;"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="placeholder">

      </div>
    </div>
  </aos-vue>
</template>

<style scoped>
@media (max-width: 575.98px) {
  .hero-heading {
    font-size: 1.6rem!important;
  }
  .hero {
    padding-bottom: 5rem!important;
  }
  .hero-img {
    width: 70%!important;
    margin-top: 8rem!important;
  }
}
.hero-heading {
  text-transform: uppercase;
}
.placeholder {
  box-shadow: 0px -37px 67px 0px #fefefe, 0px -37px 67px 0px #fefefe, 0px -37px 67px 0px #fefefe;
  background: white;
  width: 100%;
  bottom: 0;
  position: absolute;
  z-index: 9999999;
  height: 2rem;
}
.hero {
  background-image: url("../assets/hero-images/bg.svg");
  background-color: white;
  color: black;
  z-index: 1;
  position: relative;
}
.lightleak {
  position: absolute;
  z-index: 2;
  bottom: -9vh;
  width: 100%;
}
.lightleak-image {
  width: 30%;
  animation: yoyoMove 10s ease-in-out infinite;
  opacity: 20%;
}
.hero-heading {
  text-align: center;
  text-transform: none;
  font-size: 86px;
}
@keyframes yoyoMove {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-30vw); /* Меняйте это значение, чтобы контролировать дальность движения */
  }
}
.image-1 {
  position: absolute;
  left: 15vw;
  bottom: 6vh;
}
.image-2 {
  position: absolute;
  left: 10vw;
  bottom: 40vh;
}
.image-3 {
  position: absolute;
  left: 13vw;
  top: 20vh;
  border: 0px solid black;
}
.image-4 {
  position: absolute;
  right: 17vw;
  top: 23vh;
}
.image-5 {
  position: absolute;
  right: 10vw;
  top: 44vh;
}
.image-6 {
  position: absolute;
  right: 10vw;
  bottom: 20vh;
}
.marquee-text {
  margin-right: 2rem;
  font-size: 1rem;
  background-color: oklch(0.723603 0.176218 350.048739);
  padding: 1rem;
  color: black;
  overflow: hidden;
  left: 0;
  position: absolute;
  bottom: 0;
}
.hero-content {
  display: flex;
  align-items: center;
}
.btn-offer {
  text-transform: uppercase;
  width: 100%;
  max-width: 30rem;
  text-align: center;
  border-radius: 10px;
  background-color: #1c80ff;
  color: white;
  border: 0px solid #00b3ff;
  box-shadow: 11px 10px 93px 0px rgba(106, 151, 234, 0.9),
  -44px 15px 57px -24px rgba(34, 73, 172, 0.22);
  transition: all 0.3s ease-in-out;
}
.btn-offer:hover {
  text-transform: uppercase;
  background-color: #155fbd;
  color: white;
  box-shadow: 11px 10px 93px 0px rgba(106, 151, 234, 0.3),
  -44px 15px 57px -24px rgba(34, 73, 172, 0.22);
}
.accent {
  color: #1c80ff;
  font-weight: 700;
}
.offers {
  text-align: center;
  font-size: 22px;
  font-weight: 400;
}
.logo-heading {
  font-weight: 900;
  font-size: 4rem;
  color: transparent;
  -webkit-text-stroke: 1px #797979;
  transform:rotate(-90deg);
  top: 13rem;
  position: absolute;
  left: -12rem;
  text-transform: uppercase;
  z-index: -1;
}
.logo-heading-reversed {
  font-weight: 900;
  font-size: 4rem;
  color: transparent;
  -webkit-text-stroke: 1px #797979;
  transform:rotate(90deg);
  bottom: 17rem;
  position: absolute;
  right: -12rem;
  text-transform: uppercase;
  z-index: -1;
}
.btn-row {
  justify-content: center;
}
.scroll-row {
  justify-content: center;
  margin-top: 2rem;
}
.btn-question {
  border-radius: 50%;
  color: white;
  padding: 1.15rem;
  margin-left: 1rem;
}
.tooltip-accent {
  border-radius: 16px!important;
  color: white;
}
@keyframes scroll {
  0% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(100px);
  }
}

svg #wheel {
  animation: scroll ease 1.5s infinite;
}
</style>