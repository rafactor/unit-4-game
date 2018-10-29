var fighters = new Array();
fighters[0] = new card('Luke Skywalker', 'jedi', 100, 18, 6);
fighters[1] = new card('Obi-Wan Kenobi', 'jedi', 110, 18, 12);
fighters[2] = new card('Qui-Gon Jinn', 'jedi', 120, 12, 12);
fighters[3] = new card('Master Yoda', 'jedi', 130, 30, 6);
fighters[4] = new card('Darth Vader', 'sith', 100, 6, 12);
fighters[5] = new card('Darth Maul', 'sith', 110, 12, 6);
fighters[6] = new card('Darth Sidious', 'sith', 120, 18, 6);
fighters[7] = new card('Count Dooku', 'sith', 130, 6, 12);


var avatar = false;
var selected = false;
var selection; //id of selected fighter
var fighter
var nextOpponent;
var attackBase = 6;
var playerSide;
var otherSide;
var fightCounter = 0;

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
    selectCharacter() {

        // if (selected === false) {
        let id = this.id;
        selection = id;
        console.log(selection)
        app.avatarHighlight(id)

        app.showCharacter(id)

    },
    avatarHighlight(id) {
        if (id <= 3) {
            $('#' + id).addClass('display')
            for (i = 0; i <= 3; i++) {
                if (id != i) {
                    $('#' + id).removeClass('display');
                }
            };
        }
    },

    showCharacter(id) {


        let name = fighters[id].name;
        let image = fighters[id].image();
        let health = fighters[id].healthPoints;
        let attack = fighters[id].attackPower;
        let counter = fighters[id].counterAttackPower;
        let side = fighters[id].side;

        //set the opacity for the selected character
        for (let n = 0; n < 8; n++) {
            if (id == n) {
                $('#' + n).addClass('display');
            } else if (n != selection) {
                $('#' + n).removeClass('display');
            }
        } 

        // Hide the character profile for the oposite side
        if (selected === false) {
            app.hideCharacter(side);
        }
        // Display the character profile
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
    },

    hideCharacter(side) {
        if (side === 'jedi') {
            $('.sithPoints, #sithAvatar').addClass('hide');
            $('.sithArena > .nameTag').text('Choose your side');
        } else {
            $('.jediPoints, #jediAvatar').addClass('hide');
            $('.jediArena > .nameTag').text('Choose your side');
        }
    },

    chooseCharacter() {

        if (selected === false) {
            selected = true;
            playerSide = fighters[selection].side;
            fighter = selection;

            if (playerSide === 'jedi') {
                for (i = 0; i < 4; i++) {
                    if (fighter != i) {
                        let element = $('#' + i);
                        element.remove();
                    } else {
                        let element = $('#' + i);
                        element.addClass('display');
                    }
                }
                $('jediBtnAttack').removeClass('hide');
                $('.sithBottom').html('Choose your opponent');
                $('#jediSelect').remove();
            } else {
                for (i = 4; i < 8; i++) {
                    if (fighter != i) {
                        let element = $('#' + i);
                        element.remove();
                    } else {
                        let element = $('#' + i);
                        element.addClass('display');
                    }
                }
                $('#sithBtnAttack').removeClass('hide');
                $('.jediBottom').html('Choose your opponent');
                $('#sithSelect').remove();
            }
            // let element = $('.select');
            // $('#jediSelect').remove();
        } else {
            nextOpponent = selection;
            otherSide = fighters[nextOpponent].side;
            $('.' + otherSide + 'Bottom').html("");

            if (playerSide === 'jedi') {
                $('#jediBtnAttack').removeClass('hide');
                $('#sithSelect').addClass('hide');

                let element = $('.sithDefenderArea');
                let avatar = $('<div>');
                avatar.html('<img src="' + fighters[nextOpponent].avatar() + '" class="img-thumbnail rounded-circle arena display">');
                element.append(avatar);
            } else {
                $('#sithBtnAttack').removeClass('hide');
                $('#jediSelect').addClass('hide');

                let element = $('.jediDefenderArea');
                let avatar = $('<div>');
                avatar.html('<img src="' + fighters[nextOpponent].avatar() + '" class="img-thumbnail rounded-circle arena display">');
                element.append(avatar);
            }
        }

        $('#' + nextOpponent).remove();
    },

    attack() {

        // let side = fighters[fighter].side
        fighters[nextOpponent].healthPoints -= fighters[fighter].attackPower;
        fighters[fighter].attackPower += attackBase;
        app.checkOpponentHealth();

        fighters[fighter].healthPoints -= fighters[nextOpponent].counterAttackPower;
        app.checkPlayerHealth();

        // Display the character profile
        if (playerSide === 'jedi') {
            var jedi = fighter;
            var sith = nextOpponent;
        } else {
            var jedi = nextOpponent;
            var sith = fighter;
        }

        $('#jediHealth > div').attr({
            'aria-valuenow': fighters[jedi].healthPoints,
            'style': 'width:' + fighters[jedi].healthPoints
        }).text(fighters[jedi].healthPoints);

        $('#jediAttack > div').attr({
            'aria-valuenow': fighters[jedi].attackPower,
            'style': 'width:' + fighters[jedi].attackPower
        }).text(fighters[jedi].attackPower);

        $('#sithHealth > div').attr({
            'aria-valuenow': fighters[sith].healthPoints,
            'style': 'width:' + fighters[sith].healthPoints
        }).text(fighters[sith].healthPoints);

        $('#sithAttack > div').attr({
            'aria-valuenow': fighters[sith].attackPower,
            'style': 'width:' + fighters[sith].attackPower
        }).text(fighters[sith].attackPower, );


        

       
    },

    checkPlayerHealth() {
        if(fighters[fighter].healthPoints <=0) {
            $('.' + playerSide + 'Points').addClass('hide');
            $('#' + playerSide + 'Avatar').html('You Lose!');
        }
    },

    checkOpponentHealth() {
        if (fighters[nextOpponent].healthPoints <= 0) {
            console.log('death');
            fightCounter += 1

            if (fightCounter === 4) {
                $('.' + otherSide + 'Points').addClass('hide');
                $('#' + otherSide + 'Avatar').html('You Win!');
                console.log('You Win')
            } else {

            $('.arena').remove();
            $('#' + otherSide + 'BtnAttack').addClass('hide');
            $('.' + otherSide + 'Points').addClass('hide');
            $('#' + otherSide + 'Avatar').addClass('hide');
            $('#'+ otherSide + 'Select').removeClass('hide');
            $('#'+ playerSide + 'BtnAttack').addClass('hide');
            $('.' + otherSide + 'Bottom').html('Choose another opponent')
            }
        }
    }
}



$(document).ready(function () {

    /* 
     ** Handlers
     */
    $(".select").on("click", app.chooseCharacter);

    $('.character').on('click', app.selectCharacter);

    $('#jediBtnAttack').on('click', app.attack);
    $('#sithBtnAttack').on('click', app.attack);

});
