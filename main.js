const festivos=[
new Date("01/01/2023 00:00:00").getTime(),
new Date("01/09/2023 00:00:00").getTime(),
new Date("03/20/2023 00:00:00").getTime(),
new Date("04/06/2023 00:00:00").getTime(),
new Date("04/07/2023 00:00:00").getTime(),
new Date("05/01/2023 00:00:00").getTime(),
new Date("05/22/2023 00:00:00").getTime(),
new Date("06/12/2023 00:00:00").getTime(),
new Date("06/19/2023 00:00:00").getTime(),
new Date("07/03/2023 00:00:00").getTime(),
new Date("07/20/2023 00:00:00").getTime(),
new Date("08/07/2023 00:00:00").getTime(),
new Date("08/21/2023 00:00:00").getTime(),
new Date("10/16/2023 00:00:00").getTime(),
new Date("11/06/2023 00:00:00").getTime(),
new Date("11/13/2023 00:00:00").getTime(),
new Date("12/08/2023 00:00:00").getTime(),
new Date("12/25/2023 00:00:00").getTime()
  ]
const calendario=()=>{
  const date1=document.getElementById("date1").value
  const date2= document.getElementById("date2").value
  const fecha1 = new Date(date1+" 00:00:00")
  const fecha2 = new Date(date2+" 00:00:00")
  const msDia=1000*60*60*24*1
  const dias= (fecha2.getTime()-fecha1.getTime())/1000/60/60/24+1;
  
  document.getElementById("dias").innerText="Dias a calcular "+dias
  let listaCalendario=[fecha1]
  
  for (var i = 0; i < dias-1; i++) {
    
    let fecha =listaCalendario[i].getTime()+msDia
    listaCalendario.push(new Date(fecha))
  }
  console.log(listaCalendario[0].getDay()==0);
  console.log(fecha1.getDay());
  console.log(festivos.includes(listaCalendario[0].getTime()));
  return listaCalendario
}
const calcular=()=>{
  
  const section=document.getElementById("calendario")
  
  const calendario1=calendario()
  
  calendario1.forEach(e=>{
  section.innerHTML+=
  `<div class="cuadro"><h1>${e.toDateString()}</h1><input type='number' id=${calendario1.indexOf(e)} onchange="update(${calendario1.indexOf(e)})">
      </div>`
  
  })
  
}
let valor=[]
const update=(i)=>{
    valor[i]=document.getElementById(i).value
    document.getElementById(i+1).focus()
  }

const calculate=()=>{
  const calendario2=calendario()
  const turnos= valor
  let reNocFes=0
  let reFes=0
  let dias2=0
  let reNoc=0
  let basico=3054000
  let hora=basico/30/8
  
  
  calendario2.forEach(e=>{
    let i=calendario2.indexOf(e)
    if (festivos.includes(e.getTime())||e.getDay()==0){
      if(i ==0){
        if(valor[i]==3){
         reNocFes+=2
         reNoc+=6
        }else if(valor[i]==2){
          reNocFes+=1
          reFes+=7
        }else{
          reFes+=8
        }
      }else if(valor[i]==3){
        if(valor[i-1]==3){
          reNocFes+=8
        }else {
          reNocFes+=2
          reNoc+=6
        }
      }else if(valor[i]==2){
          reFes+=7
          reNocFes+=1
        }else{
          reFes+=8
        }
      
    }else if(valor[i]==3){
         reNoc+=8
    }else if(valor[i]==2){
          reNoc+=1
    }
    console.log(Math.round( reFes*hora*1.75),Math.round( reNoc*hora*0.35),Math.round( reNocFes*hora*2.1),15*hora*8);
        console.log(Math.round( reFes*hora*1.75+ reNoc*hora*0.35+ reNocFes*hora*2.1+15*hora*8));

  })
  
}

