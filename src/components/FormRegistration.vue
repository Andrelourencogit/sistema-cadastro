
<template lang="pug">
.form-container(v-if="visibleForm")
  form#registration-form.bg-indigo-600
    template(v-if="isInfoLocal")
      p.feedbackUser(v-if="visibleFeedback") Cadastro realizado com sucesso!
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
      //- .input-container
      //-   label.text-white(for='telefone') Telefone:
      //-   input#telefone(type='text' name='telefone' v-model='telefone' placeholder='Ex: (xx) 9 xxxx-xxxx')
      .input-container
        input.submit-btn.text-white( @click="setUser" value='Cadastrar')
    template(v-else)
      p.feedbackUser(v-if="visibleFeedback") Atualização realizada com sucesso!
      .btn-container 
        button.btn.btn-dark.btn-close(type='button' @click.native="$emit('event-close')") X
      .input-container
        label.text-white(for='nome') Nome do cliente:
        input#nome(type='text' name='nome' v-model='nomeExternal'  placeholder='Digite o nome do cliente')
      .input-container
        label.text-white(for='empresa') Nome da empresa:
        input#empresa(type='text' name='empresa' v-model='empresaExternal' placeholder='Digite o nome da empresa')
      .input-container
        label.text-white(for='email') E-mail:
        input#email(type='text' name='email' v-model='emailExternal' placeholder='Digite o e-mail')
      //- .input-container
      //-   label.text-white(for='telefone') Telefone:
      //-   input#telefone(type='text' name='telefone' :value='telefone' placeholder='Ex: (xx) 9 xxxx-xxxx')
      .input-container
        input.submit-btn.text-white( @click="updateUser($event, dataExternal.id)" value='Atualizar dados')
</template>

<script>
export default {
  name: "FormRegistration",
  props: {
      visibleForm: Boolean,
      isInfoLocal: Boolean,
      dataExternal: Object
      // nomeExternal: String,
      // empresaExternal: String,
      // nomeExternal: String


    },
  data() {
    return {
      nome: '',
      empresa: '',
      email: '',
      data: '',
      visibleFeedback: false,
      nomeExternal:  '',
      empresaExternal:  '',
      emailExternal:  ''
    }
  },
  methods: {
    formatDate() {
      const timeElapsed = Date.now();
      const today = new Date(timeElapsed);
      let date = today.toISOString();
      return date.substr(0, 10);
    },
    async setUser() {
      const data = {
        name: this.nome,
        company: this.empresa,
        email: this.email,
        data: this.formatDate()
      }
      const dataJson = JSON.stringify(data)    
      await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type" : "application/json" },
        body: dataJson
      });

      this.visibleFeedback = true

      setTimeout(() => this.visibleFeedback = false, 2000)

      // limpar campos
      this.nome = ''
      this.empresa = ''
      this.email = ''
      this.data = ''

      setTimeout(() => document.location.reload(true), 3000)
      
    },
    async updateUser(event, id) {
      console.log('event', event)

      // console.log('event', event.path[2][1]._value)
      // console.log('event', event.path[2][2]._value)
      // console.log('event', event.path[2][3]._value)
      console.log('event id ', id)
      
      
      const dataJson = JSON.stringify({
        name: this.nomeExternal,
        company: this.empresaExternal,
        email: this.emailExternal,
        data: this.formatDate()
      });

      await fetch(`http://localhost:3000/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type" : "application/json" },
        body: dataJson
      });

      this.visibleFeedback = true

      setTimeout(() => this.visibleFeedback = false, 2000)

      // limpar campos
      this.nome = ''
      this.empresa = ''
      this.email = ''
      this.data = ''

      // setTimeout(() => document.location.reload(true), 3000)
      
    }
  },
  created() {
      console.log('vvvvv', this.$props.dataExternal)
    console.log('this.isInfoLocal', this.isInfoLocal)
    },
  mounted () {
    console.log('vvvvv', this.$props.dataExternal)
    console.log('this.isInfoLocal', this.isInfoLocal)
    if(this.isInfoLocal) {
      this.nomeExternal = this.dataExternal.name,
      this.empresaExternal = this.dataExternal.company,
      this.emailExternal = this.dataExternal.email
    }
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
  .feedbackUser {
    color: #155724;
    background-color: #d4edda;
    border-color: #c3e6cb;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    text-align: center;
    font-weight: bold;
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