const ProductsMobile = {
    pageLink: '',
    currentIndex: 0,
    maxIndex: 3,

    init: function() {
        this.cacheSelectors()
        this.getFirstPage()
        this.bindEvents()
    },
    
    cacheSelectors: function() {
        this.$productsList = document.querySelector('#productsList')
        this.$showMoreProductsBtn = document.querySelector('#showMoreProducts')
    },

    getJson: (datas) => datas.json(),

    getFirstPage: async function() {
        const firstPage = await fetch('https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1')
        .then(this.getJson)

        this.pageLink = 'frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1'

        for (this.currentIndex; this.currentIndex <= this.maxIndex; this.currentIndex++) {
            this.$productsList.innerHTML += `
                <li class="productContainer">
                    <div class="productImg"><img src="${firstPage.products[this.currentIndex].image}"></div>
                    <div>
                        <h3 class="productName">${firstPage.products[this.currentIndex].name}</h3>
                        <h4 class="productDescription">${firstPage.products[this.currentIndex].description}</h4>
                        <span class="oldPrice">De: R$${firstPage.products[this.currentIndex].oldPrice}</span>
                        <span class="price"><strong>Por: R$${firstPage.products[this.currentIndex].price}</strong></span>
                        <span class="installmentPrice">ou ${firstPage.products[this.currentIndex].installments.count}x de R$${firstPage.products[this.currentIndex].installments.value.toString().replace(".", ",")}</span>
                        <button>Comprar</button>
                    </div>   
                </li>
            `
        }
        
        this.maxIndex += 4
        console.log(this.pageLink, this.currentIndex, this.maxIndex)
    },

    bindEvents: function() {
        this.$showMoreProductsBtn.onclick = this.Events.showMoreProducts_click.bind(this)
    },

    Events: {
        showMoreProducts_click: async function() {
            const getPage = await fetch(`https://${this.pageLink}` )
            .then(this.getJson)

            console.log(getPage)

            for (this.currentIndex; this.currentIndex <= this.maxIndex; this.currentIndex++) {
                this.$productsList.innerHTML += `
                    <li class="productContainer">
                        <div class="productImg"><img src="${getPage.products[this.currentIndex].image}"></div>
                        <div>
                            <h3 class="productName">${getPage.products[this.currentIndex].name}</h3>
                            <h4 class="productDescription">${getPage.products[this.currentIndex].description}</h4>
                            <span class="oldPrice">De: R$${getPage.products[this.currentIndex].oldPrice}</span>
                            <span class="price"><strong>Por: R$${getPage.products[this.currentIndex].price}</strong></span>
                            <span class="installmentPrice">ou ${getPage.products[this.currentIndex].installments.count}x de R$${getPage.products[this.currentIndex].installments.value.toString().replace(".", ",")}</span>
                            <button>Comprar</button>
                        </div>   
                    </li>
                `
            }

            if (this.currentIndex == 8) {
                this.currentIndex = 0
                this.maxIndex = 3
                this.pageLink = getPage.nextPage
            } else if (this.currentIndex == 4) {
                this.maxIndex += 4;
            }
            
            console.log(this.pageLink, this.currentIndex, this.maxIndex)
        }
    }
}

if (innerWidth < 475) {
    ProductsMobile.init()
}