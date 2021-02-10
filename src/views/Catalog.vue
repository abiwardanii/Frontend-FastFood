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
          <h3
            class="nav-link header-nav-title font-weight-bold pb-1 text-center"
            href="#"
          >
            Catalog Menu
          </h3>
        </li>
        <li class="nav-item">
          <font-awesome-icon
            :icon="['fas', 'sign-out-alt']"
            size="2x"
            v-b-tooltip.hover
            title="Logout"
            class="logout ml-2 mt-1"
            v-on:click="logout"
          />
        </li>
      </ul>
    </div>
    <div class="col-sm-12 col-md-12 col-lg-12 bg-white">
      <div class="row">
        <Features :roleUser="roleUser" />
        <div class="col-sm-12 col-md-12 col-lg-12 col-xl-12">
          <table class="table">
            <thead class="thead-dark">
              <tr>
                <th scope="col">MENU</th>
                <th scope="col">NAME</th>
                <th scope="col">PRICE</th>
                <th colspan="2">ACTION</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="menu in dataMenu" :key="menu.product_id">
                <td scope="row">
                  <img class="catalog-img" :src="menu.product_img" />
                </td>
                <td>
                  <strong>{{ menu.product_name }}</strong>
                </td>
                <td>
                  <strong>Rp.{{ menu.product_price }}</strong>
                </td>
                <td>
                  <button
                    class="btn btn-primary"
                    v-b-modal.UpCatalog
                    @click="editMenu(menu)"
                  >
                    <font-awesome-icon :icon="['fas', 'edit']" size="1x"/>
                  </button>
                </td>
                <td>
                  <button class="btn btn-danger" @click="delMenu(menu)">
                    <font-awesome-icon :icon="['fas', 'trash']" size="1x"/>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <b-modal id="UpCatalog" title="Update Menu" hide-footer>
            <b-form>
              <b-form-group
                id="input-group-1"
                label="ID Menu"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="formCatalog.product_id"
                  type="text"
                  required
                  placeholder="ID Menu"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-2"
                label="Menu Name"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="formCatalog.product_name"
                  type="text"
                  required
                  placeholder="Enter menu"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-3"
                label="Image"
                label-for="input-3"
              >
                <b-form-file
                  id="input-3"
                  v-model="formCatalog.product_img"
                  required
                  placeholder="Edit image"
                  accept="image/*"
                >
                </b-form-file>
              </b-form-group>
              <b-form-group
                id="input-group-4"
                label="Price"
                label-for="input-4"
              >
                <b-form-input
                  id="input-4"
                  v-model="formCatalog.product_price"
                  type="number"
                  required
                  placeholder="Enter price"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                id="input-group-5"
                label="Category"
                label-for="input-5"
              >
                <b-form-select
                  id="input-5"
                  v-model="formCatalog.category_id"
                  :options="category"
                  required
                ></b-form-select>
              </b-form-group>
              <div class="d-flex justify-content-end">
                <b-button type="submit" variant="primary" @click="updateMenu()">
                  Update
                </b-button
                >
              </div>
            </b-form>
          </b-modal>
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
  name: "Catalog",
  components: {
    Features
  },
  data() {
    return {
      roleUser: false,
      formCatalog: {
        product_id: null,
        product_name: null,
        product_img: [],
        product_price: null,
        category_id: null,
      },
      category: [
        { text: "Food", value: 1 },
        { text: "Drink", value: 2 },
      ],
    };
  },
  methods: {
  ...mapActions(["getMenu"]),
    editMenu(value) {
      this.formCatalog.product_id = value.product_id;
      this.formCatalog.product_name = value.product_name;
      this.formCatalog.product_price = value.product_price;
      this.formCatalog.category_id = value.category_id;
    },
    updateMenu() {
      let formData = new FormData();
      formData.append("product_id", this.formCatalog.product_id);
      if (this.formCatalog.product_img.length !== 0) {
        formData.append("product_img", this.formCatalog.product_img);
      }
      if (this.formCatalog.product_name) {
        formData.append("product_name", this.formCatalog.product_name);
      }
      if (this.formCatalog.product_price) {
        formData.append("product_price", this.formCatalog.product_price);
      }
      if (this.formCatalog.category_id) {
        formData.append("category_id", this.formCatalog.category_id);
      }
        this.$store
        .dispatch("updateMenu", formData)  
        .then(() => {
          alert("Catalog Menu Updated Successfully");
          this.getMenu();
        })
        .catch((err) => {
          alert("Error Update Menu!");
          console.log(err);
        });
    },
    delMenu(data) {
        this.$store
        .dispatch("delMenu", data.product_id)
        .then(() => {
          alert("Menu Deleted Successfully");
          this.getMenu();
        })
        .catch((err) => {
          alert("Error Delete Menu!");
          this.getMenu();
          console.log(err);
        });
    },
    logout() {
      this.$store.dispatch("delToken"); 
    },
  },
  mounted() {
    this.getMenu();
    if (this.$store.getters.dataToken.role === "admin") {
      this.roleUser = true;
    } else {
      this.roleUser = false;
    }
  },
  computed: {
    ...mapGetters(["dataMenu"]),
    dataToken() {
      return this.$store.getters.dataToken;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bree+Serif&display=swap");
.header-nav-title {
  font-family: "Bree Serif", serif;
  font-size: 25px;
  letter-spacing: 2px;
}
.catalog-img {
  width: 18vw;
  height: 22vh;
}
.features-menu {
  border: none;
}
.clip-icon {
  color: #9da2ad;
}
.utensils-icon {
  color: #11263c;
}
.hamburger {
  color: #cf8301;
}
@media only screen {
  .list-group {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
  }
}
.toggler {
  cursor: pointer;
}
.logout{
  cursor: pointer;
}
.logout:hover{
  color:red;
  cursor: pointer;
}
</style>