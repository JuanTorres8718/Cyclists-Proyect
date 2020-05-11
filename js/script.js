import ciclista from './clase/ciclista.js';



const formatterPeso = new Intl.NumberFormat('es-CO',{
    style : 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
});




let convertArrayCyclists = (arreglo) => {
    let arrayCy = arreglo.map((elemento) => {
       let cyclists = new ciclista();
       cyclists.num = elemento.num;
       cyclists.name = elemento.name;
       cyclists.race_1 = elemento.race_1;
       cyclists.race_2 = elemento.race_2;
       cyclists.race_3 = elemento.race_3;
       cyclists.race_4 = elemento.race_4;
       cyclists.race_5 = elemento.race_5;
       return cyclists;
    });
    return arrayCy;
}

let convertArrayMean = (arreglo) =>{
    let arrayMe = arreglo.map((elemento) =>{
        let meanCy  = elemento;
        return meanCy;
    });
    return arrayMe;
}


const arrayCyclists= (localStorage.getItem('ciclista') == null)?([]):(convertArrayCyclists(JSON.parse(localStorage.getItem('ciclista'))));
const meanCyclists = (localStorage.getItem('promedio') == null)?([]):(convertArrayMean(JSON.parse(localStorage.getItem('promedio'))));
const goldCyclists = [];
const silverCyclists = [];
const bronceCyclists = [];
let nIndex = 1;




//Funcion para realizar el promedio de cada ciclista
let arrayMean = (array) =>{
        array.forEach(element => {

            let p = (parseInt(element.race_1)+ parseInt(element.race_2)
            + parseInt(element.race_3) + parseInt(element.race_4)
            + parseInt(element.race_5))/5;
            meanCyclists.push(p);

            localStorage.setItem('promedio', JSON.stringify(meanCyclists));
        });

        tableMean(arrayCyclists,meanCyclists);

        selectCyclist(arrayCyclists,meanCyclists);

}


document.getElementById("btn-agregar-reg-tiempo").addEventListener("click", (e) => {
	document.getElementById("frm_nueva_registro_tiempo").reset();
    $("#modalRegistroTiempo").modal("toggle");
});


//Funcion para guardar el formulario
document.querySelector('#btn_guardar_nueva_reg_tiempo').addEventListener('click', (e)=>{
    if(document.getElementById("frm_nueva_registro_tiempo").reportValidity()){

        let c = new ciclista();
        c.num = nIndex;
        c.name = document.querySelector('#nombre_corredor').value;
        c.race_1 = document.querySelector('#carrera_1').value;
        c.race_2 = document.querySelector('#carrera_2').value;
        c.race_3 = document.querySelector('#carrera_3').value;
        c.race_4 = document.querySelector('#carrera_4').value;
        c.race_5 = document.querySelector('#carrera_5').value;



        if(arrayCyclists.length <5){
            arrayCyclists.push(c);
            nIndex++;
            if(arrayCyclists.length === 5){
                nIndex = 1;
                $(arrayMean(arrayCyclists));
            }

            localStorage.setItem('ciclista', JSON.stringify(arrayCyclists));
            tableCyclists(arrayCyclists);
            $("#modalRegistroTiempo").modal("toggle");
            alert("Los datos fueron almacenados");
        }else{
            $("#modalRegistroTiempo").modal("toggle");
            alert("El maximo de registro son 5 personas");
        }

        
    }
});


