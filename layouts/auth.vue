<template>
  <div class="container">
    <CThemeProvider>
      <CColorModeProvider>
        <CBox font-family="body" as="main" class="main">
          <CReset />
          <Header hidden-auth />
          <Nuxt />
        </CBox>
      </CColorModeProvider>
    </CThemeProvider>
  </div>
</template>
<script>
import {
  CThemeProvider,
  CColorModeProvider,
  CReset,
  CBox
} from '@chakra-ui/vue';

import Header from '@/components/Header';

export default {
  components: {
    CThemeProvider,
    CColorModeProvider,
    CReset,
    CBox,
    Header
  }
};
</script>
