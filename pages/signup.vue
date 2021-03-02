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

        <c-button type="submit" variant-color="blue" w="100%" my="4"
          >Get Started</c-button
        >

        <p class="text-center">
          Already have an account?
          <c-link as="router-link" to="/signin"> Sign In </c-link>
        </p>
      </form>
    </c-box>
  </c-flex>
</template>

<script>
export default {
  layout: 'auth',
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
        const response = await this.$axios.post('/api/auth/signup', {
          ...this.register
        });

        if (!response.data.success) {
          return this.$toast({
            title: 'Sign up error.',
            description: 'Unable to create account. Please try again.',
            status: 'error',
            duration: 10000
          });
        }

        await this.$auth.loginWith('local', {
          data: { ...this.register }
        });

        this.$toast({
          title: 'Account created.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 10000
        });

        this.$router.push('/');
      } catch (err) {
        this.$toast({
          title: 'Sign up error.',
          description: 'Unable to create account. Please try again.',
          status: 'error',
          duration: 10000
        });
        this.$router.push('/signin');
      }
    }
  }
};
</script>
