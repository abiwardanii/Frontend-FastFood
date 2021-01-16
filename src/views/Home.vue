<template>
    <div class="container col">
      <div class="row">
        <div class="col-sm-12 col-md-8 col-lg-8 col-xl-9 p-0">
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
                  class="nav-link header-nav-title font-weight-bold pb-1"
                  href="#"
                >
                  Fast Food
                </h3>
              </li>
              <li class="nav-item mt-1">
                <div class="input-group">
                  <div class="input-group-prepend">
                    <button
                      class="btn btn-outline-secondary dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Sort by
                    </button>
                    <ul class="dropdown-menu">
                      <li class="dropdown-item sort-menu" @click="newestMenu()">Newest Menu</li>
                      <li class="dropdown-item sort-menu" @click="highPrice()">Highest Price</li>
                      <li class="dropdown-item sort-menu" @click="lowPrice()">Lowest Price</li>
                      <li class="dropdown-item sort-menu" @click="sortFood()">Food Menu</li>
                      <li class="dropdown-item sort-menu" @click="sortDrink()">Drink Menu</li>
                    </ul>
                    <input
                      class="search-menu"
                      type="text"
                      placeholder="Search Menu"
                      v-model="menuValue"
                      v-on:keyup="onSearch"
                    />
                    
                      <font-awesome-icon
                        :icon="['fas', 'sign-out-alt']"
                        size="2x"
                        v-b-tooltip.hover title="Logout"
                        class="logout ml-2 mt-1"
                        v-on:click="logout"
                      />
                    
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <main class="col-sm-12 col-md-12 col-lg-12 p-0">
            <div class="row">
              <Features :roleUser="roleUser" />
              <div class="menu col-sm-12 col-md-12 col-lg-12 col-xl-12">
                <div
                  class="content-menu row row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mt-3 mx-1"
                >
                    <Card
                      v-for="cards in dataMenu"
                      :key="cards.product_id"
                      :product_name="cards.product_name"
                      :product_price="Number(cards.product_price)"
                      :product_img="cards.product_img"
                      :Data="cards"
                      @addtoCart="addCart"
                    />
                </div>
              </div>
            </div>
          </main>
        </div>

        <div class="cart-content col-sm-12 col-md-4 col-lg-4 col-xl-3 p-0 bg-white">
          <div class="cart">
            <div class="cart-digit col-12">
              <font-awesome-icon
                :icon="['fas', 'shopping-cart']"
                size="2x"
                class="mr-1"
              />
              <span class="cart-digit-total badge badge-pill badge-primary">
                {{ cartList.length }}
              </span>
            </div>
            <div class="cart-wrap" v-if="cartList && cartList.length > 0">
              <div
                class="item-loop container col"
                v-for="(cards, index) in cartList"
                :key="generateKey(cards.product_id, cards.count)"
              >
                <div class="items row border my-2 mx-1">
                  <div class="image col-4">
                    <img class="img-fluid pt-2" :src="cards.product_img" />
                  </div>
                  <div class="content text-left col-8">
                    <button
                      v-on:click="cartList.splice(index, 1)"
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                    <h5 class="text-left">{{ cards.product_name }}</h5>
                    <div class="prices" :key="cards.product_id">
                      <div class="value-cart form-group row pl-2">
                        <font-awesome-icon
                          :icon="['far', 'minus-square']"
                          size="2x"
                          class="minus-button"
                          @click="updateQty(cards.product_id,'DECRE')"
                        />
                        <input
                          type="number"
                          class="input-pm bg-light form-control p-0 text-center angka"
                          :value="cards.count"
                        />
                        <font-awesome-icon
                          :icon="['far', 'plus-square']"
                          size="2x"
                          class="plus-button"
                          @click="updateQty(cards.product_id,'INCRE')"
                        />
                      </div>  
                    </div>
                    <p class="pb-0">Rp. {{ cards.product_price * cards.count }}</p>
                  </div>
                </div>
              </div>
              <div class="cart-order">
                <div class="order-total">
                  <div class="row mx-1">
                    <h4 class="col-6 font-weight-bold text-left">Total</h4>
                    <h5 class="col-6 font-weight-bold text-right">
                      Rp. {{ totalprice }}
                    </h5>
                  </div>
                </div>
                <p class="text-left"><strong>*Not including tax(10%)</strong></p>
                <b-button
                  class="mt-3"
                  variant="primary"
                  @click="invoice()"
                  v-b-modal="'modal-checkout'"
                  block
                  >Checkout</b-button
                >
                <b-button class="mt-2" variant="danger" @click="resetcart" block>
                  Cancel
                </b-button>
                <br /><br />
              </div>
            </div>
            <div v-else class="cart-list col-12">
              <div class="item-icon text-center">
                <img
                  class="img-fluid"
                  src="../assets/cart/item.png"
                  alt="empty-cart"
                />
              </div>
              <p class="text-center font-weight-bold cart-empty">
                Your cart is empty
              </p>
              <p class="text-center font-weight-bold cart-info-item text-muted">
                Please add some items from the menu
              </p>
            </div>
            <b-modal id="modal-checkout" scrollable class="modal-body" hide-footer>
              <template #modal-title> CHECKOUT</template>
              <div class="modal-cart-align m-3">
                <table class="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">Cashier: abiwardani</th>
                      <th scope="col">ID Invoice: #{{ invoiceid }}</th>
                    </tr>
                  </thead>
                </table>
                <table class="table table-borderless">
                  <thead>
                    <tr>
                      <th scope="col">MENU</th>
                      <th scope="col">PRICE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in cartList" :key="item.product_id">
                      <th scope="row">{{ item.product_name }} {{ item.count }}x</th>
                      <th scope="row">Rp. {{ item.product_price * item.count }}</th>
                    </tr>
                    <tr>
                      <th>Tax 10%</th>
                      <th>Rp. {{ tax }}</th>
                    </tr>
                    <tr>
                      <th>TOTAL PRICE</th>
                      <th>Rp. {{ fixprice }}</th>
                    </tr>
                  </tbody>
                </table>
                <b-button
                  type="submit"
                  class="btn-block"
                  variant="danger"
                  @click="checkout()"
                  >Print</b-button
                >
              </div>
            </b-modal>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Features from "../components/features.vue";
