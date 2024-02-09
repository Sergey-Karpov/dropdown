<template>
  <form class="form">
    <DropdownInput/>
    <ButtonSubmit :buttonText="'Создать'" :isButtonActive="true" :isLoading="false"/>

  </form>
</template>

<script>
import axios from 'axios';
import DropdownInput from '@/components/DropdownInput.vue';
import ButtonSubmit from '@/components/ButtonSubmit.vue';

export default {
  components: {
    DropdownInput,
    ButtonSubmit
  },
  data() {
    return {
      entityOptions: ['Сделка', 'Контакт', 'Компания'],
      results: [],
      accessToken: null // Хранение токена доступа
    };
  },
  methods: {
    async handleCreateEntity(selectedEntity) {
      try {
        if (!this.accessToken) {
          // Получение токена доступа, если он еще не получен
          this.accessToken = await this.getAccessToken();
        }
        const entityId = await this.createEntity(selectedEntity, this.accessToken);
        this.results.push({ entity: selectedEntity, id: entityId });
      } catch (error) {
        console.error('Ошибка создания сущности:', error);
        // Обработка ошибки
      }
    },
    async getAccessToken() {
      const clientId = '31550986'; // Значение X-Client-Id
      const response = await axios.get('https://test.gnzs.ru/oauth/get-token.php', {
        headers: {
          'X-Client-Id': clientId
        }
      });
      return response.data.access_token;
    },
    async createEntity(entity, accessToken) {
      // Замените URL на соответствующий эндпоинт API amoCRM
      const endpoint = `https://your.amocrm.api.endpoint/${entity}`;
      const response = await axios.post(endpoint, {
        access_token: accessToken
        // Дополнительные данные для создания сущности, если необходимо
      });
      return response.data.id; // Предположим, что API возвращает ID созданной сущности
    }
  }
};
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.form {
  display: flex;
  align-items: center;
  gap: 24px;
}
</style>
