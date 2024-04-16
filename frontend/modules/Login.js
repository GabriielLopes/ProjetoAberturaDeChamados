export default class Login {
    constructor(formClass) {
        this.form = document.querySelector(formClass)

    }
    init() {
     this.events()
    }

    events() {
        if(this.form) return; // se o formulario não existe, não faça nada
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('FORM NÃO ENVIADO!')
        })
    }
}