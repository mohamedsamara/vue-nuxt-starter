<template>
  <header>
    <c-flex align="center" :p="['3', '3', '5']" border-bottom-width="1px">
      <c-flex align="center">
        <c-link as="router-link" to="/"> Logo </c-link>
      </c-flex>

      <c-flex v-if="!hiddenAuth" align="center" ml="auto">
        <c-button as="router-link" to="/signin" mr="6">Sign In</c-button>
        <c-button as="router-link" to="/signup">Sign Up</c-button>
      </c-flex>
    </c-flex>
  </header>
</template>

<script>
export default {
  props: {
    hiddenAuth: {
      type: Boolean,
      default: false
    }
  }
};
</script>
