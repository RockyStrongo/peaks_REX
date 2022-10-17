const PASSWORD_COMPLEXITY_REGEX = new RegExp("^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

export default {

    name: 'PasswordInput',

    computed: {
        eyeIconSelector() {
            const EYES_SELECTOR = '[data-eye]'
            const eyeIconsElements = document.querySelectorAll(EYES_SELECTOR)
            return eyeIconsElements;
        },
        eyeIconOpenSelector(){
            const EYE_OPEN_SELECTOR = '[data-eye=open]'
            const eyeOpenIconElement = document.querySelector(EYE_OPEN_SELECTOR)
            return eyeOpenIconElement
        },
        eyeIconClosedSelector(){
            const EYE_CLOSE_SELECTOR = '[data-eye=close]'
            const eyeCloseIconElement = document.querySelector(EYE_CLOSE_SELECTOR)
            return eyeCloseIconElement

        },
        passwordInputSelector() {
            const PASSWORD_INPUT_SELECTOR = '[data-input-password]'
            const passwordInputElement = document.querySelector(PASSWORD_INPUT_SELECTOR)
            return passwordInputElement;
        }
    },

    props: {
        label: ''
    },

    data() {
        return {
            password: '',
            passwordComplex: false
        }
    },

    methods: {
        passwordIsComplex() {
            return PASSWORD_COMPLEXITY_REGEX.test(this.password) || false
        },
        togglePasswordVisibility() {

            const fieldtype = this.passwordInputSelector.type.toLowerCase()
            fieldtype === 'password' ? this.showPassword() : this.hidePassword()
        },
        showPassword(){
            console.log("hi")
            this.passwordInputSelector.type="text"
            this.eyeIconClosedSelector.setAttribute('aria-hidden', 'false')
            this.eyeIconOpenSelector.setAttribute('aria-hidden', 'true')

        },
        hidePassword(){
            this.passwordInputSelector.type="password"
            this.eyeIconOpenSelector.setAttribute('aria-hidden', 'false')
            this.eyeIconClosedSelector.setAttribute('aria-hidden', 'true')
        },
    },
    watch: {
        password() {
            this.passwordComplex = this.passwordIsComplex()
            this.emitter.emit("password-complex", this.passwordComplex);
        }
    },
    mounted() {
        this.eyeIconSelector.forEach(icon => {
            icon.addEventListener('click', this.togglePasswordVisibility)
        })
    },
}