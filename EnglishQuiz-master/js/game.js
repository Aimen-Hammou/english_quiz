$(document).ready(function (e) {
    let timer_div = $("#timer");
    let time = localStorage.getItem("time")
    let minuti = parseInt(time.split(":")[0])
    let secondi = parseInt(time.split(":")[1])

    function countdown_timer(){
       if(secondi == 0){
           if(minuti == 0){
                console.log("TEMPO FINITO")
           }else{
               --minuti;
               secondi = 59;
           }
       }else{
           --secondi;
       }  
    
     timer_div.text(minuti+":"+secondi);
     
     setTimeout(countdown_timer, 1000);
    }
 
    setTimeout(countdown_timer, 1000);
    changeQuestion();
});

function changeQuestion(){
    let t_f = 0
    let position = 0
    let position_q = 0
    let position_a = 0

    console.log("DOMANDE: " + localStorage.getItem("numberQ"))
    localStorage.setItem("numberQ", localStorage.getItem("numberQ") - 1);
    if (localStorage.getItem("numberQ") > 0){
        t_f = Math.random();
        console.log(t_f)
        if (t_f > 0.5){
            // vero
            let position = parseInt(Math.random() * 48)
            $("#domanda").text(questions[position][0]+":"+questions[position][1]);

        }else{
            //false
            position_q = parseInt(Math.random() * 48)
            position_a = parseInt(Math.random() * 48)
            while(position_a == position_q){
                position_a = parseInt(Math.random() * 48)
            }
            $("#domanda").text(questions[position_q][0]+":"+questions[position_a][1])
        }
    }else{
        console.log("FINE")
    }
}