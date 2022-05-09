const quantMembros = document.querySelector('.quant_membros')
const plans = document.getElementById('plans')
let divMembros = document.querySelector('.membros')
const URL_API = 'http://localhost:8000'
const cadastroInfo = document.querySelector('.cadastroInfo')

class RegistroBeneficiario {
  associados = []
  constructor(codigoReg, associados) {
    this.codigoReg = codigoReg
    this.associados = associados
  }

  calcularPlano() {
    this.associados.forEach(item => {
      this.valorTotal += item.price
    })
  }
}

class Associado {
  constructor(nome, idade) {
    this.nome = nome
    this.idade = idade
  }
}

function addUsers() {
  for (i = 0; i < parseInt(quantMembros.value); i++) {
    divMembros.innerHTML += `
    <div id="as${i}" class=membro_grupo>
      <input name="nomes" class="name" placeholder="Nome" type="submmit" />
      <input name="idades" class="age" placeholder="Idade" type="submmit" />
    </div>`
  }
}

function criarGrupo() {
  const membroGrupo = document.querySelectorAll('.membro_grupo')
  const codigoReg = parseInt(document.querySelector('#plans').value)

  let associados = []
  let validate = false

  for (i = 0; i < membroGrupo.length; i++) {
    let associado = document.querySelectorAll(`#as${i} > input`)

    if (associado[0].value.length > 0 && associado[1].value.length > 0) {
      validate = true
    }
    if (validate) {
      associados.push(new Associado(associado[0].value, associado[1].value))
    }
  }

  if (validate) {
    let registroPlano = new RegistroBeneficiario(codigoReg, associados)

    cadastrarPlano(registroPlano)
    alert('Cadastro realizado.')

    associados.forEach(i => {

      cadastroInfo.innerHTML += `
        <div>
          <p>Associado(a) ${i.nome}, ${i.idade} anos.</p>
        </div>
      `
    })

  } else {
    alert('Preencha os campos corretamente.')
  }
}

function readBen() {
  const ben = fetch(URL_API + '/beneficiarios')
    .then(response => response.json()
  )
}

async function cadastrarPlano(newPlano) {
  let fetchData = {
    method: 'POST',
    body: JSON.stringify(newPlano),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  await fetch(URL_API + '/add_ben', fetchData)
    .then(response => response.text())
    .then(data => {
      console.log(data)
    })
}
