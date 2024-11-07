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
      showPasswordConfirm: false,
      email: "admin@themesbrand.com",
      password: "123456",
      passwordConfirm: "123456",
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
      processing: false,
      modalShow1: false,
      modalShow2: false,
      otp: [],
      otpLength: 4, // Adjust the OTP length as needed
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

    async signinapi() {
      this.processing = true;
      const result = await axios.post('https://api-node.themesbrand.website/auth/signin', {
        email: this.email,
        password: this.password
      });
      if (result.data.status == 'errors') {
        return this.authError = result.data.data;
      }
      localStorage.setItem('jwt', result.data.token);
      this.$router.push({
        path: '/'
      });
    },

    // Try to log the user in with the username
    // and password they provided.
    tryToLogIn() {
      this.processing = true;
      this.submitted = true;
      // stop here if form is invalid
      this.$touch;

      if (this.$invalid) {
        return;
      } else {
        if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
          this.tryingToLogIn = true;
          // Reset the authError if it existed.
          this.authError = null;
          return (
            this.logIn({
              email: this.email,
              password: this.password,
            })
              // eslint-disable-next-line no-unused-vars
              .then((token) => {
                this.tryingToLogIn = false;
                this.isAuthError = false;
                // Redirect to the originally requested page, or to the home page
                this.$router.push({
                  path: '/'
                });
              })
              .catch((error) => {
                this.tryingToLogIn = false;
                this.authError = error ? error : "";
                this.isAuthError = true;
                this.processing = false;
              })
          );
        } else if (process.env.VUE_APP_DEFAULT_AUTH === "fakebackend") {
          const { email, password } = this;
          if (email && password) {
            this.login({
              email,
              password,
            });
          }
        } else if (process.env.VUE_APP_DEFAULT_AUTH === "authapi") {
          axios
            .post("http://127.0.0.1:8000/api/login", {
              email: this.email,
              password: this.password,
            })
            .then((res) => {
              return res;
            });
        }
      }
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
</style>

<template>

  <section class="vh-100">
    <div class="container-fluid">
      <div class="row">

        <div class="col-sm-4 px-0 d-none d-sm-block vh-100 text-center align-items-center justify-content-center"
          style="background-color: black;">
          <img src="@/assets/images/logo.svg" alt="Logo" class="image-auth" />
          <div class="d-flex flex-column justify-content-center align-items-center"
            style="height: 70%;padding: 0px 64px;">


            <div class="text-white">
              <p class="title-auth">
                Solusi All-In-One
                Manajemen Armada
              </p>

              <p class="subtitle-auth">
                Mengoptimalkan kinerja armada, meningkatkan <span class="text-sub-primary">efisiensi
                  operasional</span>, dan
                <span class="text-sub-primary">memaksimalkan profitabilitas</span>
              </p>
            </div>
          </div>
        </div>

        <div class="col-sm-8 text-black bg-white">

          <div class="d-flex justify-content-center align-items-center vh-100">
            <form style="width: 23rem">
              <h3 class="fw-normal mb-3 pb-3 title-form">
                Buat Password
              </h3>
              <p>Password Anda harus lebih dari minimal 8 karakter dan menyertakan kombinasi angka, huruf, dan karakter
                khusus (1SAR @%).</p>

              <div data-mdb-input-init class="form-outline mb-4">
                <label class="form-label" for="form2Example28">Password Baru</label>
                <div class="form-outline mb-4 position-relative">
                  <input :type="showPassword ? 'text' : 'password'" v-model="password" id="form2Example28"
                    class="form-control form-control-lg" />

                  <!-- Eye Icon -->
                  <i :class="showPassword ? 'ri-eye-line' : 'ri-eye-off-line'" @click="togglePassword"
                    style="position: absolute; right: 15px; top: 15px; cursor: pointer;"></i>
                </div>
              </div>

              <div data-mdb-input-init class="form-outline mb-4">
                <label class="form-label" for="form2Example28">Konfirmasi Password Baru</label>
                <div class="form-outline mb-4 position-relative">
                  <input :type="showPasswordConfirm ? 'text' : 'password'" v-model="passwordConfirm" id="form2Example28"
                    class="form-control form-control-lg" />

                  <!-- Eye Icon -->
                  <i :class="showPasswordConfirm ? 'ri-eye-line' : 'ri-eye-off-line'" @click="togglePasswordConfirm"
                    style="position: absolute; right: 15px; top: 15px; cursor: pointer;"></i>
                </div>
              </div>

              <div class="d-flex justify-content-between mb-4">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" value="" id="rememberMe" />
                  <label class="form-check-label" for="rememberMe">Ingat saya</label>
                </div>
                <div>
                  <BLink href="javascript:void(0);" @click="modalShow1 = !modalShow1" class="text-primary">Lupa
                    password?
                  </BLink>
                </div>
              </div>

              <div class="pt-1 mb-4">
                <button type="button" class="btn btn-dark btn-lg btn-block w-100 waves-effect waves-light">Reset
                  Password</button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>


    <!-- Vertically Centered -->
    <BModal v-model="modalShow1" hide-footer class="v-modal-custom" hide-header-close centered>
      <div class="modal-body text-center">
        <lottie colors="primary:#121331,secondary:#08a88a" trigger="loop" :options="defaultOptions" :height="120"
          :width="120" />
        <div class="mt-4">
          <h4 class="mb-3 title-auth">Lupa password?</h4>
          <p class="text-muted mb-4">Silakan masukkan alamat email, Anda akan menerima Kode OTP untuk mengatur
            ulang kata sandi Anda.</p>
          <div class="vstack gap-5 justify-content-center">
            <BFormInput type="email" placeholder="Email" />
            <BButton type="button" variant="dark" @click="() => {
              modalShow1 = false;
              modalShow2 = true;
            }">
              Kirim OTP</BButton>
          </div>
        </div>
      </div>
    </BModal>

    <BModal v-model="modalShow2" hide-footer class="v-modal-custom" hide-header-close centered>
      <div class="modal-body text-center">
        <lottie colors="primary:#121331,secondary:#08a88a" trigger="loop" :options="defaultOptions" :height="120"
          :width="120" />
        <div class="mt-4">
          <h4 class="mb-3 title-auth">Masukkan Kode OTP</h4>
          <p class="text-muted mb-4">Silakan masukkan kode verifikasi yang kami kirimkan ke Agan@*****.com
            untuk memvalidasi akun Anda.</p>
          <div class="vstack gap-3 justify-content-center" id="otp-input">

            <div class="otp-input">
              <input type="text" v-for="i in otpLength" :key="i" :value="otp[i - 1]" @input="handleOtpChange($event, i)"
                maxlength="1" :ref="'otp' + i" />
            </div>

            <p class="text-muted mb-4">Tidak menerima kode?</p>

            <BLink href="javascript:void(0);" class="text-primary">Kirim ulang via email</BLink>

            <BLink href="javascript:void(0);" class="text-primary">Kirim ulang via WhatsApp</BLink>


            <router-link to="/reset-password" class="btn btn-dark">Verifikasi</router-link>
          </div>
        </div>
      </div>
    </BModal>
  </section>
</template>