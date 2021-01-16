<template>
  <div class="features col-sm-12 col-md-12 col-lg-12 col-xl-12 bg-white collapse" id="features-drop">
    <div class="d-flex list-group mb-2">
      <li class="list-group-item list-group-item-action features-menu text-center p-0 ml-1 mt-3">
        <router-link to="/">
          <font-awesome-icon :icon="['fas', 'utensils']" class="utensils-icon" size="3x" v-b-tooltip.hover title="Home" />
        </router-link>
      </li>
      <li class="list-group-item list-group-item-action features-menu text-center p-0 ml-1 mt-3" v-if="roleUser === true">
        <router-link to="/history">
          <font-awesome-icon :icon="['fas', 'clipboard-list']" class="clip-icon" size="3x" v-b-tooltip.hover title="History" />
        </router-link>
      </li>
      <li class="list-group-item list-group-item-action features-menu text-center p-0 ml-1 mt-3" v-if="roleUser === true">
        <font-awesome-icon
          :icon="['fas', 'plus']"
          class="add-icon"
          size="3x"
          alt="add"
          v-b-modal.modal-1
          v-b-tooltip.hover title="Add Menu"
        />
      </li>
      <li class="list-group-item list-group-item-action features-menu text-center p-0 ml-1 mt-3" v-if="roleUser === true">
        <router-link to="/catalog">
          <font-awesome-icon :icon="['fas', 'hamburger']" class="hamburger" size="3x" v-b-tooltip.hover title="Catalog Menu" />
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
.clip-icon {
  color: #9da2ad;
}
.utensils-icon {
  color: #11263c;
}
.add-icon {
  color: green;
  cursor: pointer;
}
.hamburger{
  color: #cf8301;
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