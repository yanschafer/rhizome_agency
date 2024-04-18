<template>
  <div class="steps-container" ref="stepsContainer">
    <div class="steps-timeline">
      <div v-for="(step, index) in steps" :key="index" class="step" :class="{ active: currentStepIndex === index }" @click="setStep(index)">
        {{ index + 1 }}
      </div>
    </div>
    <div class="steps-content" ref="stepsContent">
      <div class="steps-text">
        <div class="plane">
          <img class="image-plane" v-if="steps.length > 0" :src="currentStep.img" />
          <div class="flex-col d-flex justify-center items-center plane-col">
            <h1 class="heading text-5xl font-bold text-right">{{ currentStep.title }}</h1>
            <p class="steps-text">{{ currentStep.description }}</p>
            <a class="btn btn-offer">Получить консультацию</a>
          </div>
        </div>
      </div>
    </div>
    <footer ref="footerRef" class="footer">
      <h1 class="heading-small text-5xl font-bold text-right">Срочно требуются сотрудники в штат?</h1>
      <p>Предоставим первых кандидатов в течение 1-2 дней с момента подачи заявки.</p>
    </footer>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  data() {
    return {
      steps: [
        { title: 'Утверждение портрета соискателя', description: 'Качественный портрет соискателя позволяет подобрать идеально подходящего сотрудника', img: '/clipboard.png' },
        { title: 'Создание большого кол-ва откликов на вакансию', description: 'Авторская технология создания потока соискателей позволяет получать огромное кол-во откликов на вакансию', img: '/target.png' },
        { title: 'Отсев резюме', description: 'Начинаем выбирать! - Убираем лишнее. Просматриваем профили соискателей и отсеиваем тех, кто не подходит под портрет соискателя', img: '/magnify.png' },
        { title: 'Проведение первичного интервью', description: 'Мы сами организуем проводим этот этап без участия заказчика', img: '/mic.png' },
        { title: 'Интервью', description: 'Организуем Вам встречу с идеально подходящими на должность кандидатами и выбираем лучшего!', img: '/handshake.png' },
        { title: 'Выход специалиста на работу', description: 'Обучаем и адаптируем нового сотрудника', img: '/study.png' },
        { title: 'Гарантийный срок', description: '90 - 365 дней В течение этого срока которого мы бесплатно заменим сотрудника в случае увольнения', description2: 'По каждой вакансии в договоре предусмотрен гарантийный срок. ', description3: 'Если сотрудник не пройдет испытательный срок мы бесплатно подберём для вас нового', img: '/year.png' },
      ],
      animating: false,
      currentStepIndex: 0,
      footerShown: false,
    };
  },
  computed: {
    currentStep() {
      return this.steps[this.currentStepIndex];
    }
  },
  methods: {
    hideFooter() {
      if (!this.footerShown) return;
      gsap.to(this.$refs.footerRef, {
        opacity: 0,
        transform: "translateY(100%)",
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          this.footerShown = false;}
      });
    },
    changeStep(newIndex) {
// Если анимация уже идет, или пытаемся переключить на последний шаг, когда футер уже показан, выходим
      if (this.animating || (newIndex === this.steps.length - 1 && this.footerShown)) return;
      this.animating = true;

      const tl = gsap.timeline({
        onComplete: () => {
          this.animating = false;
          if (newIndex === this.steps.length - 1) {
            this.footerShown = true; // Обновляем флаг, указывая, что футер показан
            gsap.to(this.$refs.footerRef, {
              opacity: 1,
              transform: "translateY(0%)",
              duration: 0.5,
              ease: "power2.out"
            });
          }
        }
      });

      // Анимация текущего содержимого к исчезновению и уменьшению
      tl.to(this.$refs.stepsContent, {
        opacity: 0,
        scale: 0.5,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          // Обновляем индекс после завершения анимации исчезновения
          this.currentStepIndex = newIndex;
        }
      });

      // Мгновенное обновление к следующему состоянию без видимой задержки
      tl.set(this.$refs.stepsContent, { scale: 0.5, opacity: 0 });

      // Анимация следующего содержимого к появлению и увеличению
      tl.to(this.$refs.stepsContent, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  },
  mounted() {
    gsap.registerPlugin(ScrollTrigger);

    const totalHeight = this.$refs.stepsContainer.offsetHeight * this.steps.length - 50;

    ScrollTrigger.create({
      trigger: this.$refs.stepsContainer,
      start: "top top",
      end: `+=${totalHeight}`,
      pin: true,
      scrub: 1,
      onUpdate: (self) => {
        if (!this.animating) {
          let stepIndex = Math.floor(self.progress * (this.steps.length));
          if (self.progress === 1) {
            stepIndex = this.steps.length - 1;
          }
          if (!(stepIndex === this.steps.length - 1 && this.footerShown)) {
            if (stepIndex !== this.currentStepIndex) {
              this.changeStep(stepIndex);
            }
          }
        }
        // Добавленная логика для скрытия футера при скролле вверх
        if (self.direction === -1) { // Проверяем, скроллим ли мы вверх
          this.hideFooter();
        }
      }
    });
  }
}
</script>


<style scoped>
.step-content {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.placeholder {
  box-shadow: 0px 59px 67px 0px #fefefe, 0px 59px 67px 0px #fefefe, 0px 59px 67px 0px #fefefe;
  background: white;
  width: 100%;
  top: 0;
  position: absolute;
  z-index: 9999999;
  height: 2rem;
}
.steps-text {
  text-align: left;
  font-size: 22px;
  display: flex;
  font-weight: 400;
  transition: all 0.3s ease-in-out;
}
.steps-container {
  background-image: url("../assets/bg.svg");
  background-size: cover;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  color: black;

}

.steps-content {
  transform-origin: center center;
  position: relative;
  display: flex;
  width: 100%;
  justify-content: flex-start;
}

.steps-timeline {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20vw;
}

.step {
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 50%;
  background-color: #ddd;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease-in-out;
  font-weight: 600;
  opacity: 30%;
}

.step.active {
  background-color: #007bff;
  color: white;
  width: 60px;
  height: 60px;
  opacity: 1;
  font-size: 2rem;
}
.heading {
  text-align: left;
  font-size: 50px;
  transition: all 0.3s ease-in-out;
}
.steps-container {
  /* Ваши стили */
}
.heading-small {
  font-weight: 600;
  font-size: 60px;
}
.footer {
  opacity: 0;
  transform: translateY(100%);
  position: absolute;
  bottom: 0;
  height: 10rem;
  background-color: white;
  padding: 3rem;
  background-size: cover;
  border-top: 1px solid #e1e1e1;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
}
.plane {
  background-color: rgba(255, 255, 255, 0.71);
  padding: 2rem;
  display: flex;
  max-width: 70vw;
  border-radius: 20px;
  border: 1px solid #e8e8e8;
}
.image-plane {
  max-width: 25vw;
}
.plane-col {
  display: flex;
  gap: 2rem;
  justify-content: center;
}
.btn-active {
  background-color: blue;
}
</style>
