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
      <c-heading text-align="center" mb="12">Signup</c-heading>

      <form @submit.prevent="userRegister">
        <c-form-control is-required mb="6">
          <c-form-label for="name">Name</c-form-label>
          <c-input id="name" v-model="register.name" placeholder="Name" />
        </c-form-control>

        <c-form-control is-required mb="6">
          <c-form-label for="email">Email address</c-form-label>
          <c-input
            id="email"
            v-model="register.email"
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
            v-model="register.password"
            type="password"
            placeholder="Password"
          />
        </c-form-control>

        <c-button type="submit" variant-color="blue" w="100%" mt="4"
          >Get Started</c-button
        >
      </form>
    </c-box>
  </c-flex>
</template>

<script>
export default {
  data() {
    return {
      register: {
        name: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async userRegister() {
      try {
        await this.$axios.post('/api/auth/signup', {
          ...this.register
        });

        await this.$auth.loginWith('local', {
          data: { ...this.register }
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
