class AlertMessage extends HTMLElement {
    
    static get observedAttributes() {
        return ['type', 'message'];
    }

    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {

        const type = this.getAttribute('type') || 'info';
        const message = this.getAttribute('message') || '';

        // Estilos dinámicos según el tipo de alerta
        const styles = {
            success: 'background-color: #d4edda; color: #155724;',
            warning: 'background-color: #fff3cd; color: #856404;',
            error: 'background-color: #f8d7da; color: #721c24;',
            info: 'background-color: #d1ecf1; color: #0c5460;',
        };

        this.shadowRoot.innerHTML = /* html */ `
            <style>
                .alert {
                    padding: 10px;
                    margin: 10px 0;
                    border-radius: 5px;
                    font-family: Arial, sans-serif;
                    font-size: 14px;
                    display: ${message ? 'block' : 'none'};
                    ${styles[type] || styles.info}
                }

                .alert {
                    animation: fadeIn 0.3s ease-out;
                }

                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                        transform: translateY(-10px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            </style>
            <div class="alert">${message}</div>
        `;   
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'message') {
            // Si no hay mensaje, oculta la alerta
            if (!newValue) {
                this.style.display = 'none';
            } else {
                this.style.display = 'block';
            }
        }

        this.connectedCallback();
    }
}

customElements.define('alert-message', AlertMessage);