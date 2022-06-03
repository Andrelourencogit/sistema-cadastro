
<template lang="pug">
.form-container(v-if="visible")
  Feedbackmessage(:msg='msg' v-show='msg')
  form#registration-form.bg-indigo-600(method='POST' @submit='createBurger')
    .btn-container 
      button.btn.btn-dark.btn-close(type='button' @click.native="$emit('event-close')") X
    .input-container
      label.text-white(for='nome') Nome do cliente:
      input#nome(type='text' name='nome' v-model='nome' placeholder='Digite o nome do cliente')
    .input-container
      label.text-white(for='empresa') Nome da empresa:
      input#empresa(type='text' name='empresa' v-model='empresa' placeholder='Digite o nome da empresa')
    .input-container
      label.text-white(for='email') E-mail:
      input#email(type='text' name='email' v-model='email' placeholder='Digite o e-mail')
    .input-container
      label.text-white(for='telefone') Telefone:
      input#telefone(type='text' name='telefone' v-model='telefone' placeholder='Ex: (xx) 9 xxxx-xxxx')
    .input-container
      input.submit-btn.text-white( @click.native="$emit('event-click')" value='Cadastrar')
</template>

<script>
import FeedbackMessage from "@/components/FeedbackMessage.vue";
export default {
  name: "FormRegistration",
  props: {
      visible: Boolean
    },
  data() {
    return {
      carnes: null,
      opcionaisdata: null,
      nome: null,
      pao: null,
      carne: null,
      opcionais: [],
      status: "Solicitado",
      msg: null
    }
  },
  methods: {
    // addInfo() {
    //   this.visible = false
    // }
  //   async getIngredientes() {
  //     const req = await fetch('http://localhost:3000/ingredientes')
  //     const data = await req.json()
  //     this.paes = data.paes
  //     this.carnes = data.carnes
  //     this.opcionaisdata = data.opcionais
  //   },
  //   async createBurger(e) {
  //     e.preventDefault()
  //     const data = {
  //       nome: this.nome,
  //       carne: this.carne,
  //       pao: this.pao,
  //       opcionais: Array.from(this.opcionais),
  //       status: "Solicitado"
  //     }
  //     const dataJson = JSON.stringify(data)    
  //     const req = await fetch("http://localhost:3000/burgers", {
  //       method: "POST",
  //       headers: { "Content-Type" : "application/json" },
  //       body: dataJson
  //     });
  //     const res = await req.json()
  //     this.msg = `Pedido ${res.id} realizado com sucesso!`
  //     // clear message
  //     setTimeout(() => this.msg = "", 3000)
  //     // limpar campos
  //     this.nome = ""
  //     this.carne = ""
  //     this.pao = ""
  //     this.opcionais = []
      
  //   }
  // },
  // mounted () {
  //   this.getIngredientes()
  },
  components: {
    FeedbackMessage
  }
}
</script>

<style scoped>

  .form-container {
    position: fixed;
    z-index: 500;
    inset: 0px;
    overflow-y: auto;
    pointer-events: initial;
    background-color: rgba(9,30,66,0.54);
  }

  .btn-container {
    display: flex;
    justify-content: end;
  }
  .btn-close {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    padding: 5px;
    border: 2px solid #00ffff;
    color: #00ffff;
    font-weight: bold;
  }

  .btn-close:hover {
    color: #fff;;
    border: 2px solid #fff;
  }

  #registration-form {
    max-width: 400px;
    margin: 0 auto;
    margin-top: 10%;
    padding: 30px;
  }
  .input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  .input-container:last-child { 
    margin-bottom: 0;
  }

  label {
    font-weight: bold;
    margin-bottom: 15px;
    padding: 5px 10px;
    border-left: 4px solid #00ffff;
  }
  input, select {
    padding: 5px 10px;
    width: 100%;
  }
  #opcionais-container {
    flex-direction: row;
    flex-wrap: wrap;
  }
  #opcionais-title {
    width: 100%;
  }
  .checkbox-container {
    display: flex;
    align-items: flex-start;
    width: 50%;
    margin-bottom: 20px;
  }
  .checkbox-container span,
  .checkbox-container input {
    width: auto;
  }
  .checkbox-container span {
    margin-left: 6px;
    font-weight: bold;
  }
  .submit-btn {
    background-color: #00ffff;
    font-weight: bold;
    border: 2px solid #00ffff;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: .5s;
    text-align: center;
    outline: none;
  }
  .submit-btn:hover {
    background-color: transparent;
    color: #00ffff;
  }
</style>