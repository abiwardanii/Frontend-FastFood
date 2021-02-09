<template>
  <div class="features col-sm-12 col-md-12 col-lg-12 col-xl-12 bg-white collapse" id="features-drop">
    <div class="d-flex list-group mb-2">
      <li class="list-group-item list-group-item-action features-menu text-center p-0 ml-1 mt-3">
        <router-link to="/">
          <img src="https://img.icons8.com/color/64/000000/dining-room.png" v-b-tooltip.hover title="Home"/>
        </router-link>
      </li>
      <li class="list-group-item list-group-item-action features-menu text-center p-0 ml-1 mt-3" v-if="roleUser === true">
        <router-link to="/history">
          <img src="https://img.icons8.com/color/64/000000/order-history.png" v-b-tooltip.hover title="History"/>
        </router-link>
      </li>
      <li class="list-group-item list-group-item-action features-menu text-center p-0 ml-1 mt-3" v-if="roleUser === true">
      <img src="https://img.icons8.com/color/64/000000/add-book.png"
         class="add-icon"
         v-b-modal.modal-1
         v-b-tooltip.hover title="Add Menu"
         />
      </li>
      <li class="list-group-item list-group-item-action features-menu text-center p-0 ml-1 mt-3" v-if="roleUser === true">
        <router-link to="/catalog">
          <img src="https://img.icons8.com/nolan/64/store-setting.png" v-b-tooltip.hover title="Catalog Menu" />
        </router-link>
      </li>
    </div>
    <AddMenu />
  </div>
</template>

<script>
import AddMenu from "./AddMenu";
export default {
  name: "Features",
  components: {
    AddMenu,
  },
  props: {
    roleUser: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style scoped>
.add-icon {
  cursor: pointer;
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
</style>