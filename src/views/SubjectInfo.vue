<template>
  <div class="markdown-container">
    <MarkdownRenderer :source="fullContent" />
  </div>
</template>

<script>
import MarkdownRenderer from '@/components/kpi/MarkdownRenderer.vue';

export default {
  components: {
    MarkdownRenderer,
  },
  props: {
    source: String, // Accepting 'source' prop
    zapocetColor: String,
    textColorInZapocet: String,
  },
  data() {
    return {
      fullContent: '',
    };
  },
  watch: {
    source: {
      immediate: true,
      handler(newValue) {
        this.loadFullContent(newValue); // Load content when source changes
      }
    }
  },
  methods: {
    async loadFullContent(postId) {
      try {
        const response = await fetch(`/documents/Predmety/${postId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const text = await response.text();
        this.fullContent = text; // Set the full content
      } catch (error) {
        console.error('Error loading markdown file:', error);
      }
    },
    
  },
};
</script>

<style>
.markdown-container {
  width: 95%;
  margin: 0 auto;
  text-align: left;
  
}
.points-bar {
    display: flex;
    height: 20px;
    background-color: #f1f1f1;
    overflow: hidden;
}

.points {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 0.8em;
}

.zapocet {
  color: v-bind(textColorInZapocet);
  background-color: v-bind(zapocetColor);
}

.skuska {
    color: black;
    background-color:rgb(208, 208, 208);
}
</style>
