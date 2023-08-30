import { useSettingsStore } from '@/store/settings';
import { useEventListener } from '@vueuse/core';
import { storeToRefs } from 'pinia';
import { ref, watchEffect } from 'vue';


const mql = window.matchMedia('(prefers-color-scheme: dark)');

// 通用变量
const commonVariables = {
  'safe-area-side': '16px',
  'item-card-radios': '12px',
};

// 获取主题文件夹内的主题
// const getThemeModules = () => {
//   const allThemes = {};
//   // 读取主题文件内容
//   const modulesFiles = import.meta.globEager('@/themes/*.ts');
//   const keys = Object.keys(modulesFiles);

//   // 初始化为主题表，继承合并
//   keys.forEach(path => {
//     const paths = path.split('/');
//     const modulesName = paths[paths.length - 1].replace('.ts', '');
//     // allThemes[modulesName] = modulesFiles[path]?.default;
//     allThemes[modulesName] = (modulesFiles[path] as any)?.default;

//   });

//   // 初始化 theme 表后开始处理继承关系
//   for (const key in allThemes) {
//     const current = allThemes[key];
//     const extend = current.meta.extend;
//     if (extend) {
//       const extendModule = allThemes[extend];
//       if (extendModule) {
//         // 拷贝一份原有继承和目标主题的 color 对象，解构复制覆盖目标主题颜色, 将通用变量覆盖进去
//         current.colors = {
//           ...{ ...extendModule.colors },
//           ...{ ...current.colors },
//         };
//       } else {
//         console.error(`${extend} 主题不存在`);
//       }
//     }
//   }
//   return allThemes;
// };
// const modules = getThemeModules();
// console.log(JSON.stringify(modules))

