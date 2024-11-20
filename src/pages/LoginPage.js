class LoginPage extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode: 'open'});

        this.shadowRoot.innerHTML = /* html */ `
            <style>
                :host {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    flex-direction: column; 
                    min-height: 100vh;
                    background-color: #f7f7f7;
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    text-align: center;
                }
            </style>
            <user-login></user-login>
            <alert-message></alert-message>
        `;

        this.shadowRoot
            .querySelector('user-login')
            .addEventListener('login-result', this.handlerShowAlert.bind(this));
    }

    handlerShowAlert(event) {
        const alert = this.shadowRoot.querySelector('alert-message');
        const { status } = event.detail;

        if (status === 'success') {
            alert.setAttribute('type', 'success');
            alert.setAttribute('message', 'Inicio de sesión exitoso');
        } else {
            alert.setAttribute('type', 'error');
            alert.setAttribute('message', 'Error en el inicio de sesión');
        }
    }
}

customElements.define('login-page', LoginPage);