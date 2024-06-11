<template>
  <div v-html="renderedContent"></div>
</template>
  
<script>
import MarkdownIt from 'markdown-it';

export default {
  props: ['source'],
  data() {
    return {
      md: new MarkdownIt({
        html: true, // Enable HTML tags in source
        linkify: true,
        typographer: true,
      }),
      renderedContent: '',
    };
  },
  watch: {
    source: {
      immediate: true,
      handler() {
        this.renderedContent = this.md.render(this.source);
      }
    }
  }
};
</script>  