<script setup>
import {ref} from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useDark, useToggle } from "@vueuse/core";

// const themeChange = (val) => {
//   console.log(val)
// }

const theme = localStorage.getItem("theme-appearance") || "dark";
const toggleDarkModel = ref(theme === "dark");

const isDark = useDark({
  storageKey: "theme-appearance",
  selector: "html",
  attribute: "data-bs-theme",
  valueDark: "dark",
  valueLight: "light",
});
const toggleDark = useToggle(isDark);

const toggleTheme = (event) => {
  const x = event.clientX;
  const y = event.clientY;
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y)
  );

  // 兼容性处理
  if (!document.startViewTransition) {
    toggleDark();
    return;
  }
  const transition = document.startViewTransition(async () => {
    toggleDark();
  });

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ];
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 400,
        easing: "ease-in",
        pseudoElement: isDark.value
          ? "::view-transition-old(root)"
          : "::view-transition-new(root)",
      }
    );
  });
};
</script>

<template>
  <el-switch
    v-model="toggleDarkModel"
    :active-action-icon="Moon"
    :inactive-action-icon="Sunny"
    @click="toggleTheme"
  />
  
</template>

<style lang="scss">
/* The switch - the box around the slider */

::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 2147483646;
}

[data-bs-theme="dark"]::view-transition-old(root) {
  z-index: 2147483646;
}

[data-bs-theme="dark"]::view-transition-new(root) {
  z-index: 1;
}
</style>