const modules = {"dark":{"meta":{"name":"基础夜间","author":"DesnLee","label":"dark","extend":""},"colors":{"primary-color":"#478EF2","primary-color-end":"#496AF2","second-color":"#FA6419","third-color":"#0ED57D","danger-color":"#E56459","succeed-color":"#49bb88","icon-nav-bar-right":"#606266","unimportant-icon-color":"#FFFFFF34","status-bar-background-color":"#121212","background-color":"#121212","nav-bar-color":"#12121299","tab-bar-color":"#121212AA","popup-color":"#121212","divider-color":"#FFFFFF08","card-color":"#202020","dialog-color":"#202020","switch-close-background-color":"#FFFFFF14","switch-active-background-color":"#478EF2","compare-item-background-color":"#191919","picker-mask-near-color":"#12121248","picker-mask-far-color":"#121212","primary-text-color":"#FFFFFFEE","second-text-color":"#FFFFFFBB","comment-text-color":"#FFFFFF88","lowest-text-color":"#FFFFFF36","img-brightness":"100","nav-bar-blur":"16px","tab-bar-blur":"16px","sticky-title-blur":"16px","compare-tag-text-color":"#FFFFFF88","compare-tag-background-color":"#FFFFFF22"}},"darkblue":{"meta":{"name":"DarkBlue","author":"Keywos","label":"dark","extend":"dark"},"colors":{"primary-color":"#6f9cc5","primary-color-end":"#8389c8","second-color":"#c5565a","third-color":"#70b496","danger-color":"#c16058","succeed-color":"#49bb88","icon-nav-bar-right":"#606266","unimportant-icon-color":"#FFFFFF34","status-bar-background-color":"#141416","background-color":"#141416","nav-bar-color":"#141416","tab-bar-color":"#1414168f","popup-color":"#141416","divider-color":"#FFFFFF08","card-color":"#212126","dialog-color":"#202020","switch-close-background-color":"#FFFFFF14","switch-active-background-color":"#478EF2","compare-item-background-color":"#1e1e21","picker-mask-near-color":"#12121248","picker-mask-far-color":"#121212","primary-text-color":"#bcbac1","second-text-color":"#FFFFFFBB","comment-text-color":"#FFFFFF88","lowest-text-color":"#FFFFFF36","img-brightness":"100","nav-bar-blur":"16px","tab-bar-blur":"16px","sticky-title-blur":"16px","compare-tag-text-color":"#FFFFFF88","compare-tag-background-color":"#FFFFFF22"}},"light":{"meta":{"name":"基础日间","author":"DesnLee","label":"light","extend":""},"colors":{"primary-color":"#478EF2","primary-color-end":"#496AF2","second-color":"#FA6419","third-color":"#0ED57D","danger-color":"#E56459","succeed-color":"#0ED57D","icon-nav-bar-right":"#606266","unimportant-icon-color":"#00000034","status-bar-background-color":"#F4F4F4BB","background-color":"#F4F4F4","nav-bar-color":"#F4F4F4BB","tab-bar-color":"#F4F4F4BB","popup-color":"#F4F4F4","divider-color":"#00000006","card-color":"#FAFAFA","dialog-color":"#F8F8F8","switch-close-background-color":"#00000012","switch-active-background-color":"#478EF2","compare-item-background-color":"#EEEEEE","picker-mask-near-color":"#F4F4F448","picker-mask-far-color":"#F4F4F4","primary-text-color":"#303133","second-text-color":"#606266","comment-text-color":"#909399","lowest-text-color":"#c0c4cc","img-brightness":"0","nav-bar-blur":"16px","tab-bar-blur":"16px","sticky-title-blur":"16px","compare-tag-text-color":"#707277","compare-tag-background-color":"#c0c4cc"}},"lightblue":{"meta":{"name":"LightBlue","author":"Keywos","label":"light","extend":"light"},"colors":{"primary-color":"#a5ccee","primary-color-end":"#afb6fb","second-color":"#d4aaf8","third-color":"#70b496","danger-color":"#ff5a4c","succeed-color":"#49bb88","icon-nav-bar-right":"#92959d","unimportant-icon-color":"#00000034","status-bar-background-color":"#F4F4F4BB","background-color":"#F4F4F4","nav-bar-color":"#F4F4F4BB","tab-bar-color":"#F4F4F4BB","popup-color":"#F4F4F4","divider-color":"#00000006","card-color":"#FAFAFA","dialog-color":"#F8F8F8","switch-close-background-color":"#00000012","switch-active-background-color":"#478EF2","compare-item-background-color":"#EEEEEE","picker-mask-near-color":"#F4F4F448","picker-mask-far-color":"#F4F4F4","primary-text-color":"#303133","second-text-color":"#606266","comment-text-color":"#909399","lowest-text-color":"#c0c4cc","img-brightness":"0","nav-bar-blur":"16px","tab-bar-blur":"16px","sticky-title-blur":"16px","compare-tag-text-color":"#707277","compare-tag-background-color":"#c0c4cc"}},"mocha":{"meta":{"name":"摩卡","author":"Peng-YM","label":"light","extend":"light"},"colors":{"primary-color":"#75abcd","primary-color-end":"#75abcd","second-color":"#a2483b","third-color":"#83b9b2","danger-color":"#b53a29","succeed-color":"#0ED57D","icon-nav-bar-right":"#606266","unimportant-icon-color":"#00000034","status-bar-background-color":"#F4F4F4BB","background-color":"#f5f3ee","nav-bar-color":"#f4f4f4bb","tab-bar-color":"#f4f4f4bb","popup-color":"#ece7df","divider-color":"#e0d7c8","card-color":"#ece7df","dialog-color":"#ece7df","switch-close-background-color":"#00000012","switch-active-background-color":"#478EF2","compare-item-background-color":"#EEEEEE","picker-mask-near-color":"#F4F4F448","picker-mask-far-color":"#F4F4F4","primary-text-color":"#443623","second-text-color":"#606266","comment-text-color":"#909399","lowest-text-color":"#c0c4cc","img-brightness":"0","nav-bar-blur":"100px","tab-bar-blur":"16px","sticky-title-blur":"100px","compare-tag-text-color":"#707277","compare-tag-background-color":"#c0c4cc"}},"monokai":{"meta":{"name":"MonokaiPro","author":"Peng-YM","label":"dark","extend":"dark"},"colors":{"primary-color":"#ed7283","primary-color-end":"#f19f67","second-color":"#90dae6","third-color":"#ef9c70","danger-color":"#E56459","succeed-color":"#49bb88","icon-nav-bar-right":"#606266","unimportant-icon-color":"#FFFFFF34","status-bar-background-color":"#121212","background-color":"#19181a","nav-bar-color":"#12121299","tab-bar-color":"#121212AA","popup-color":"#121212","divider-color":"#FFFFFF08","card-color":"#2c2a2e","dialog-color":"#2c2a2e","switch-close-background-color":"#FFFFFF14","switch-active-background-color":"#478EF2","compare-item-background-color":"#191919","picker-mask-near-color":"#12121248","picker-mask-far-color":"#121212","primary-text-color":"#fcf9f4","second-text-color":"#908e8f","comment-text-color":"#908e8f","lowest-text-color":"#908e8f","img-brightness":"100","nav-bar-blur":"16px","tab-bar-blur":"16px","sticky-title-blur":"16px","compare-tag-text-color":"#aaa","compare-tag-background-color":"#404244"}},"pureblack":{"meta":{"name":"PureBlack","author":"Keywos","label":"dark","extend":"dark"},"colors":{"primary-color":"#6f9cc5","primary-color-end":"#8389c8","second-color":"#c5565a","third-color":"#70b496","danger-color":"#c16058","succeed-color":"#49bb88","icon-nav-bar-right":"#606266","unimportant-icon-color":"#FFFFFF34","status-bar-background-color":"#000","background-color":"#000","nav-bar-color":"#000000","tab-bar-color":"#00000063","popup-color":"#121212","divider-color":"#FFFFFF08","card-color":"#242427","dialog-color":"#242427","switch-close-background-color":"#FFFFFF14","switch-active-background-color":"#478EF2","compare-item-background-color":"#202020","picker-mask-near-color":"#12121248","picker-mask-far-color":"#121212","primary-text-color":"#bcbac1","second-text-color":"#FFFFFFBB","comment-text-color":"#FFFFFF88","lowest-text-color":"#FFFFFF36","img-brightness":"100","nav-bar-blur":"16px","tab-bar-blur":"16px","sticky-title-blur":"16px","compare-tag-text-color":"#FFFFFF88","compare-tag-background-color":"#FFFFFF22","nut-input-readonly":"#bcbac1","nut-input":"#bcbac1","nut-input-text":"#bcbac1"}},"sereneblues":{"meta":{"name":"静谧蓝","author":"Keywos","label":"dark","extend":"dark"},"colors":{"primary-color":"#6f9cc5","primary-color-end":"#8389c8","second-color":"#c5565aad","third-color":"#70b496","danger-color":"#c16058","succeed-color":"#49bb88","icon-nav-bar-right":"#5b5f67","unimportant-icon-color":"#FFFFFF34","status-bar-background-color":"#353642","background-color":"#353642","nav-bar-color":"#353642","tab-bar-color":"#353642cf","popup-color":"#444654","divider-color":"#FFFFFF08","card-color":"#444654","dialog-color":"#444654","switch-close-background-color":"#FFFFFF14","switch-active-background-color":"#478EF2","compare-item-background-color":"#444654","picker-mask-near-color":"#353642cf","picker-mask-far-color":"#353642","primary-text-color":"#bcbac1","second-text-color":"#FFFFFFBB","comment-text-color":"#FFFFFF88","lowest-text-color":"#FFFFFF36","img-brightness":"100","nav-bar-blur":"16px","tab-bar-blur":"16px","sticky-title-blur":"16px","compare-tag-text-color":"#FFFFFF88","compare-tag-background-color":"#FFFFFF22"}}}

