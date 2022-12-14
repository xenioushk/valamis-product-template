class Products {
  //1.Constructor.
  constructor() {
    this.showMoreProductsBtn = document.getElementById("show_more_products")
    this.productCard = document.querySelector(".product-card")
    this.productContainer = document.querySelector(".container--products")

    if (this.showMoreProductsBtn.length == false) {
      return false
    }

    this.events()
  }

  //2.Events.
  events() {
    this.showMoreProductsBtn.addEventListener("click", this.showMoreProducts.bind(this))
  }

  //3.Actions.
  showMoreProducts(e) {
    e.preventDefault()
    this.productContainer.appendChild(this.productCard.cloneNode(true))
  }
}

export default Products
