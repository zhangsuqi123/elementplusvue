<script setup>
// import HelloWorld from "./components/HelloWorld.vue";
import { ref} from "vue";
import { useDark, useToggle } from "@vueuse/core";

const theme = localStorage.getItem("theme-appearance") || "light";
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
  <label id="theme-toggle-button">
    <input
      type="checkbox"
      id="toggle"
      v-model="toggleDarkModel"
      @click="toggleTheme"
    />
    点击切换主题
  </label>
  <div> 123123133233</div>
</template>

<style lang="scss">
[data-bs-theme="light"] {
  body {
    background-color: #ffffff;
  }
}

[data-bs-theme="dark"] {
  body {
    background-color: #000;
    color: #fff;
  }
}

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
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

/* The switch - the box around the slider */
#theme-toggle-button {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 7em;
  cursor: pointer;
}

/* Hide default HTML checkbox */
#toggle {
  opacity: 0;
  width: 0;
  height: 0;
}

#container,
#patches,
#stars,
#button,
#sun,
#moon,
#cloud {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.25s;
}

/* night sky background */
#toggle:checked + svg #container {
  fill: #2b4360;
}

/* move button to right when checked */
#toggle:checked + svg #button {
  transform: translate(28px, 2.333px);
}

/* show/hide sun and moon based on checkbox state */
#sun {
  opacity: 1;
}

#toggle:checked + svg #sun {
  opacity: 0;
}

#moon {
  opacity: 0;
}

#toggle:checked + svg #moon {
  opacity: 1;
}

/* show or hide background items on checkbox state */
#cloud {
  opacity: 1;
}

#toggle:checked + svg #cloud {
  opacity: 0;
}

#stars {
  opacity: 0;
}

#toggle:checked + svg #stars {
  opacity: 1;
}

</style>