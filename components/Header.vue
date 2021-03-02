<template>
  <header>
    <c-flex align="center" :p="['3', '3', '5']" border-bottom-width="1px">
      <c-flex align="center">
        <c-link as="router-link" to="/"> Logo </c-link>
      </c-flex>

      <c-flex v-if="!authLinks" align="center" ml="auto">
        <div v-if="auth">
          <span>{{ name }}</span>
          <c-button ml="6" @click="signout">Sign Out</c-button>
        </div>

        <div v-else>
          <c-button as="router-link" to="/signin">Sign In</c-button>
          <c-button as="router-link" to="/signup" ml="6">Sign Up</c-button>
        </div>
      </c-flex>
    </c-flex>
  </header>
</template>

<script>
export default {
  props: {
    authLinks: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    auth() {
      return this.$auth.loggedIn;
    },
    name() {
      return this.$auth.user.name;
    }
  },
  methods: {
    signout() {
      this.$auth.logout();
      this.$router.push('/signin');
    }
  }
};
</script>
