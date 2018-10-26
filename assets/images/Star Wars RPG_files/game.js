

var fighters = new Array();
fighters[0] = new card ('Luke Skywalker', 'jedi',100,150,50);
fighters[1] = new card ('Obi-Wan Kenobi', 'jedi',100,120,50);
fighters[2] = new card ('Qui-Gon Jinn', 'jedi',100,120,50);
fighters[3] = new card ('Master Yoda', 'jedi',100,120,50);
fighters[4] = new card ('Darth Vader', 'sith',150,100,70);
fighters[5] = new card ('Darth Maul', 'sith',90,90,50);
fighters[6] = new card ('Darth Sidious', 'sith',90,90,50);
fighters[7] = new card ('Count Dooku', 'sith',90,90,50);






/*
** Constructors 
*/

function card(name, side, hp, ap, cap) {
    this.name = name;
    this.side = side;
    this.healthPoints = hp;
    this.attackPower = ap;
    this.counterAttackPower = cap;
    this.image = ()=> {
        let str = name.toLowerCase();
        let image = 'assets/images/' + str.replace(' ','-') + '.png'
        return image;
    } ;
    this.avatar = ()=> {
        let str = name.toLowerCase();
        let image = 'assets/images/' + str.replace(' ','-') + '-avatar.png'
        return image;
    }
}

/*
** Methods 
*/

var app = {
    deck: (side)=> {
        
        // (side==='jedi')? deck = $()
        let deck = $('.' + side + 'Deck');        
        // console.log(deck);
        // console.log(side)
        fighters.forEach((item, index) => {
        if (side === item.side) {
         console.log('jedi side')
         let card = $("<div>");
         card.addClass("character " + item.side)

         deck.append(card);
    
        //  let $name = $("<div>");
        //  $name.addClass('nameTag').text(item.name);
        //  card.append($name);
    
         let $avatar = $("<img>");
         $avatar.attr("src",item.avatar)
         card.append($avatar);
    
    /*
         // Health Point Progress Bar
         let $healthPoints = $("<div>");
         $healthPoints.addClass('healthPoints progress')
                      .html('<div class="label">HP:</div>');
         card.append($healthPoints);
    
         let $hpProgress = $("<div>");
         $hpProgress.addClass('progress-bar progress-bar-striped bg-danger')
                    .text(item.healthPoints.toString())
         .attr({
             "role":"progressbar",
             "style":"width:"+ item.healthPoints.toString(),
             "aria-valuenow": item.healthPoints.toString(),
             "aria-valuemin":"0",
             "aria-valuemax":"100",
         });
    
         $healthPoints.append($hpProgress);
         
         
          // Attack Point Progress Bar
          let $attackPoints = $("<div>");
          $attackPoints.addClass('AttackPower progress')
                        .html('<div class="label">AP:</div>');
          card.append($attackPoints);
     
          let $apProgress = $("<div>");
          $apProgress.addClass('progress-bar progress-bar-striped')
                     .text(item.attackPower.toString())
          .attr({
              "role":"progressbar",
              "style":"width:"+ item.attackPower.toString(),
              "aria-valuenow": item.attackPower.toString(),
              "aria-valuemin":"0",
              "aria-valuemax":"100",
          });
       
          $attackPoints.append($apProgress);    
    
           // Counter Attack Point Progress Bar
           let $counterAttackPower = $("<div>");
           $counterAttackPower.html('<div class="label">CA:</div>')
                              .addClass('CounterAttack progress')
           card.append($counterAttackPower);
      
           let $capProgress = $("<div>");
           $capProgress.addClass('progress-bar progress-bar-striped bg-info')
                       .text(item.counterAttackPower.toString())
           .attr({
               "role":"progressbar",
               "style":"width:"+ item.counterAttackPower.toString(),
               "aria-valuenow": item.counterAttackPower.toString(),
               "aria-valuemin":"0",
               "aria-valuemax":"100",
           });
       
           $counterAttackPower.append($capProgress); 

           */

        
        }
     });

    }
}


$(document).ready(function() {


var $jediSaber = $(".jediSaber");
var $sithSaber = $(".sithSaber");
var $jediDeck = $(".jediDeck");
var $sithDeck = $(".sithDeck");

/* 
** Handlers
*/
$jediSaber.on("click", ()=> {
    app.deck('jedi');
    app.deck('sith');
})
});

/* <div class="progress">
  <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
</div> */