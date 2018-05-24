let coordinatore = {
  score:0,
  true:0,
  in_game:false
}

let question = []
for(i = 0; i < localStorage.getItem("numberQNotM"); ++i){
    question.push(false)
}
let index = 0;

$(document).ready(function (e) {
    let timer_div = $("#timer_text");
    let time = localStorage.getItem("time")
    let minuti = parseInt(time.split(":")[0])
    let secondi = parseInt(time.split(":")[1])+1

    function countdown_timer(){

       if(secondi == 0){
           if(minuti == 0){
               if(coordinatore.in_game){
                    localStorage.setItem("length", index)
                    localStorage.setItem("question",question);
                    localStorage.setItem("score", coordinatore.score);
                   coordinatore.in_game = false;
                    window.location.href = "final.html";
               }
           }else{
                coordinatore.in_game = true 
               --minuti;
               secondi = 59;
           }
       }else{
           --secondi;
       }

     timer_div.text(minuti+":"+((secondi<10)?"0"+secondi:secondi));

     setTimeout(countdown_timer, 1000);
    }

    setTimeout(countdown_timer, 1000);
    try{
        changeQuestion();
    }catch(err){
    }
});

function changeQuestion(){
    let t_f = 0
    let position = 0
    let position_q = 0
    let position_a = 0
    let number_questions = localStorage.getItem("numberQ");

    console.log("DOMANDE: " + localStorage.getItem("numberQ"))
    localStorage.setItem("numberQ", number_questions - 1);
    if (number_questions > 0){ 
        coordinatore.in_game = true       
        t_f = Math.random();
        console.log(t_f)
        if (t_f > 0.60){
            // vero
            let position = parseInt(Math.random() * 48)
            coordinatore.true = true;
            $("#domanda_text").text(questions[position][0]+":"+questions[position][1]);

        }else{
            //false
            position_q = parseInt(Math.random() * 48)
            position_a = parseInt(Math.random() * 48)

            while(position_a == position_q){
                position_a = parseInt(Math.random() * 48)
            }
            coordinatore.true = false;
            $("#domanda_text").text(questions[position_q][0]+":"+questions[position_a][1])
        }
    }else{
        if(coordinatore.in_game){
            localStorage.setItem("length", index)
            localStorage.setItem("question",question);
            localStorage.setItem("score", coordinatore.score);
            coordinatore.in_game = false;
            window.location.href = "final.html";
        }
    }

}

function is_selected(true_button, false_button){
    return(true_button.checked === false && false_button.checked === false) ? false : true;
}

function check_answer(){
    let true_button = document.getElementById("true_button");
    let false_button = document.getElementById("false_button");

    if(is_selected(true_button, false_button)){
        if(true_button.checked === true && coordinatore.true){
            question[index] = true;
            coordinatore.score += 10;
        }
        else if(false_button.checked === true && !coordinatore.true){
            question[index] = true;
            coordinatore.score += 10;
        }else{
            coordinatore.score -= 5;
        }
        index++;
        changeQuestion();
    }

    $("#point_text").text(coordinatore.score);
    
}
