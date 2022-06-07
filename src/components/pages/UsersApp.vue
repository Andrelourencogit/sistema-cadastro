<template>
    <FormRegistration :isInfoLocal="true" :visibleForm="visibleForm" @event-close="closeForm" @event-click="setUser"/>

  <div class="px-4 sm:px-6 lg:px-8">
    <div></div>
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Usuários</h1>
        <p class="mt-2 text-sm text-gray-700">Lista de usuários cadastros no sistema.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button @click="setUser" type="button" class="inline-flex items-center justify-center rounded-md border border-transparent 
        bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 
        focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto">
          Novo usuário
        </button>
      </div>
    </div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Nome</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Empresa</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">E-mail</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Data de cadastro</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="person in users" :key="person.email">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ person.name }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.company }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.email }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ person.data }}</td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <a  class="text-indigo-600 hover:text-indigo-900"
                      >Editar<span class="sr-only">, {{ person.name }}</span></a
                    >
                  </td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <button type='button' @click="deleteUser(person.id)" class="btn-delete-user text-indigo-600 hover:text-indigo-900"
                      >Excluir<span class="sr-only">, {{ person.name }}</span></button
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
import FormRegistration from "@/components/FormRegistration.vue";

export default {
  name: 'UsersApp',
  data() {

    return {
      visibleForm: false,
      visibleFeedback: false,
      users : null
    }
  },
  components: {
    FormRegistration
  },
  methods: {
    closeForm() {
      this.visibleForm = false
    },
    setUser() {
      this.visibleForm = !this.visibleForm
    },
    async getUsers() {
      const req = await fetch('http://localhost:3000/users')

      const data = await req.json()

      this.users = data
    },
    async deleteUser(id) {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE"
      });

      this.getUsers()
    }
  },
  mounted () {
    this.getUsers()
  }
}

</script>

<style>

.btn-delete-user {
  border: 2px solid;
  color: red;
  padding: 5px;
  border-radius: 10px;
  font-weight: bold;
}

.btn-delete-user:hover {
  color: #fff;
  background-color: #c82333;
  border-color: #bd2130;
}
</style>