//Funcion para sacar los 3 mejores tiempos
document.querySelector('#mejores-tiempos-tab').addEventListener('click', (e) =>{
    
    if(goldCyclists.length !== 0){
        let number1 = goldCyclists[0].replace(/ /g, "");
        let number2 = silverCyclists[0].replace(/ /g,"");
        let number3 = bronceCyclists[0].replace(/ /g,"");
        if(number1.length<15){
            goldCyclists.push(25000000);
        }else if(number1.length>=15 && number1.length<30){
            goldCyclists.push(27500000);
        }else {
            goldCyclists.push(30000000);
        }

        if(number2.length<10){
            silverCyclists.push(15000000);
        }else if(number2.length>=10 && number2.length<25){
            silverCyclists.push(17500000);
        }else {
            silverCyclists.push(20000000);
        }

        if(number3.length<13){
            bronceCyclists.push(7500000);
        }else if(number3.length>=13 && number3.length<20){
            bronceCyclists.push(10000000);
        }else{
            bronceCyclists.push(12500000);
        }


        if(goldCyclists[0] === "PERIQUITO PEREZ"){
            goldCyclists[2] += 2000000;
        }else if(silverCyclists[0] === "PERIQUITO PEREZ"){
            silverCyclists[2] += 2000000;
        }else if(bronceCyclists[0] === "PERIQUITO PEREZ"){
            bronceCyclists[2] += 2000000;
        }

        let HTMLPODIUM= `<div class="card w-75 d-flex justify-content-center ">
                            <h5 class="card-header text-left">Oro</h5>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col d-flex justify-content-center flex-column align-items-start">
                                        <h5 class="card-title">Corredor: ${goldCyclists[0].toUpperCase()}</h5>
                                        <h6 class="card-text">Tiempo: ${goldCyclists[1]}</h6>
                                    </div>
                                        <div class="col d-flex justify-content-center align-items-center">
                                        <h5 class="card-title text-secondary">${formatterPeso.format(goldCyclists[2])}</h5>
                                    </div>
                                    <div class="col">
                                        <img class="img-fluid" src="imagenes/gold.png">
                                    </div>
                                 </div> 
                            </div>
                        </div>
                        <div class="card w-75 d-flex justify-content-center">
                            <h5 class="card-header text-left">Plata</h5>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col d-flex justify-content-center flex-column align-items-start">
                                        <h5 class="card-title">Corredor: ${silverCyclists[0].toLowerCase()}</h5>
                                        <h6 class="card-text">Tiempo: ${silverCyclists[1]}</h6>
                                    </div>
                                        <div class="col d-flex justify-content-center align-items-center">
                                        <h5 class="card-title text-secondary">${formatterPeso.format(silverCyclists[2])}</h5>
                                    </div>
                                    <div class="col">
                                    <img class="img-fluid" src="imagenes/silver.png">
                                    </div>
                                 </div> 
                            </div>
                        </div>
                        <div class="card  w-75 d-flex justify-content-center">
                            <h5 class="card-header text-left">Bronce</h5>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col d-flex flex-column justify-content-center align-items-start">
                                        <h5 class="card-title">Corredor: ${bronceCyclists[0].charAt(0).toUpperCase() +bronceCyclists[0].slice(1)}</h5>
                                        <h6 class="card-text">Tiempo: ${bronceCyclists[1]}</h6>
                                    </div>
                                        <div class="col d-flex justify-content-center align-items-center">
                                        <h5 class="card-title text-secondary">${formatterPeso.format(bronceCyclists[2])}</h5>
                                    </div>
                                    <div class="col">
                                    <img class="img-fluid" src="imagenes/bronce.png">
                                    </div>
                                 </div> 
                            </div>
                        </div>`;


        document.querySelector('#mejores-tiempos').innerHTML = HTMLPODIUM;
    }else{
    console.log("saludos :D")
    }
})



//Funcion para llenar la tabla de los ciclistas
let tableCyclists = (array) => {
    let HTML = '';
    array.forEach((item, indice) => {
        HTML +=  `<tr>
                  <td>${item.num}</td>
                  <td>${item.name}</td>
                  <td>${item.race_1} min</td>
                  <td>${item.race_2} min</td>
                  <td>${item.race_3} min</td>
                  <td>${item.race_4} min</td>
                  <td>${item.race_5} min</td>
                  <td>
                    <a href="#" indice="${indice}" class = "btn btn-link">Ver</a>
                  </td>
                 </tr>`;
    });
    document.querySelector("#tbl-registro-tiempos tbody").innerHTML = HTML;
    
}

$(tableCyclists(arrayCyclists))


//Funcion para mostrar la tabla de los promedios
let tableMean = (arrayC, arrayM) => {
    let HTML = '';
    for (let i = 0; i < arrayC.length; i++) {
        HTML +=  `<tr>
                  <td>${arrayC[i].num}</td>
                  <td>${arrayC[i].name}</td>
                  <td>${arrayM[i]} min</td>
                 </tr>`;

    }
        
    document.querySelector("#tbl-promedio-tiempos tbody").innerHTML = HTML;
    
}
 
$(tableMean(arrayCyclists,meanCyclists))


let selectCyclist = (arrayC, arrayM)=>{
    let gold=0, silver=0, bronce=0;
        arrayM.forEach(element => {
            if(element>gold){
                bronce = silver;
                silver = gold;
                gold = element;
            }else if(element>silver){
                bronce = silver;
                silver = element;
            }else if(element>bronce){
                bronce = element;
            }
        });


        for (let i = 0; i < arrayM.length; i++) {
            if(gold === arrayM[i] && goldCyclists.length<2){
                goldCyclists.push(gold)
                goldCyclists.unshift(arrayC[i].name);
            }else if(silver === arrayM[i] && silverCyclists.length<2){
                silverCyclists.push(silver)
                silverCyclists.unshift(arrayC[i].name);
            }else if(bronce === arrayM[i] && bronceCyclists.length<2){
                bronceCyclists.push(bronce)
                bronceCyclists.unshift(arrayC[i].name);
            }
            
        }
        

       
}

$(selectCyclist(arrayCyclists,meanCyclists))