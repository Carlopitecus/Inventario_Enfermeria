// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBZzyezldPHnoOc1c2R8_1ThaahGa5kWOg",
    authDomain: "crud1-ba366.firebaseapp.com",
    projectId: "crud1-ba366",
    storageBucket: "crud1-ba366.appspot.com",
    messagingSenderId: "85031699056",
    appId: "1:85031699056:web:cf0f41e2fbd7f17866eab5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const elementRef = firebase.database().ref('elementos')
const elementosTabla = document.getElementById('elementos-tabla')
const registerForm = document.getElementById("Register_Form")

// js del modal sacado de Bootstrap
let uid = ""
const myModal = document.getElementById('modalRegistro')
const myInput = document.getElementById('modalRegistro')
myModal.addEventListener('shown.bs.modal', function () {
    myInput.focus()
})

const myModal2 = document.getElementById('modalEdicion')
const myInput2 = document.getElementById('modalEdicion')
myModal2.addEventListener('shown.bs.modal', function () {
    myInput2.focus()
})

// Despliegue de los datos que estan en firebase
window.addEventListener('DOMContentLoaded', async (e) => {
    await elementRef.on('value', (elementos) => {
        elementosTabla.innerHTML = ''
        elementos.forEach(elemento => {
            const elementoData = elemento.val()
            const stockReal = elementoData.Total - elementoData.Usados;
            console.log(stockReal)
            elementosTabla.innerHTML += `
        <tr>
        <td>${elementoData.Insumo}</td>
        <td>${elementoData.Total}</td>
        <td>${elementoData.Usados}</td>
        <td>${stockReal}</td>
        <td>${elementoData.Vence}</td>
        <td>${elementoData.Lote}</td>
        <td>${elementoData.Descripcion}</td>
        <td>
          <button type="button" class="btn btn-warning" data-id="${elementoData.Uid}" data-bs-toggle="modal" data-bs-target="#modalEdicion" >Editar</button>
          <button type="button" class="btn btn-danger" data-id="${elementoData.Uid}" >Eliminar</button>
        </td>
      </tr>
      `

            // Edicion de los elementos
            const updateButtons = document.querySelectorAll('.btn-warning')
            updateButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    firebase.database().ref(`elementos/${e.target.dataset.id}`).once('value').then((elemento) => {
                        const data = elemento.val()


                        // muestra el formulario con los datos del elemento elegido
                        update_Form['updateInputInsumo'].value = data.Insumo
                        update_Form['updateInputTotal'].value = data.Total
                        update_Form['updateInputUsados'].value = data.Usados
                        // update_Form['updateInputStock'].value = stockReal
                        update_Form['updateInputVencimiento'].value = data.Vence
                        update_Form['updateInputLote'].value = data.Lote
                        update_Form['updateInputDescripcion'].value = data.Descripcion
                    })
                    uid = e.target.dataset.id
                })
                update_Form.addEventListener('submit', (e) => {
                    e.preventDefault()

                    // Se captura el contenido de los campos del modal
                    const insumo = update_Form['updateInputInsumo'].value
                    const total = update_Form['updateInputTotal'].value
                    const usados = update_Form['updateInputUsados'].value
                    // const stock = update_Form['updateInputStock'].value
                    const vence = update_Form['updateInputVencimiento'].value
                    const lote = update_Form['updateInputLote'].value
                    const descripcion = update_Form['updateInputDescripcion'].value
                    firebase.database().ref(`elementos/${uid}`).update({
                        Insumo: insumo,
                        Total: total,
                        Usados: usados,
                        // Stock: stock,
                        Vence: vence,
                        Lote: lote,
                        Descripcion: descripcion
                    })
                })
            })

            // Se identifica al boton con la clase danger
            const deleteButtons = document.querySelectorAll('.btn-danger')

            // por cada boton Danger, al hacer click, busca el id del elemento
            deleteButtons.forEach((button) => {
                button.addEventListener('click', (e) => {
                    deleteElemento(e.target.dataset.id)
                    console.log(e.target.dataset.id)
                })
            })
        });
    })
})


// Accion con el boton de registrar
Register_Form.addEventListener('submit', (e) => {
    e.preventDefault()

    // Se captura el contenido de los campos del modal
    const insumo = Register_Form['InputInsumo'].value
    const total = Register_Form['InputTotal'].value
    const usados = Register_Form['InputUsados'].value
    const stock = Register_Form['InputStock'].value
    const vence = Register_Form['InputVencimiento'].value
    const lote = Register_Form['InputLote'].value
    const descripcion = Register_Form['InputDescripcion'].value

    // Se guarda el contenido de los campos dento de Firebase
    const registerStudent = elementRef.push()
    registerStudent.set({
        Uid: registerStudent.path.pieces_[1],
        Insumo: insumo,
        Total: total,
        Usados: usados,
        Stock: stock,
        Vence: vence,
        Lote: lote,
        Descripcion: descripcion
    })

    // Borrado de los campos del Formulario del Modal
    document.getElementById('InputInsumo').value = ''
    document.getElementById('InputTotal').value = ''
    document.getElementById('InputUsados').value = ''
    document.getElementById('InputStock').value = ''
    document.getElementById('InputVencimiento').value = ''
    document.getElementById('InputLote').value = ''
    document.getElementById('InputDescripcion').value = ''

})