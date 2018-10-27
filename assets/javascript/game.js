var fighters = new Array();
fighters[0] = new card('Luke Skywalker', 'jedi', 80, 150, 50);
fighters[1] = new card('Obi-Wan Kenobi', 'jedi', 67, 120, 45);
fighters[2] = new card('Qui-Gon Jinn', 'jedi', 120, 120, 50);
fighters[3] = new card('Master Yoda', 'jedi', 100, 120, 70);
fighters[4] = new card('Darth Vader', 'sith', 150, 140, 70);
fighters[5] = new card('Darth Maul', 'sith', 90, 50, 50);
fighters[6] = new card('Darth Sidious', 'sith', 90, 150, 50);
fighters[7] = new card('Count Dooku', 'sith', 90, 120, 50);


var avatar = false;



/*
 ** Constructors 
 */

function card(name, side, hp, ap, cap) {
    this.id = () => {
        let str = this.name.toLowerCase();
        let id = str.replace(' ', '-');
        return id
    };
    this.name = name;
    this.side = side;
    this.healthPoints = hp;
    this.attackPower = ap;
    this.counterAttackPower = cap;
    this.image = () => {
        let str = name.toLowerCase();
        let image = 'assets/images/' + str.replace(' ', '-') + '.png'
        return image;
    };
    this.avatar = () => {
        let str = name.toLowerCase();
        let image = 'assets/images/' + str.replace(' ', '-') + '-avatar.png'
        return image;
    }
}

/*
 ** Methods 
 */

var app = {
    deck: (side) => {

    }
}


$(document).ready(function () {


    // var $jediSaber = 
    // var $sithSaber = $(".sithSaber");
    // var $jediDeck = $(".jediDeck");
    // var $sithDeck = $(".sithDeck");
    // var $character = ;




    function selectCharacter() {
        let n = this.id;


        showCharacter(n)
    }

    function showCharacter(n) {

        
        let name = fighters[n].name;
        let image = fighters[n].image();
        let health = fighters[n].healthPoints;
        let attack = fighters[n].attackPower;
        let counter = fighters[n].counterAttackPower;
        let side = fighters[n].side;

        hideCharacter(side);

        if (side === 'jedi') {
            $('#jediAvatar').html("<img src='" + image + "'>");
            $('.jediArena > .nameTag').text(name);
            $('#jediHealth > div').attr({
                'aria-valuenow': health,
                'style': 'width:' + health
            }).text(health);

            $('#jediAttack > div').attr({
                'aria-valuenow': attack,
                'style': 'width:' + attack
            }).text(attack);
            $('#jediCounter > div').attr({
                'aria-valuenow': counter,
                'style': 'width:' + counter
            }).text(counter);

            $('.jediPoints, #jediAvatar').removeClass('hide');
            $('.instruction').text('')
        } else {
            $('#sithAvatar').html("<img src='" + image + "'>");
            $('.sithArena > .nameTag').text(name);
            $('#sithHealth > div').attr({
                'aria-valuenow': health,
                'style': 'width:' + health
            }).text(health);

            $('#sithAttack > div').attr({
                'aria-valuenow': attack,
                'style': 'width:' + attack
            }).text(attack);
            $('#sithCounter > div').attr({
                'aria-valuenow': counter,
                'style': 'width:' + counter
            }).text(counter);

            $('.sithPoints, #sithAvatar').removeClass('hide');
            $('.instruction').text('')
        }
    }


    function hideCharacter(side) {
        if (side === 'jedi') {
            $('.sithPoints, #sithAvatar').addClass('hide');
            $('.sithArena > .nameTag').text('Choose your side');
        } else {
            $('.jediPoints, #jediAvatar').addClass('hide');
            $('.jediArena > .nameTag').text('Choose your side');
        }

    }

    /* 
     ** Handlers
     */
    $(".display-avatar").on("click", () => {
        console.log('click')
        $(".display-avatar").addClass('.hide');

    });

    $('.character').on('click', selectCharacter);



});

/* <div class="progress">
  <div class="progress-bar progress-bar-striped bg-danger" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
</div> */