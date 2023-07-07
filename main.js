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
  return listaCalendario
}
const calcular=()=>{
  document.getElementById("calcular__boton").style.display="block"
  const section=document.getElementById("calendario")
  
  const calendario1=calendario()
  let output=''
  calendario1.forEach(e=>{
  output+=
  `<div class="cuadro"><h1>${e.toLocaleDateString('en-us', { day:"numeric", month:"short"})
}</h1><input type='number' id=${calendario1.indexOf(e)} onchange="update(${calendario1.indexOf(e)})">
      </div>`
  
  })
  section.innerHTML=output;
  
}
let valor=[]
const update=(i)=>{
    valor[i]=document.getElementById(i).value
    document.getElementById(i+1).focus()
  }

const calculate=()=>{
  const calendario2=calendario()
  const turnos= valor
  let days=15
  let reNocFes=0
  let reFes=0
  let dias2=0
  let reNoc=0
  let basico=document.getElementById("salario").value
  let hora=basico/30/8
  let cop =new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
});
  
  calendario2.forEach(e=>{
    let i=calendario2.indexOf(e)
    if (valor[i]==0){
    }else if(valor[i]==5){
      days+=-1
    }else if(e.getDay()==6&valor[i]==3){
      reNocFes+=6
      reNoc+=2
    }else if(i<calendario2.length-1){
    if(valor[i]==3&e.getDay()==0&festivos.includes(calendario2[i+1].getTime())){
      reNocFes+=8
    }else if(valor[i]==3&festivos.includes(calendario2[i+1].getTime())){
      reNocFes+=6
      reNoc+=2
    }else if (festivos.includes(e.getTime())||e.getDay()==0){
      
    if(valor[i]==3){
      reNocFes+=2
      reNoc+=6
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
    }}else{
      if(valor[i]==3&festivos.includes(e.getTime())){
        reNocFes+=2
        reNoc+=6
      }else if(valor[i]==3&e.getDay()==0){
        reNocFes+=2
        reNoc+=2
      }else if(valor[i]==2&e.getDay()==0){
        reNocFes+=1
      }else if(valor[i]==2&festivos.includes(e.getTime())){
        reNocFes+=1
      }
      
      else if(valor[i]==3){
        reNoc+=6
      }else if(valor[i]==2){
        reNoc+=1
      }
    }
    
  })
  const respuesta=document.getElementById("calculo");
  respuesta.innerHTML=`
  <table class="tabla">
  <tr>
  <th>Basico</th>
  <td>${days}</td>
  <td>${cop.format(Math.round(days*hora*8))}</td>
  </tr>
  <tr>
  <th>Festivos</th>
  <td>${reFes}</td>
  <td> ${cop.format(Math.round(reFes*hora*1.75))}</td>
  </tr>
  <tr>
  <th>NocFestiva</th>
  <td>${reNocFes}</td>
  <td> ${cop.format(Math.round( reNocFes*hora*2.1))}</td>
  </tr>
  <tr>
  <th>Nocturnas</th>
  <td>${reNoc}</td>
  <td>${cop.format(Math.round( reNoc*hora*0.35))}</td>
  </tr>
 
  <tr>
    <th>Horas extra</th>
  <td>2</td>
    <td>${cop.format(Math.round(hora*1.25*2))}</td>
  </tr>
  <tr>
  <th>Salud Pension</th>
  <td>-${cop.format(Math.round( (reFes*hora*1.75+ reNoc*hora*0.35+ reNocFes*hora*2.1+days*hora*8)*0.04*2))}</td>
  </tr>
   <tr>
  <th>Total</th>
  <td> ${cop.format(Math.round(( reFes*hora*1.75+ reNoc*hora*0.35+ reNocFes*hora*2.1+days*hora*8)- (reFes*hora*1.75+ reNoc*hora*0.35+ reNocFes*hora*2.1+days*hora*8)*0.04*2))}</td>
  </tr>
  </table>
  `
  location.hash = "calculo"
}