import Card from "../components/card.vue";

export default {
  components: {
    Features,
    Card,
  },
  data() {
    return {
      menuValue: "",
      roleUser: false,
      datamenu: {},
      cartList: [],
      invoiceid: 0,
      tax: 0,
      menu: null,
      formCheck: {
        amount: 0,
        invoice: "",
        cashier: "abiwardani",
        menu_name: "",
      },
    };
  },
  methods: {
    ...mapActions(["getMenu", "addHistory", "searchMenu", "getNewProd", "getHighPrice", "getLowPrice", "getFood", "getDrink"]),
    onSearch() {
      this.searchMenu(this.menuValue);
    },
    newestMenu(){
      this.getNewProd();
    },
    highPrice(){
      this.getHighPrice()
    },
    lowPrice(){
      this.getLowPrice({sort:"ASC"})
    },
    sortFood(){
      this.getFood();
    },
    sortDrink(){
      this.getDrink();
    },
    addCart(Data) {
      let result = this.cartList.find((res) => {
        if (res.product_id == Data.product_id) {
          return res.product_id;
        }
      });

      if (result) {
        for (let i = 0; i < this.cartList.length; i++) {
          if (this.cartList[i].product_id == Data.product_id) {
            const newFoodObject = {
              ...this.cartList[i],
              count: this.cartList[i].count + 1,
            };
            this.$set(this.cartList, i, newFoodObject);
          }
        }
      } else {
        Data.count = 1;
        this.cartList.push(Data);
      }
    },
    resetcart() {
      this.cartList = [];
    },
    invoice() {
      this.invoiceid = Math.round(Math.random() * 100 + 1);
      this.tax = this.totalprice * (10 / 100);
    },
    updateQty(product_id,mode) {
      let result = this.cartList.find((res) => {
        if (res.product_id == product_id) {
          return res.product_id;
        }
      });
      if (result) {
        for (let i = 0; i < this.cartList.length; i++) {
          if (this.cartList[i].product_id == product_id) {
            const newFoodObject = {
              ...this.cartList[i],
              count: mode === 'INCRE' ? this.cartList[i].count + 1 : this.cartList[i].count - 1,             
            };
            this.$set(this.cartList, i, newFoodObject);
          }
        }
      }
    },
    checkout() {
      this.formCheck.amount = this.fixprice;
      this.formCheck.invoice = this.invoiceid;
      let arrayValue = [];
      this.cartList.forEach((value) => {
        arrayValue.push(value.product_name);
      });
      this.formCheck.menu_name = arrayValue.join(", ").toString();
      if(this.addHistory(this.formCheck)){
        alert("Order Success")
        this.resetcart
      } else {
        alert("Order failed")
        this.resetcart
      }
    },
    generateKey(key1, key2) {
      return `${key1}-${key2}`;
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
    totalprice() {
      let total = 0;
      for (const res of this.cartList) {
        total += Number(res.product_price) * Number(res.count);
      }
      return total;
    },
    fixprice() {
      let total = this.tax + this.totalprice;
      return total;
    },
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
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
.search-menu{
  width: 120px;
}
.cart-content {
  position: fixed;
  right: 0px;
  height: 100vh;
}

@media screen and (max-width: 768px) {
  .cart-content {
    position: relative;
  }
}

.cart-digit {
  -webkit-box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.25);
  box-shadow: 1px 2px 1px rgba(0, 0, 0, 0.25);
  margin-top: 12px;
  padding-bottom: 0.5px;
}
.cart-digit-total {
  font-size: 18px;
}
image {
  width: 6em;
  margin: 10px;
  padding: 0;
}
img {
  max-width: 100%;
  max-height: 100%;
}
.prices {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
}
.value-cart {
  margin-right: 20px;
  width: 100px;
}
.input-pm {
  width: 30px;
  height: 30px;
}
.plus-button {
  color: blue;
  cursor: pointer;
}
.minus-button {
  color: red;
  cursor: pointer;
}
.header {
  -webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
}
.search-menu {
  outline: none;
}
h3 {
  font-size: 1.5rem;
}
.logout{
  cursor: pointer;
}
.logout:hover{
  color:red;
  cursor: pointer;
}
.toggler{
  cursor: pointer;
}
@media screen and (max-width: 500px) {
.header-nav-title{
  display: none;
  }
}
.sort-menu{
  cursor: pointer;
}
.cart-order {
  position: absolute;
  bottom: -45px;
  left: 0;
  right: 0;
}
.cart-wrap {
  height: 65vh;
  overflow: auto;
}
</style>
