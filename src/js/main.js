const checkForms = {
    init: function() {
        this.cacheSelectors()
        this.bindEvents()
    },

    cacheSelectors: function() {
        this.$registerForm = document.querySelector('#registerForm')
        this.$clientName = document.querySelector('#clientName')
        this.$clientEmail = document.querySelector('#clientEmail')
        this.$clientCpf = document.querySelector('#cpf')

        this.$shareForm = document.querySelector('#shareForm')
        this.$friendName = document.querySelector('#friendName')
        this.$friendEmail = document.querySelector('#friendEmail ')
    },

    bindEvents: function() {

    },

    Events: {

    }
}

const products = {
    init: function() {
        this.cacheSelectors()
        this.getFirstPage()
        this.bindEvents()
    },
    
    cacheSelectors: function() {
        this.$productsList = document.querySelector('#productsList')
        this.$productImg = document.querySelectorAll('.productImg')
        this.$productName = document.querySelectorAll('.productName')
        this.$productDescription = document.querySelectorAll('.productDescription')
        this.$oldPrice = document.querySelectorAll('.oldPrice')
        this.$price = document.querySelectorAll('.price')
        this.$installmentPrice = document.querySelectorAll('.installmentPrice')
        this.$showMoreProductsBtn = document.querySelector('#showMoreProducts')
    },

    bindEvents: function() {

    },

    Events: {
        
    }
}

checkForms.init()
products.init()