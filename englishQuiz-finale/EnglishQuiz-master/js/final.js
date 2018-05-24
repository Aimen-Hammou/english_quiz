$(document).ready(function (e) {
    let score = localStorage.getItem("score");

    $("#score").text("Your score is: " + score);


    let quiz = localStorage.getItem("question").split(",");
    let quiz_outcome = "Quiz Outcome: \n";
    
    document.getElementById("menu-background").style.height = (quiz.length * 50) + "px"    

    for(i = 0; i < quiz.length; ++i){
        quiz_outcome += ("\tQuestion n° " + (i+1) + ": you got it " + (quiz[i] == "false"?"wrong" : "right") + "\n");
    }
 
    $("#quiz_outcome").html(quiz_outcome)

    localStorage.clear();
});