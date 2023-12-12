/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/equipes';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.equipes.forEach(item => insertList(item.kks, item.unidade, item.usina, item.equipment))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputkks, inputunidade, inputusina, inputequipment) => {
  const formData = new FormData();
  formData.append('kks', inputkks);
  formData.append('unidade', inputunidade);
  formData.append('usina', inputusina);
  formData.append('equipment', inputequipment);

  let url = 'http://127.0.0.1:5000/equipe';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => {
      if(response.status===200){
        insertList(inputkks, inputunidade, inputusina, inputequipment)
        alert("Item adicionado!")
      }
      else 
      alert("Não foi possível adicionar Item")
    }
    )
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}


/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/equipe?kks=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com kks, e localizacao 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputKks = document.getElementById("newKKS").value;
  let inputUnidade = document.getElementById("newUnidade").value;
  let inputUsina = document.getElementById("newUsina").value;
  let inputEquipment = document.getElementById("newEquipment").value;

  if (inputKks === '') {
    alert("Escreva o um KKS!");
  } else if (inputUnidade===''|| inputUsina==='') {
    alert("Unidade e usina precisam ser definidos!");
  } else {
    postItem(inputKks, inputUnidade, inputUsina, inputEquipment)
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (kks, unidade, usina, equipment) => {
  var item = [kks, unidade, usina, equipment]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  document.getElementById("newKKS").value = "";
  document.getElementById("newUnidade").value = "";
  document.getElementById("newUsina").value = "";
  document.getElementById("newEquipment").value = "";

  removeElement()
}

