<template>
  <div class="login">
    <div class="login-content text-center">
      <div class="row login-shadow">
        <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 brand-logo bg-white">
          <h3 class="welcome font-weight-bold">WELCOME TO</h3>
          <img
            src="https://user-images.githubusercontent.com/55235155/103128710-00c1be00-46c9-11eb-8e26-2fbb03729fcb.png"
          />
          <h5 class="motto">We are ready to serve you quickly</h5>
        </div>
        <div
          class="col-sm-12 col-md-6 col-lg-6 col-xl-6 form-login bg-white"
          v-if="loginPage === true"
        >
          <b-form class="form-signin">
            <h1 class="signin h3 mb-3 font-weight-normal">Sign In</h1>
            <b-row>
              <font-awesome-icon
                class="col-2"
                :icon="['fas', 'envelope-square']"
                size="2x"
              />
              <b-form-input
                type="email"
                id="inputEmail"
                class="form-control col-10 mb-2"
                placeholder="Email address"
                v-model="formLogin.email"
                v-on:keyup.enter="login"
                required
                autofocus
                :state="valLoginEmail"
              >
              </b-form-input>
            </b-row>

            <b-row>
              <font-awesome-icon
                class="col-2"
                :icon="['fas', 'lock']"
                size="2x"
              />
              <b-form-input
                type="password"
                id="inputPassword"
                class="form-control col-10 mb-4"
                placeholder="Password"
                v-on:keyup.enter="login"
                v-model="formLogin.password"
                required
                :state="valLoginPass"
              >
              </b-form-input>
            </b-row>

            <button class="btn btn-block" type="button" v-on:click="login">
              Login
            </button>
            <br />
            <p>
              Don't have an account?
              <span
                class="register-session text-primary"
                v-on:click="switchPage"
                >Register Here
              </span>
            </p>

            <p class="mb-3 text-muted">&copy; FastFood since 2020</p>
          </b-form>
        </div>
        <div
          class="col-sm-12 col-md-6 col-lg-6 col-xl-6 form-register bg-white"
          v-else
        >
          <div class="signup-section">
            <b-form class="form-signup">
              <h1 class="signup h3 mb-3 font-weight-normal">Sign Up</h1>
              <b-row>
                <font-awesome-icon
                  class="col-2"
                  :icon="['fas', 'address-card']"
                  size="2x"
                />
                <b-form-input
                  type="text"
                  id="inputName"
                  class="form-control col-10 mb-2 input__valid"
                  placeholder="Your Name"
                  v-model="formRegister.username"
                  v-on:keyup.enter="register"
                  required
                  autofocus
                  :state="valRegisUser"
                >
                </b-form-input>
              </b-row>

              <b-row>
                <font-awesome-icon
                  class="col-2"
                  :icon="['fas', 'envelope-square']"
                  size="2x"
                />
                <b-form-input
                  type="email"
                  id="inputEmail"
                  class="form-control col-10 mb-2 input__valid"
                  placeholder="Email address"
                  v-model="formRegister.email"
                  v-on:keyup.enter="register"
                  required
                  autofocus
                  :state="valRegisEmail"
                >
                </b-form-input>
              </b-row>

              <b-row>
                <font-awesome-icon
                  class="col-2"
                  :icon="['fas', 'lock']"
                  size="2x"
                />
                <b-form-input
                  type="password"
                  id="inputPassword"
                  class="form-control col-10 input__valid"
                  placeholder="Password"
                  v-model="formRegister.password"
                  v-on:keyup.enter="register"
                  required
                  :state="valRegisPass"
                >
                </b-form-input>
              </b-row>

              <button
                class="btn btn-block mt-2"
                type="button"
                v-on:click="register"
              >
                Register
              </button>
              <br />
              <p>
                Already have an account?
                <span
                  class="register-session text-primary"
                  v-on:click="switchPage"
                >
                  Login Here
                </span>
              </p>
              <p class="mb-3 text-muted">&copy; FastFood since 2020</p>
            </b-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginPage: true,
      formLogin: {
        email: null,
        password: null,
      },
      formRegister: {
        email: null,
        username: null,
        password: null,
      },
      reg: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    };
  },
  methods: {
    switchPage() {
      if (this.loginPage === true) {
        this.loginPage = false;
      } else {
        this.loginPage = true;
      }
    },
    login() {
      if (this.formLogin.email == null || this.formLogin.password == null) {
        alert("You must enter your email and password");
      } else {
        if (!this.valLoginEmail) {
          this.reset();
          return alert("This must be an email");
        }
        if (!this.valLoginPass) {
          this.reset();
          return alert("Password must be at least 6 letters");
        }
        this.$store
          .dispatch("getToken", this.formLogin)
          .then(() => {
            this.$router.push({ name: "Home" });
          })
          .catch((err) => {
            alert(err);
            console.log(err);
          });
      }
    },
    register() {
      if (
        this.formRegister.email == null ||
        this.formRegister.password == null ||
        this.formRegister.username == null
      ) {
        alert("You must fill in the data completely!");
      } else {
         if (!this.valRegisUser) {
          this.reset();
          return alert("Username must be at least 3 letters");
        }
        if (!this.valRegisEmail) {
          this.reset();
          return alert("This must be an email");
         }
        if (!this.valRegisPass) {
          this.reset();
          return alert("Password must be at least 6 letters");
        }
        this.$store
          .dispatch("createUser", this.formRegister)
          .then(() => {
            alert("Account successfully registered");
            this.loginPage = true;
            this.reset;
          })
          .catch((err) => {
            this.reset;
            alert(err);
          });
      }
    },
    reset() {
      this.formRegister.email == null;
      this.formRegister.password == null;
      this.formRegister.username == null;
    },
  },
  computed: {
    valLoginPass() {
      if (this.formLogin.password) {
        return this.formLogin.password.length >= 6;
      } else {
        return false;
      }
    },
    valLoginEmail(){
      const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
      if (re.test(this.formLogin.email)) {
        return true;
      } else {
        return false;
      } 
    },
    valRegisPass() {
      if (this.formRegister.password) {
        return this.formRegister.password.length > 6;
      } else {
        return false;
      }
    },
    valRegisUser(){
       if (this.formRegister.username) {
        return this.formRegister.username.length > 2;
      } else {
        return false;
      }
    },
    valRegisEmail(){
      const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/;
      if (re.test(this.formRegister.email)) {
        return true;
      } else {
        return false;
      } 
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap");
.login {
  background: url(https://user-images.githubusercontent.com/55235155/103134152-b00a8f00-46e1-11eb-9146-40794297d041.jpg)
    no-repeat;
  background-size: cover;
}
.login-shadow {
  -webkit-box-shadow: 0 10px 6px -6px #777;
  -moz-box-shadow: 0 10px 6px -6px #777;
  box-shadow: 0 10px 6px -6px #777;
  border-bottom-right-radius: 40px;
  border-bottom-left-radius: 40px;
}
.login-content {
  width: 100%;
  max-width: 700px;
  margin: auto;
  padding-top: 150px;
  padding-bottom: 176px;
}
.register-session {
  cursor: pointer;
}
.signin,
.signup,
.motto,
.welcome {
  font-family: "Roboto Slab", serif;
}
.form-login,
.form-register {
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
}
.brand-logo {
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
}
.btn {
  background-color: #ffc229;
  color: white;
}
</style>