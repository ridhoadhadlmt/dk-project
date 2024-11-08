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
    components: {
        
    },
    data() {
        return {
            showPassword: false,
            showPassword2: false,
            password: null,
            confirmPassword: null,
            submitted: false,
            authError: null,
            tryingToLogIn: false,
            isAuthError: false,
            processing: false,
            modalShow1: false,
            modalShow2: false,
            otp: Array(6).fill(''),
            typeRequestOtp: null,
            forgotEmail: "",
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
    mounted() {
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

        async savePassword() {
            const body = {
                resetPasswordToken: localStorage.getItem('forgotPasswordToken'),
                newPassword: this.password,
                passwordConfirmation: this.confirmPassword
            }
            await axios.post(process.env.VUE_APP_API_URL + "/v1/auth/reset-password", body).then(() => {
                localStorage.removeItem('forgotPasswordToken');
                localStorage.removeItem('otpToken');
                this.$router.push('/login');
            }).catch(error => {
                this.authError = error.response.data.message;
                this.isAuthError = true;
                this.processing = false;
            });
        },


    
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
        togglePassword2() {
            this.showPassword2 = !this.showPassword2;
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



        hideEmail(email) {
            if(email) {
                return email.replace(/\.(?=.*@)/, '*');
            }
            return '';
        }
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

                                    <h2 class="text-uppercase mb-5">Buat Password</h2>
                                    <label class="form-label" for="form2Example18" style="line-height: 24px;">Email Password Anda harus lebih dari minimal 8 karakter dan menyertakan kombinasi angka, huruf, dan karakter khusus (1SAR @%).</label>
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

                                    <div data-mdb-input-init class="form-outline mb-4">
                                        <label class="form-label" for="form2Example28">Konfirmasi Password Baru</label>
                                        <div class="form-outline mb-4 position-relative">
                                            <input :type="showPassword2 ? 'text' : 'password'" v-model="confirmPassword"
                                                id="form2Example28" class="form-control form-control-lg" />

                                            <!-- Eye Icon -->
                                            <i :class="showPassword2 ? 'ri-eye-line' : 'ri-eye-off-line'"
                                                @click="togglePassword2"
                                                style="position: absolute; right: 15px; top: 15px; cursor: pointer;"></i>
                                        </div>
                                    </div>

                                    <div class="d-grid gap-5 mb-4">
                                        <BButton type="button" variant="dark" @click="savePassword">
                                            Simpan
                                        </BButton>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>
