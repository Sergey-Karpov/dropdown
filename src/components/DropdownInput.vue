<template>
  <label class="input-block">
    <input
      autocomplete="off"
      readonly
      class="input-block__field"
      placeholder="выберете сущность"
      @click="toggleDropdown"
      v-model="selectedEntity"
    >
    <div class="input-block__dropdown dropdown" v-show="isDropdownVisible" @click="toggleDropdown" @blur="closeDropdown">
      <ul class="dropdown__list">
        <li
          class="dropdown__item"
          v-for="(item, index) in entityOptions"
          :key="index"
          @click="selectEntity(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </label>
</template>

<script>
export default {
  data() {
    return {
      selectedEntity: 'Не выбрано',
      isButtonActive: false,
      results: [],
      entityOptions: ['Сделка', 'Контакт', 'Компания'],
      isDropdownVisible: false
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
    },
    closeDropdown() {
      this.isDropdownVisible = false;
    },
    selectEntity(entity) {
      this.selectedEntity = entity;
      this.isButtonActive = true;
      this.isDropdownVisible = false;
    },
    async handleCreateEntity(selectedEntity) {
      try {
        const response = await this.createEntity(selectedEntity);
        this.results.push({ entity: selectedEntity, id: response.data.id });
      } catch (error) {
        console.error('Ошибка создания сущности:', error);
      }
    }
  }
};
</script>

<style scoped>
.input-block {
  position: relative;
  gap: 4px;
}
.input-block__field {
  padding: 10px 12px;
  font-size: 18px;
  line-height: 22px;
  color: black;
  border-radius: 4px;
  border: 2px solid lightblue;
  background-color: #f3f3f3;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.input-block__field::placeholder {
  font-size: 18px;
  line-height: 22px;
  color: black;
}
.input-block__dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  max-height: 108px;
  z-index: 1;
}
.dropdown {
  padding: 10px 0;
  width: 100%;
  background-color: #f3f3f3;
  border-radius: 8px;
  border: 2px solid lightblue;
  box-shadow: 0px 4px 12px 0px rgba(101, 104, 108, 0.08);
  transition: all 0.3s ease-in-out;
}
.dropdown__list {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  max-height: 92px;
  overflow-y: auto;
  list-style: none;
  overflow-x: hidden;
}
.dropdown__list::-webkit-scrollbar {
  width: 2px;
  background-color: #f3f3f3;
}
.dropdown__list::-webkit-scrollbar-track {
  border-radius: 4px;
  background: transparent;
  box-shadow: none;
}
.dropdown__list::-webkit-scrollbar-thumb {
  border-radius: 4px;
  border: 0px none #fff;
  background-color: gray;
  -webkit-transition: all 280ms ease-in-out;
  transition: all 280ms ease-in-out;
}
.dropdown__item {
  padding: 2px 12px;
  width: 98%;
  font-size: 18px;
  line-height: 22px;
  color: black;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  text-align: left;
  transition: all 280ms ease-in-out;
}
.dropdown__item:hover {
  color: rgb(13, 124, 161);
  background-color: rgb(214, 209, 209);
}
</style>
