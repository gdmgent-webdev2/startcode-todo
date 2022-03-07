/**
 * @author: Frederick Roegiers
 */

import { themes } from "./themes.js";

const themeSwitcher = {
  init() {
    // get defined themes from themes module
    this.themes = themes;
    this.root = document.documentElement;

    // set active theme get from local storage
    this.activeThemeName =
      localStorage.getItem("activeThemeName") || "cool-dark-theme";

    this.cacheElements();
    this.registerListeners();

    // populate dropdown box
    this.populateSelect();
    // change theme, based on active theme
    this.changeDOMTheme();
  },
  cacheElements() {
    this.$selectSwitch = document.querySelector("#theme-switcher");
  },
  registerListeners() {
    this.$selectSwitch.addEventListener("change", (e) => {
      // change active theme here
      this.activeThemeName = e.target.value;
      // change in local storage
      localStorage.setItem("activeThemeName", e.target.value);
      // other theme, so change the dom colors
      this.changeDOMTheme();
    });
  },
  populateSelect() {
    const options = themes.map((theme) => {
      return `<option value="${theme.slug}" ${
        theme.slug == this.activeThemeName ? "selected" : ""
      }>
        ${theme.name}
    </option>`;
    });
    this.$selectSwitch.innerHTML = options.join("");
  },
  changeDOMTheme() {
    const activeTheme = this.themes.find(
      (theme) => theme.slug == this.activeThemeName
    );

    activeTheme.colors.forEach((color) => {
      this.root.style.setProperty(`--color-${color.name}`, color.hex);
    });
  },
};

themeSwitcher.init();
