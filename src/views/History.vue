<template>
<div class="container col">
  <div class="row"> 
    <div class="header col-sm-12 col-md-12 col-lg-12 bg-white">
      <ul class="nav justify-content-between">
        <li class="nav-item">
          <font-awesome-icon
            :icon="['fas', 'list']"
            size="2x"
            class="toggler mt-2"
            data-toggle="collapse"
            href="#features-drop"
            aria-expanded="false"
            aria-controls="collapseExample"
          />
        </li>
        <li class="nav-item">
          <h3 class="nav-link header-nav-title font-weight-bold pb-1 text-center" href="#">History</h3>
        </li>
        <li class="nav-item">
          <font-awesome-icon  :icon="['fas', 'sign-out-alt']"
            size="2x"
            v-b-tooltip.hover
            title="Logout"
            class="logout ml-2 mt-1"
            v-on:click="logout"/>
        </li>
      </ul>
    </div>
    <div class="col-sm-12 col-md-12 col-lg-12 bg-white">
      <div class="row">
        <Features :roleUser="roleUser" />
        <div class="col-ms-12 col-md-12 col-lg-12 col-xl-12">
          <div class="col-ms-12 col-md-12 col-lg-12 col-xl-12">
            <div class="col-ms-12 col-md-12 col-lg-12 col-xl-12">
              <div class="row justify-content-center">
                <div class="card col-sm-4 col-md-4 col-lg-4 col-xl-4" style="width: 18rem;">
                  <img
                    src="https://user-images.githubusercontent.com/55235155/102016163-20381d00-3d92-11eb-8c3d-af102b22275e.png"
                    class="card-img-top incomeCard"
                  />
                </div>
                <div class="card col-sm-4 col-md-4 col-lg-4 col-xl-4 " style="width: 18rem;">
                  <img
                    src="https://user-images.githubusercontent.com/55235155/102016164-20d0b380-3d92-11eb-9430-3bba0cdf5088.png"
                    class="card-img-top incomeCard"
                  />
                </div>
                <div class="card col-sm-4 col-md-4 col-lg-4 col-xl-4" style="width: 18rem;">
                  <img
                    src="https://user-images.githubusercontent.com/55235155/102016223-69886c80-3d92-11eb-9e90-43f662d56589.png"
                    class="card-img-top incomeCard"
                  />
                </div>
              </div>
            </div>
            <div class="col-ms-12 col-md-12 col-lg-12 col-xl-12">
              <img
                src="https://user-images.githubusercontent.com/55235155/102016162-1f06f000-3d92-11eb-9f45-d1017b2a8efd.png"
                class="card-img-top revenueCard"
              />
            </div>
          </div>
          <div class="col-ms-12 col-md-12 col-lg-12 col-xl-12">
            <h5 class="text-center"><strong>Recent Order</strong> </h5>
            <b-table striped hover :items="dataHistory" :fields="fields"></b-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Features from "../components/features.vue";
export default {
  name: "History",
  components: {
    Features
  },
  data() {
    return {
      roleUser: false,
      fields: [
        {
          key: "invoice",
          label: "INVOICES",
          sortable: true,
        },
        {
          key: `createdAt`,
          label: "DATES",
          sortable: true,
        },
        {
          key: "cashier",
          label: "CASHIER",
        },
        {
          key: "menu_name",
          label: "ORDER MENU",
          sortable: true,
        },
        {
          key: "amount",
          label: "AMOUNT",
          sortable: true,
        },
      ],
      items: [],
    };
  },
  methods:{
    ...mapActions(["getHistory"]),
    
    logout() {
      this.$store.dispatch("delToken");
    },
  },
  mounted() {
    this.getHistory();
     if (this.$store.getters.dataToken.role === "admin") {
       this.roleUser = true;
    } else {
      this.roleUser = false;
    }
  },
  computed: {
    ...mapGetters(["dataHistory"]),
    dataToken() {
      return this.$store.getters.dataToken;
    },
  },
};
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap');
.header-nav-title{
    font-family: 'Bree Serif', serif;
    font-size: 25px;
    letter-spacing: 2px;
}
.header {
  -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
}
.card {
  border: none;
}
.clip-icon {
  color: #9da2ad;
}
.utensils-icon {
  color: #11263c;
}

.features-menu {
  border: none;
}
@media only screen {
  .list-group {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
  }
}
h3 {
  font-size: 1.5rem;
}
.history {
  background: #e5e5e5;
}
.hamburger{
  color: #cf8301;
}
.toggler{
  cursor: pointer;
}
.logout{
  cursor: pointer;
}
.logout:hover{
  color:red;
  cursor: pointer;
}
.incomeCard{
  height: 75%;
  width: 75%;
}
.revenueCard{
  height: 75%;
  width: 100%;
}
</style>
