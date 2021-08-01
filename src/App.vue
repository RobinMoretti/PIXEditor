<template>
	<div id="app" v-on:mousemove="updateMousePosition">
		<router-view/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

import { useStore } from '@/store';
import { DocumentsActionTypes } from '@/store/modules/documents/action-types';


export default defineComponent({
  name: 'App',
  components: {

  },
  setup() {
    const store = useStore();

    async function fetchDocuments() {
      try {
        await store.dispatch(DocumentsActionTypes.FETCH_DOCUMENTS, '1');
      } catch (error) {
        console.error('fetchDocuments', error);
      }
    }

    return {
      fetchDocuments,
    };
  },
  computed: {
    ...mapGetters('profile', ['isClient', 'isAdmin']),
  },
});
</script>

scrip


<style lang="scss">

  @import "./assets/sass/app.scss";

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    padding: 12px;
  }

</style>