// 定义修改 root 变量方法
const changeVariables = (newMode: CustomTheme) => {
  const map = { ...{ ...modules[newMode].colors }, ...commonVariables };
  if (map) {
    Object.keys(map).forEach(key => {
      document.documentElement.style.setProperty(`--${key}`, map[key]);
    });
  }

  // 切换浏览器窗口 / 状态栏颜色
  const themeColorMeta = document.getElementById('theme__color');
  themeColorMeta.setAttribute(
    'content',
    modules[newMode].colors['status-bar-background-color']
  );
};

export const useThemes = () => {
  // 读取 store 中的主题配置
  const settingsStore = useSettingsStore();
  const { theme } = storeToRefs(settingsStore);

  // 定义主题 picker list 选项
  const pickerList = ref([]);
  const pickerDarkList = ref([]);
  const pickerLightList = ref([]);

  for (const key in modules) {
    if (modules[key].meta.label === 'dark') {
      pickerDarkList.value.push({
        text: modules[key].meta.name + ' - ' + modules[key].meta.author,
        value: key,
      });
    } else if (modules[key].meta.label === 'light') {
      pickerLightList.value.push({
        text: modules[key].meta.name + ' - ' + modules[key].meta.author,
        value: key,
      });
    }

    pickerList.value.push({
      text: modules[key].meta.name + ' - ' + modules[key].meta.author,
      value: key,
    });
  }

  // 定义自动根据系统设置切换主题方法
  const autoTheme = el => {
    el.matches
      ? changeVariables(theme.value.dark)
      : changeVariables(theme.value.light);
  };

  // 监听 theme 设置变化，切换 theme
  watchEffect(async () => {
    // console.log(theme.value);
    if (theme.value.auto) {
      if (theme.value.dark && theme.value.light) {
        autoTheme(mql);
        useEventListener(mql, 'change', autoTheme);
      }
    } else {
      mql.removeEventListener('change', autoTheme);
      changeVariables(theme.value.name);
    }
  });

  return {
    currentMode: () => theme.value.name,
    pickerList,
    pickerDarkList,
    pickerLightList,
    isAuto: () => theme.value.auto,
  };
};
