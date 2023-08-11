import { createApp } from 'vue';
import SplashScreen from './SplashScreen.vue';

const splashApp = createApp(SplashScreen);
splashApp.mount('#app');

setTimeout(() => {
  // 防止 Mock 进页面太快会导致闪屏
  splashApp.unmount();
  import('./main').then(({ initializeApp }) => {
    initializeApp();
  });
}, 10);
