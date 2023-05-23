function login(){
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    fetch(`https://testelegak-juanarmazenamento79.b4a.run/users`,{
        method : 'GET'

    }).then(
        response => response.json()

    ).then(data => {
        const person = data.find(pessoa => pessoa.email == email && pessoa.senha == senha)
        console.log(person);

        if(person){
            location.href = "control.html";
        }else{
            console.log('deu tudo errado!');
            alert("Senha ou email incorretos");
        }
    });



}

function preencherInputs(empresa){
    document.getElementById('nomEmpresa').value = empresa.nome;
    document.getElementById('representante').value = empresa.representante;
    document.getElementById('email').value = empresa.email;
    document.getElementById('telefone').value = empresa.telefone;
    document.getElementById('cep').value = empresa.cep;
    document.getElementById('n').value = empresa.numero;
    if(empresa.produtos.includes(document.getElementById('abs').value)){
        document.getElementById('abs').checked = true;
    }else{
        document.getElementById('abs').checked = false;
    }
    if(empresa.produtos.includes(document.getElementById('nylon').value)){
        document.getElementById('nylon').checked = true;
    }else{
        document.getElementById('nylon').checked = false;
    }
    if(empresa.produtos.includes(document.getElementById('pp').value)){
        document.getElementById('pp').checked = true;
    }else{
        document.getElementById('pp').checked = false;
    }
    if(empresa.produtos.includes(document.getElementById('pvc').value)){
        document.getElementById('pvc').checked = true;
    }else{
        document.getElementById('pvc').checked = false;
    }

    document.getElementById('pm').value = empresa.producaoMensal

    let select = document.getElementById('formaPagamento');

    for(let i =0; i < select.length;i++){
        if(select.options[i].value == empresa.formaDePagamento){
            select.selectedIndex = i;
        }
    }


}

const getById = async() =>{
    let id = document.getElementById('id').value;

    fetch(`https://testelegak-juanarmazenamento79.b4a.run/empresas/${id}`).then(response => response.json()).then( data =>{
        preencherInputs(data)
        console.log(data);
    })

}

function puxarEmpresa(){
    getById();
}

const update = async(id)=> {
    empresa = getInfoFromInputs();

    const init = {
        method: 'UPDATE',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(empresa)
    }


    fetch(`https://testelegak-juanarmazenamento79.b4a.run/empresas/${id}`, init)

}

function atualizarCadastro(){
    update(document.getElementById('id').value);
}

function getInfoFromInputs(){
    let nome = document.getElementById("nomEmpresa").value
    let representante = document.getElementById("representante").value
    let email = document.getElementById("email").value
    let telefone = document.getElementById("telefone").value
    let cep = document.getElementById("cep").value
    let numero = document.getElementById("n").value
    let produtos = [];

    if(getValueCheckBox('abs') != false){
        produtos.push(getValueCheckBox('abs'));
    }
    if(getValueCheckBox('nylon') != false){
        produtos.push(getValueCheckBox('nylon'));
    }
    if(getValueCheckBox('pp') != false){
        produtos.push(getValueCheckBox('pp'));
    }
    if(getValueCheckBox('pvc') != false){
        produtos.push(getValueCheckBox('pvc'));
    }

    let producaoMensal = document.getElementById("pm").value

    let select = document.getElementById('formaPagamento');
    console.log(select.options[select.selectedIndex]);
    let formaDePagamento = select.options[select.selectedIndex].value;

    return {
        nome : nome,
        representante : representante,
        email : email,
        telefone : telefone,
        cep : cep,
        numero : numero,
        produtos : produtos,
        producaoMensal : producaoMensal,
        formaDePagamento : formaDePagamento

    }

    
}

function getValueCheckBox(id){
    let elem = document.getElementById(id);
    if(elem.checked){
        return elem.value;
    }

    return false;
}

const deleteE = async(id) =>{

    const init = {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        }
        
    }


    fetch(`https://testelegak-juanarmazenamento79.b4a.run/empresas/${id}`, init)

}

function deleteCadastro(){
    deleteE(document.getElementById('id').value)
}

const post = async() =>{

    empresa = getInfoFromInputs();

    const init = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(empresa)
    }


    fetch("https://testelegak-juanarmazenamento79.b4a.run/empresas", init)



}


function cadastro(){
    post();
}