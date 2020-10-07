function onOff() {
    document
        .querySelector("#modal")
        .classList
        .toggle("hide")

    document
        .querySelector("body")
        .classList
        .toggle("hideScroll");

    document
        .querySelector("#modal")
        .classList
        .toggle("addScroll");
}

//TENTATIVA DE DELETAR /////////////////////////////////////////////////////////
//function deletar(){
  //  document
   // .getElementById("#deletar")
   // .addEventListener('click', function(){
  //      document
  //      .getElementById(db.js)
  //      .innerHTML = '';
 //     });

//}

//function deletar() {
//    document
//        .querySelector("./db.js")
//        .classList.toggle(db.run())
//}
////////////////////////////////////////////////////////////////////////////////////

function checkFields(event) {

    const valuesToCheck = [
        "title",
        "image",
        "category",
        "description",
        "link,"
    ]

    const isEmpty = valuesToCheck.find(function (value) {

        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()

        if (checkIfIsString && checkIfIsEmpty) {
            return true
        }
    })

    if (isEmpty) {
        event.preventDefault()
        alert("Por favor ,preencha todos os campos!")
    }

    //for (let value of valuesToCheck) {
    //    event.target[value].value
    //}
}

//document.querySelector("button.b2").addEventListener("click", function () {
 //   document.querySelector("#footer").classList.toggle("hide")
//})   faz sumir o item
