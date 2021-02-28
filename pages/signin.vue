<template>
  <c-flex align="center" justify="center" h="100vh" :p="['3', '3', '0']">
    <c-box
      border-width="1px"
      rounded="lg"
      overflow="hidden"
      p="10"
      m="auto"
      w="35rem"
      h="35rem"
    >
      <c-heading text-align="center" mb="12">Sign In</c-heading>

      <form @submit.prevent="userSignin">
        <c-form-control is-required mb="6">
          <c-form-label for="email">Email address</c-form-label>
          <c-input
            id="email"
            v-model="signin.email"
            type="email"
            placeholder="Email"
            aria-describedby="email-helper-text"
          />
          <c-form-helper-text id="email-helper-text">
            We'll never share your email.
          </c-form-helper-text>
        </c-form-control>

        <c-form-control is-required mb="6">
          <c-form-label for="password">Password</c-form-label>
          <c-input
            id="password"
            v-model="signin.password"
            type="password"
            placeholder="Password"
          />
        </c-form-control>

        <c-button type="submit" variant-color="blue" w="100%" mt="4"
          >Sign In</c-button
        >
      </form>
    </c-box>
  </c-flex>
</template>

<script>
export default {
  data() {
    return {
      signin: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async userSignin() {
      try {
        await this.$auth.loginWith('local', {
          data: this.signin
        });
      } catch (err) {}
    }
  }
};
</script>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
}
</style>
