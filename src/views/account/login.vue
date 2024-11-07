<script>
import {
    required,
    email,
    helpers
} from "@vuelidate/validators";
import axios from 'axios';

import {
    authMethods,
    authFackMethods,
    notificationMethods,
} from "@/state/helpers";


export default {
    data() {
        return {
            showPassword: false,
            email: "013ichsanm@gmail.com",
            password: "p@ssword123",
            submitted: false,
            authError: null,
            tryingToLogIn: false,
            isAuthError: false,
            processing: false,
            modalShow1: false,
            modalShow2: false,
            otp: Array(6).fill(''),
            otpLength: 6, // Adjust the OTP length as needed
        };
    },
    validations: {
        email: {
            required: helpers.withMessage("Email is required", required),
            email: helpers.withMessage("Please enter valid email", email),
        },
        password: {
            required: helpers.withMessage("Password is required", required),
        },
    },
    computed: {

    },
    methods: {
        ...authMethods,
        ...authFackMethods,
        ...notificationMethods,
        // Fungsi untuk fokus ke input selanjutnya
        focusNext(index) {
            if (this.otp[index].length === 1 && index < this.otp.length - 1) {
                this.$refs[`otp${index + 1}`][0].focus();
            }
        },
        // Fungsi untuk fokus ke input sebelumnya saat backspace
        focusPrev(index, event) {
            if (event.key === 'Backspace' && index > 0 && !this.otp[index]) {
                this.$refs[`otp${index - 1}`][0].focus();
            }
        },

        async signinapi() {
            this.processing = true;
            await axios.post(process.env.VUE_APP_API_URL + "/v1/auth/login", {
                emailOrWa: this.email,
                password: this.password
            }).then(response => {
                localStorage.setItem('otpToken', response.data.data.otpToken);
                localStorage.setItem('email', this.email);
                this.modalShow2 = true;
            }).catch(error => {
                this.authError = error.response.data.message;
                this.isAuthError = true;
                this.processing = false;
            });
        },

        resendOtp(type) {
            axios.post(process.env.VUE_APP_API_URL + "/v1/auth/request-otp", {
                email: localStorage.getItem('email'),
                platform: type
            }).then(response => {
                localStorage.setItem('otpToken', response.data.data.otpToken);
            });
        },

        verifyOtp() {
            console.log(this.otp);
            axios.post(process.env.VUE_APP_API_URL + "/v1/auth/valid-otp", {
                otp: this.otp.join(''),
                otpToken: localStorage.getItem('otpToken')
            }).then(response => {
                //set jwt
                localStorage.setItem('jwt', response.data.data.accessToken);
                this.$router.push('/dashboard');
            });
        },

    
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
        generateOtp() {
            const otp = Array.from({ length: this.otpLength }, () => Math.floor(Math.random() * 10));
            this.otp = otp;
        },
        handleOtpChange(event, index) {
            const value = event.target.value;
            if (value.length > 1) {
                // Prevent pasting multiple characters
                event.target.value = value[0];
            } else if (value.length === 1 && index < this.otpLength - 1) {
                // Automatically focus on the next input if a valid digit is entered

                if (this.otp.length > index) {
                    this.$refs[`otp${index + 1}`].focus();
                }
            }
        },

    },
};
</script>
<style scoped>
.otp-input input {
    width: 40px;
    height: 40px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0 5px;
}

.gradient-custom {
    background: rgb(255, 213, 0);
    background: radial-gradient(circle, rgba(255, 213, 0, 0.4458158263305322) 0%, rgba(255, 251, 229, 1) 100%);
}

.card-login {
    border-radius: 4px;
    padding: 60px 40px 20px 40px;
    ;
}
</style>

<template class="">

    <section class="gradient-custom vh-100">

        <div class="container pt-4">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <img src="@/assets/images/logo-black.svg" alt="Logo" class="logo" style="fill: #000;">
                <button class="btn btn-link " @click="goBack"><i class="ri-arrow-left-s-line"></i> <span
                        class="text-decoration-underline">Kembali ke homepage</span></button>
            </div>
        </div>

        <section class="">
            <div class="container login-page">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-12 col-md-8 col-lg-6 col-xl-6">
                        <div class="card bg-white text-dark ">
                            <div class="card-body card-login">

                                <div class="">

                                    <h2 class="text-uppercase mb-5">Login</h2>

                                    <div data-mdb-input-init class="form-outline mb-4">
                                        <label class="form-label" for="form2Example18">Email atau Nomor WhatsApp</label>
                                        <input type="email" id="form2Example18" class="form-control form-control-lg"
                                            v-model="email" />

                                    </div>

                                    <div data-mdb-input-init class="form-outline mb-4">
                                        <label class="form-label" for="form2Example28">Password</label>
                                        <div class="form-outline mb-4 position-relative">
                                            <input :type="showPassword ? 'text' : 'password'" v-model="password"
                                                id="form2Example28" class="form-control form-control-lg" />

                                            <!-- Eye Icon -->
                                            <i :class="showPassword ? 'ri-eye-line' : 'ri-eye-off-line'"
                                                @click="togglePassword"
                                                style="position: absolute; right: 15px; top: 15px; cursor: pointer;"></i>
                                        </div>
                                    </div>

                                    <div class="d-flex justify-content-between mb-4">
                                        <div class="">
                                            <input class="" type="checkbox" value="" id="rememberMe" />
                                            <label class="form-check-label" for="rememberMe">Ingat saya</label>
                                        </div>
                                        <div>
                                            <BLink href="javascript:void(0);" @click="modalShow1 = !modalShow1"
                                                class="text-primary fw-bold text-link text-decoration-underline">Lupa
                                                password?
                                            </BLink>
                                        </div>
                                    </div>

                                    <div class="d-grid gap-5">
                                        <BButton type="button" variant="dark" @click="signinapi">
                                            LOGIN
                                        </BButton>

                                        <p class="text-center">Belum punya akun? <BLink href="javascript:void(0);"
                                                class="text-primary fw-bold text-link text-decoration-underline">Buat Akun</BLink>
                                        </p>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        <BModal v-model="modalShow2" hide-footer class="v-modal-custom" hide-header-close centered>
            <div class="modal-body text-center">
                <lottie colors="primary:#121331,secondary:#08a88a" trigger="loop" :options="defaultOptions"
                    :height="120" :width="120" />
                <div class="mt-4">
                    <h4 class="mb-3 title-auth">Masukkan Kode OTP</h4>
                    <p class="text-muted mb-4">Silakan masukkan kode verifikasi yang kami kirimkan ke Agan@*****.com
                        untuk memvalidasi akun Anda.</p>
                    <div class="vstack gap-3 justify-content-center" id="otp-input">

                        <div class="otp-input">
                            <input v-for="(digit, index) in otp" :key="index" v-model="otp[index]" type="text"
                                maxlength="1" class="otp-box" :ref="'otp' + index" @input="focusNext(index)"
                                @keydown.backspace="focusPrev(index, $event)" />
                            <p class="mt1"> <span class="text-danger text-start" v-if="isOtpError">Kode OTP tidak
                                    valid</span></p>
                        </div>

                        <p class="text-muted mb-4">Tidak menerima kode?</p>

                        <BLink @click="resendOtp('email')" class="text-primary">Kirim ulang via email</BLink>

                        <BLink @click="resendOtp('wa')" class="text-primary">Kirim ulang via WhatsApp</BLink>


                        <BButton @click="verifyOtp" class="btn btn-dark">Verifikasi</BButton>
                    </div>
                </div>
            </div>
        </BModal>
    </section>
</template>
