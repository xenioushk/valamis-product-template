class Menu {
  //1.Constructor.
  constructor() {
    this.headerNav = document.querySelector(".header_nav")
    this.menuBtn = document.querySelector(".menu")
    if (this.headerNav.length == false || this.menuBtn.length == false) {
      return false
    }

    this.events()
  }

  //2.Events.
  events() {
    this.menuBtn.addEventListener("click", this.toggleMenu.bind(this))
  }

  //3.Actions.
  toggleMenu() {
    this.headerNav.classList.toggle("showmenu")
  }
}

export default Menu
