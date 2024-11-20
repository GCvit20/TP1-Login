class UserLogin extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = /* html */ `
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                :host {
                    display: block;
                    max-width: 400px;
                    width: 100%;
                    margin: 0 auto;
                    padding: 20px;
                    background: #fff;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    font-family: 'Arial', sans-serif;
                }

                form h2 {
                    text-align: center;
                    color: #333;
                    margin-bottom: 20px;
                }

                .form-group {
                    margin-bottom: 15px;
                }

                .form-group label {
                    display: block;
                    font-size: 14px;
                    font-weight: bold;
                    color: #555;
                    margin-bottom: 5px;
                    text-align: left; 
                }

                .form-group input {
                    width: 100%;
                    padding: 10px;
                    font-size: 16px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                    outline: none;
                    transition: border-color 0.3s;
                }

                .form-group input:focus {
                    border-color: #4C90FF;
                }

                button {
                    width: 100%;
                    padding: 12px;
                    background-color: #4C90FF;
                    color: white;
                    font-size: 16px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                button:hover {
                    background-color: #3a7cc3;
                }
            </style>

            <form id="login-form">
                <h2>Iniciar Sesión</h2>
                <div class="form-group">
                    <label for="username">Usuario:</label>
                    <input type="text" id="username" name="username" required placeholder="Ingresa tu usuario">
                </div>
                <div class="form-group">
                    <label for="password">Contraseña:</label>
                    <input type="password" id="password" name="password" required placeholder="Ingresa tu contraseña">
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
        `;  

        this.shadowRoot.getElementById('login-form').addEventListener('submit', this.submitForm.bind(this));
    }

    submitForm(event) {
        event.preventDefault();

        // Obtener valores del formulario
        const username = this.shadowRoot.getElementById('username').value;
        const password = this.shadowRoot.getElementById('password').value;

        // Validación básica de credenciales
        let result = 'error';
        if (username === 'admin' && password === 'admin') {
            result = 'success';
        }


        // Emitir el evento personalizado
        this.dispatchEvent(new CustomEvent('login-result', {
            detail: { status: result },
                bubbles: true,
                composed: true, // Permitir que cruce el shadow DOM
        }));
    }

}

customElements.define('user-login', UserLogin);