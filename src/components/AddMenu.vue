<template>
  <div>
    <b-modal
      id="modal-1"
      title="Add Menu"
      hide-footer
    >
      <b-form @submit="addMenu" @reset="onReset">
        <b-form-group id="input-group-1" label="Menu Name" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="form.product_name"
            type="text"
            required
            placeholder="Enter menu"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Image" label-for="input-2">
          <b-form-file
            id="input-2"
            v-model="form.product_img"
            required
            placeholder="Upload image"
            accept="image/*"
          ></b-form-file>
        </b-form-group>
        <b-form-group id="input-group-3" label="Price" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="form.product_price"
            type="number"
            required
            placeholder="Enter price"
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-4" label="Category" label-for="input-4">
          <b-form-select
            id="input-4"
            v-model="form.category_id"
            :options="category"
            required
          ></b-form-select>
        </b-form-group>
        <div class="d-flex justify-content-end" >
          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "AddMenu",
  data() {
    return {
      form: {
        product_name: "",
        product_img: [],
        product_price: "",
        category_id: null,
      },
      category: [
        { text: "Food", value: 1 },
        { text: "Drink", value: 2 },
      ],
    };
  },
  methods: {
    onReset() {
      this.form.product_name = "";
      this.form.product_img = [];
      this.form.product_price = "";
      this.form.category_id = null;
    },
    resetMenu(){
      this.form = {
        product_name: null,
        prodcut_price: null,
        product_img: [],
        category_id: null
      };
    },
    addMenu() {
      let formMenu = new FormData();
        formMenu.append("product_img", this.form.product_img);
        formMenu.append("product_name", this.form.product_name);
        formMenu.append("product_price", this.form.product_price);
        formMenu.append("category_id", this.form.category_id);

        this.$store
          .dispatch("addMenu", formMenu)
          .then((res) => {
            alert(res.data.result)
          })
          .catch((err) => {
            console.log(err)
            this.resetMenu;
          });
    },
  },
  computed: {
    ...mapGetters(["dataMenu"]),
    dataToken() {
      return this.$store.getters.dataToken;
    },
  },
};
</script>

<style scoped></style>
