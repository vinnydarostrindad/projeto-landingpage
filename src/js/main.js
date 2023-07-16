const checkForms = {
    init: function() {
        this.cacheSelectors()
        this.bindEvents()
    },

    cacheSelectors: function() {
        this.$allInputs = document.querySelectorAll('input') 

        this.$registerForm = document.querySelector('#registerForm')
        this.$clientName = document.querySelector('#clientName')
        this.$clientEmail = document.querySelector('#clientEmail')
        this.$clientCpf = document.querySelector('#cpf')
        this.$clientSex = document.querySelector('#gender')
        this.$confirmationBox = document.querySelector('.savedDataConfirmation')

        this.$shareForm = document.querySelector('#shareForm')
        this.$friendName = document.querySelector('#friendName')
        this.$friendEmail = document.querySelector('#friendEmail ')
        this.$thanksForSharing = document.querySelector('.thanksForSharing')
    },

    bindEvents: function() {
        const self = this

        this.$clientCpf.onkeypress = this.Events.editCpf_keypress
        this.$registerForm.onsubmit = this.Events.checkRegisterForm_submit.bind(this)
        this.$shareForm.onsubmit = this.Events.checkShareForm_submit.bind(this)
        this.$allInputs.forEach(e => {
            e.onfocus = self.Events.removeError_focus.bind(this)
        });
    },

    Events: {
        editCpf_keypress: function(e) {
            switch (e.target.value.length) {
                case 3:
                    e.target.value += '.'
                    break;
                case 7:
                    e.target.value += '.'
                    break;
                case 11:
                    e.target.value += '-'
                    break;
                default:
                    break;
            }
        },

        checkRegisterForm_submit: function(e) {
            e.preventDefault()

            let error = false

            if (this.$clientName.value.length == 0) {
                this.$clientName.placeholder = "Coloque seu nome para concluir"
                this.$clientName.classList.add('error')
                this.$clientName.previousElementSibling.style.color = "red"

                error = true
            }
            if (this.$clientEmail.value.length == 0) {
                this.$clientEmail.placeholder = "Coloque seu email para concluir"
                this.$clientEmail.classList.add('error')
                this.$clientEmail.previousElementSibling.style.color = "red"

                error = true
            }
            if (this.$clientCpf.value.length == 0) {
                this.$clientCpf.placeholder = "Coloque seu cpf para concluir"
                this.$clientCpf.classList.add('error')
                this.$clientCpf.previousElementSibling.style.color = "red"

                error = true
            }
            if (!this.$registerForm['sex'].value) {
                this.$clientSex.children[0].children[1].style.color = "red"
                this.$clientSex.children[1].children[1].style.color = "red"

                error = true
            }

            if (!error) {
                console.log('Data Saved')
                this.$registerForm.classList.add('remove')
                this.$confirmationBox.classList.add('appear')
                this.$registerForm.parentElement.style.alignItems = 'center'
            }
        },

        checkShareForm_submit: function(e) {
            e.preventDefault()

            let error = false

            if (this.$friendName.value.length == 0) {
                this.$friendName.placeholder = "Coloque seu nome para concluir"
                this.$friendName.classList.add('error')
                this.$friendName.previousElementSibling.style.color = "red"

                error = true
            }
            if (this.$friendEmail.value.length == 0) {
                this.$friendEmail.placeholder = "Coloque seu email para concluir"
                this.$friendEmail.classList.add('error')
                this.$friendEmail.previousElementSibling.style.color = "red"

                error = true
            }

            if (!error) {
                console.log('Data Saved')
                this.$thanksForSharing.classList.add('appear')
                setTimeout(() => {
                    this.$thanksForSharing.classList.remove('appear')
                }, 5000)

                this.$friendName.value = ""
                this.$friendEmail.value = ""
            }
        },

        removeError_focus: function(e) {
            if (e.target.id == "clientName") {
                this.$clientName.placeholder = ""
                this.$clientName.classList.remove('error')
                this.$clientName.previousElementSibling.style.color = ""
            }
            if (e.target.id == "clientEmail") {
                this.$clientEmail.placeholder = ""
                this.$clientEmail.classList.remove('error')
                this.$clientEmail.previousElementSibling.style.color = ""
            }
            if (e.target.id == "cpf") {
                this.$clientCpf.placeholder = ""
                this.$clientCpf.classList.remove('error')
                this.$clientCpf.previousElementSibling.style.color = ""
            }
            if (e.target.name == "sex") {
                this.$clientSex.children[0].children[1].style.color = ""
                this.$clientSex.children[1].children[1].style.color = ""
            }
            if (e.target.id == "friendName") {
                this.$friendName.placeholder = ""
                this.$friendName.classList.remove('error')
                this.$friendName.previousElementSibling.style.color = ""
            }
            if (e.target.id == "friendEmail") {
                this.$friendEmail.placeholder = ""
                this.$friendEmail.classList.remove('error')
                this.$friendEmail.previousElementSibling.style.color = ""
            }
        }
    }
}

const products = {
    nextPageLink: '',

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
        
        this.nextPageLink = firstPage.nextPage
        console.log(firstPage)
        firstPage.products.forEach((e) => {
            this.$productsList.innerHTML += `
                <li class="productContainer">
                    <div class="productImg"><img src="${e.image}"></div>
                    <h3 class="productName">${e.name}</h3>
                    <h4 class="productDescription">${e.description}</h4>
                    <span class="oldPrice">De: R$${e.oldPrice}</span>
                    <span class="price"><strong>Por: R$${e.price}</strong></span>
                    <span class="installmentPrice">ou ${e.installments.count}x de R$${e.installments.value.toString().replace(".", ",")}</span>
                    <button>Comprar</button>
                </li>
            `
        })
    },

    bindEvents: function() {
        this.$showMoreProductsBtn.onclick = this.Events.showMoreProducts_click.bind(this)
    },

    Events: {
        showMoreProducts_click: async function() {
            const nextPage = await fetch(`https://${this.nextPageLink}` )
            .then(this.getJson)
            
            this.nextPageLink = nextPage.nextPage

            nextPage.products.forEach((e) => {
                this.$productsList.innerHTML += `
                    <li class="productContainer">
                        <div class="productImg"><img src="${e.image}"></div>
                        <h3 class="productName">${e.name}</h3>
                        <h4 class="productDescription">${e.description}</h4>
                        <span class="oldPrice">De: R$${e.oldPrice}</span>
                        <span class="price"><strong>Por: R$${e.price}</strong></span>
                        <span class="installmentPrice">ou ${e.installments.count}x de R$${e.installments.value.toString().replace(".", ",")}</span>
                        <button>Comprar</button>
                    </li>
                `
            })
        }
    }
}

checkForms.init()
products.init()