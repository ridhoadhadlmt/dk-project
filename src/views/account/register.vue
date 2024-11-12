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
import { BFormGroup, BFormInput } from "bootstrap-vue-next";


export default {
  components: {
    BFormGroup,
    BFormInput
  },
  data() {
    return {
      formRegister: {
        clientId: "",
        companyCode: "",
        fullName: "",
        email: "",
        phoneNumber: "",
        whatsappNumber: "",
        password: "",
        roleId: "",
      },

      roles: [],

      isCompanyCodeError: false,
      showPassword: false,
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
      authErrorMessage: null,
      processing: false,
      modalShow1: false,
      modalShow2: false,
      otp: Array(6).fill(''),
      otpError: false,
      typeRequestOtp: null,
      forgotEmail: "",
      forgotPasswordError: false,
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

      await axios.post(process.env.VUE_APP_API_URL + "/v1/auth/register", {
        ...this.formRegister
      }).then((response) => {
        localStorage.setItem('email', this.formRegister.email);
        localStorage.setItem('otpToken', response.data.data.otpToken);
        this.modalShow2 = true;
      }).catch(error => {
        this.authError = error.response.data.message;
        this.isAuthError = true;
        this.authErrorMessage = error.response.data.message;
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
      axios.post(process.env.VUE_APP_API_URL + "/v1/auth/valid-otp", {
        otp: this.otp.join(''),
        otpToken: localStorage.getItem('otpToken')
      }).then(response => {
        localStorage.setItem('jwt', response.data.data.accessToken);
        this.$router.push('/dashboard');
      }).catch(() => {
        this.otpError = true;
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

    async checkClientId() {
      this.timeoutId = setTimeout(async () => {
        await axios.post(process.env.VUE_APP_API_URL + "/v1/auth/validate-company", {
          code: this.formRegister.companyCode
        }).then(response => {
          this.formRegister.clientId = response.data.data.id;
          this.isCompanyCodeError = false;
        }).finally(async () => {
          await this.getRoleData(); 
        }).catch(() => {
          this.isCompanyCodeError = true;
        });
      }, 3000); // 3000 milidetik = 3 detik

      
    },

    //Get Role Data
    async getRoleData() {
      await axios.get(process.env.VUE_APP_API_URL + "/v1/auth/roles", { params: { clientId: this.formRegister.clientId } }).then(response => {
        this.roles = response.data.data;
      });
    },



    hideEmail(email) {
      if (email) {
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

  <section class="gradient-custom vh-200">

    <div class="container pt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <img src="@/assets/images/logo-black.svg" alt="Logo" class="logo" style="fill: #000;">
        <button class="btn btn-link " @click="goBack"><i class="ri-arrow-left-s-line"></i> <span
            class="text-decoration-underline">Kembali ke homepage</span></button>
      </div>
    </div>

    <section class="">
      <div class="container login-page">
        <div class="row justify-content-center align-items-center h-100">
          <div class="col-12 col-md-8 col-lg-6 col-xl-6">
            <div class="card bg-white text-dark ">
              <div class="card-body card-login">

                

                <div class="">

                  <h2 class="text-uppercase mb-5">Buat Akun</h2>
                  <div class="alert alert-danger" v-if="authError"> 
                    {{ authErrorMessage }}
                  </div>

                  <div data-mdb-input-init class="form-outline mb-4">
                    <BFormLabel class="form-label" for="form2Example18">Nama Lengkap</BFormLabel>
                    <BFormInput v-model="formRegister.fullName" />
                  </div>

                  <BRow>
                    <BCol xl="6" md="12" class="mb-4">
                      <BFormGroup>
                        <BFormLabel class="form-label">Email</BFormLabel>
                        <BFormInput type="email" v-model="formRegister.email" />
                      </BFormGroup>
                    </BCol>

                    <BCol xl="6" md="12" class="mb-4">
                      <BFormGroup>
                        <BFormLabel class="form-label">Kode Perusahaan</BFormLabel>
                        <BFormInput v-model="formRegister.companyCode" @input="checkClientId" />
                        <span class="text-danger text-start" v-if="isCompanyCodeError">Company Code tidak ditemukan</span>
                      </BFormGroup>
                    </BCol>

                    <BCol xl="6" md="12" class="mb-4">
                      <BFormGroup>
                        <BFormLabel class="form-label">Nomor Handphone</BFormLabel>
                        <BFormInput v-model="formRegister.phoneNumber" />
                      </BFormGroup>
                    </BCol>

                    <BCol xl="6" md="12" class="mb-4">
                      <BFormGroup>
                        <BFormLabel class="form-label">Nomor Whatsapp</BFormLabel>
                        <BFormInput v-model="formRegister.whatsappNumber" />
                        <span class="text-muted fs-12">Bisa sama dengan nomor handphone</span>
                      </BFormGroup>
                    </BCol>

                  </BRow>

                  <div data-mdb-input-init class="form-outline mb-4">
                    <label class="form-label" for="form2Example28">Buat Password</label>
                    <div class="form-outline mb-4 position-relative">
                      <input :type="showPassword ? 'text' : 'password'" v-model="formRegister.password" id="form2Example28"
                        class="form-control form-control-lg" />

                      <!-- Eye Icon -->
                      <i :class="showPassword ? 'ri-eye-line' : 'ri-eye-off-line'" @click="togglePassword"
                        style="position: absolute; right: 15px; top: 15px; cursor: pointer;"></i>
                    </div>
                  </div>

                  <div data-mdb-input-init class="form-outline mb-4">
                    <label class="form-label" for="form2Example28">User Role</label>
                    <div class="form-outline mb-4 position-relative">
                      <select class="form-control" v-model="formRegister.roleId">
                        <option v-for="role in roles" :key="role.id" :value="role.id">{{ role.name }}</option>
                      </select>
                    </div>
                  </div>

                  <div class="d-grid gap-5">
                    <p class="fs-16">
                      Dengan mendaftar, Anda mengonfirmasi bahwa Anda telah membaca dan menyetujui <b>Syarat dan Ketentuan</b> dan <b>Kebijakan Privasi</b> Jupital.
                    </p>
                    <BButton type="button" variant="dark" @click="signinapi">
                      DAFTAR
                    </BButton>

                    <p class="text-center">Sudah memiliki akun? <BLink href="/login"
                        class="text-primary fw-bold text-link text-decoration-underline">Login</BLink>
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
        <lottie colors="primary:#121331,secondary:#08a88a" trigger="loop" :options="defaultOptions" :height="120"
          :width="120" />
        <div class="mt-4">
          <h4 class="mb-3 title-auth">Masukkan Kode OTP</h4>
          <p class="text-muted mb-4">Silakan masukkan kode verifikasi yang kami kirimkan ke
            untuk memvalidasi akun Anda.</p>
          <div class="vstack gap-3 justify-content-center" id="otp-input">

            <div class="otp-input">
              <input v-for="(digit, index) in otp" :key="index" v-model="otp[index]" type="text" maxlength="1"
                class="otp-box" :ref="'otp' + index" @input="focusNext(index)"
                @keydown.backspace="focusPrev(index, $event)" />
              <p class="mt1"> <span class="text-danger text-start" v-if="otpError">Kode OTP tidak
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

    <BModal v-model="modalShow1" hide-footer class="v-modal-custom" hide-header-close centered>
      <div class="modal-body">
        <lottie colors="primary:#121331,secondary:#08a88a" trigger="loop" :options="defaultOptions" :height="120"
          :width="120" />
        <div class="mt-4">
          <h4 class="mb-3 title-auth text-center">Lupa Password</h4>
          <p class="text-muted mb-4 text-center">Silakan masukkan alamat email, Anda akan menerima Kode OTP untuk
            mengatur ulang kata sandi Anda.</p>
          <div class="vstack gap-5 justify-content-center" id="otp-input">

            <BFormGroup>
              <BFormLabel class="form-label">Email</BFormLabel>
              <BFormInput v-model="forgotEmail" />
              <span class="text-danger text-start" v-if="forgotPasswordError">Email tidak ditemukan</span>
            </BFormGroup>


            <BButton @click="submitForgotPassword" class="btn btn-dark">Verifikasi</BButton>
          </div>
        </div>
      </div>
    </BModal>
  </section>
</template>
