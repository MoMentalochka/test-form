<template>
  <div class="container">
    <div class="form_wrapper">
      <h1>Регистрация</h1>
      <a-form layout="horizontal" ref="formRef" :model="formState" >
        <a-form-item
            name="username"
            :rules="[{required: true, message: 'Поле обязательно для заполнения',  trigger: 'blur',},]"
        >
          <a-input
              name="username"
              placeholder="Имя"
              v-model:value="formState.username"
          />
        </a-form-item>
        <a-form-item
            name="email"
            :rules="[{required: true, message: 'Поле обязательно для заполнения',  trigger: 'blur',},]"
        >
          <a-input
              name="email"
              placeholder="Email"
              v-model:value="formState.email"
          />
        </a-form-item>
        <a-form-item
            name="address"
            :rules="[{required: true, message: 'Поле обязательно для заполнения',  trigger: 'blur',},]"
        >
          <a-auto-complete
              placeholder="Страна, Город"
              v-model:value="formState.address"
              :options="state.listOfAddresses"
              @change="search"
          />
        </a-form-item>
        <a-form-item
            name="password"
            :rules="[
                {required: true, message: 'Поле обязательно для заполнения',  trigger: 'blur',},
                { validator:  checkPass }
            ]"
        >
          <a-input-group>
            <a-input
                placeholder="Пароль"
                :type="state.isPasswordHide ? 'password' : 'text'"
                v-model:value="formState.password"
                style="width: calc(100% - 32px)"
            />
            <a-tooltip :title="state.isPasswordHide ? 'show' : 'hide' ">
              <a-button @click="state.isPasswordHide = !state.isPasswordHide">
                <template #icon>
                  <EyeOutlined v-if="state.isPasswordHide"/>
                  <EyeInvisibleOutlined v-else/>
                </template>
              </a-button>
            </a-tooltip>
          </a-input-group>

        </a-form-item>
        <a-button type="primary" @click="submit" class="btn">Зарегистрироваться</a-button>
      </a-form>
    </div>
  </div>
  <a-modal
      v-model:visible="state.isResultModalOpen"
      :title="'Данные регистрации'"
      okText="Ok"
      cancelText="Close"
      centered
      @ok="state.isResultModalOpen = false"
      >
      <div v-for="i in Object.keys(formState)">
        {{i + ' - ' + formState[i as keyof TRegistrationForm]}}
      </div>
  </a-modal>
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";
import {EyeOutlined, EyeInvisibleOutlined} from '@ant-design/icons-vue';
import {checkPassword} from "../../utils/validate.ts";
import {useRegistrationStore} from "../../stores/registrationStore.ts";
import { debounce } from "lodash-es";
import {TRegistrationForm} from "./types.ts";


const state = useRegistrationStore()

const formRef = ref()
const formState: TRegistrationForm = reactive({
  username: '',
  email: '',
  address: '',
  password: '',
})

const checkPass = async () => {
  const res = checkPassword(formState.password)
  if (formState.password) {
    if(!res) {
      return Promise.reject('Пароль должен содержать - не менее одной цифры, буквы нижнего регистра, буквы верхнего регистра и специального символа')
    }
  }
  return Promise.resolve()
}

//Отложенный поиск для автокомплита
const search = debounce(() => formState.address ? state.search(formState.address) : state.listOfAddresses = [], 500);

const submit = async () => {
  try {
    await formRef.value?.validateFields();
    state.openModal()
  } catch (errorInfo) {
    console.log('Failed:', errorInfo);
  }
}
</script>

<style scoped>
.form_wrapper {
  display: flex;
  width: 100%;
  max-width: 480px;
  flex-direction: column;
  margin: auto;
}

.container {
  height: 100%;
  display: flex;
  align-items: center;
}

.btn {
  width: 100%;
}
</style>
