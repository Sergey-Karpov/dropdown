<template>
  <button
    class="button"
    :class="{ 'loading': isLoading }"
    @click.prevent="handleClick"
    :disabled="isLoading || !isButtonActive"
  >
    <div class="button__inner">
      <span v-if="isLoading" class="loader"></span>
      <span>{{ buttonText }}</span>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    buttonText: {
      type: String,
      required: true
    },
    isButtonActive: {
      type: Boolean,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClick() {
      this.isLoading = true;
    }
  }
};
</script>

<style scoped>
  .button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    padding: 10px 16px;
    min-width: 230px;
    min-height: 48px;
    cursor: pointer;
    border-radius: 8px;
    border: 2px solid lightblue;
    background-color: #f3f3f3;
    transition: all 0.3s ease-in-out;
  }

  .button:hover {
    border-color: rgb(13, 124, 161);
  }
  .button:hover .button__inner {
    color: rgb(13, 124, 161);
  }

  .button.loading {
    pointer-events: none;
  }
  .button.loading .button__inner{
    color: dimgray;
  }
  .button__inner {
    display: flex;
    font-size: 18px;
    line-height: 22px;
    color: black;
    transition: all 0.3s ease-in-out;
  }

  .loader {
    position: absolute;
    top: 12px;
    right: 24px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3498db;
    border-left: 3px solid #3498db;
    border-radius: 50%;
    width: 15px;
    height: 15px;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
