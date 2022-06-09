<template lang="pug">
.px-4(class='sm:px-6 lg:px-8')
  div(class='sm:flex sm:items-center')
    div(class='sm:flex-auto')
      h1.text-xl.font-semibold.text-gray-900 Empresas
      p.mt-2.text-sm.text-gray-700 Lista de empresas cadastradas no sistema.
  .mt-8.flex.flex-col
    .-my-2.-mx-4.overflow-x-auto(class='sm:-mx-6 lg:-mx-8')
      .inline-block.min-w-full.py-2.align-middle(class='md:px-6 lg:px-8')
        .overflow-hidden.shadow.ring-1.ring-black.ring-opacity-5(class='md:rounded-lg')
          table.min-w-full.divide-y.divide-gray-300
            thead.bg-gray-50
              tr
                th.pl-4.pr-3.text-left.text-sm.font-semibold.text-gray-900(scope='col' class='py-3.5 sm:pl-6') Nome
                th.px-3.text-left.text-sm.font-semibold.text-gray-900(scope='col' class='py-3.5') Nº de funcionários
                th.px-3.text-left.text-sm.font-semibold.text-gray-900(scope='col' class='py-3.5') País
                th.px-3.text-left.text-sm.font-semibold.text-gray-900(scope='col' class='py-3.5') Categoria
            tbody.divide-y.divide-gray-200.bg-white
              tr(v-for='company in companys' :key='company.name')
                td.whitespace-nowrap.py-4.pl-4.pr-3.text-sm.font-medium.text-gray-900(class='sm:pl-6') {{ company.name }}
                td.whitespace-nowrap.px-3.py-4.text-sm.text-gray-500 {{ company.numbeEmployees }}
                td.whitespace-nowrap.px-3.py-4.text-sm.text-gray-500 {{ company.country }}
                td.whitespace-nowrap.px-3.py-4.text-sm.text-gray-500 {{ company.category }}
</template>

<script>

export default {
  name: 'UsersApp',
  data() {

    return {
      companys : null
    }
  },
  methods: {
    
    async getCompanys() {
      const req = await fetch('http://localhost:3000/companys')

      const data = await req.json()

      this.companys = data
    }
  },
  mounted () {
    this.getCompanys()
  }
}

</script>

<style>
</style>