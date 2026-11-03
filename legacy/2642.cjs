// Заміна мінізованого gsap-обгортки на npm-пакет gsap (3.7.1, CSSPlugin вже зареєстровано).
const { gsap } = require("gsap");
module.exports = { p8: gsap, ZP: gsap };
