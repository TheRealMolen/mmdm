export default {
    characters: {
        Angel: {
            bg: 'f3eeeb',
            fg: 'f0462e',
            energy: 'shield',
            faces: [ '022', '133', '134' ]
        },
        Cyclops: {
            bg: '2d2523',
            fg: 'd9441a',
            energy: 'zap',
            faces: [ '142', '153', '164' ]
        },
        Iceman: {
            bg: '96c4d1',
            fg: 'f0f0f0',
            energy: 'zap',
            faces: [ '124', '136', '146' ]
        },
        Juggernaut: {
            bg: 'd86627',
            fg: '5f2a22',
            energy: 'shield',
            faces: [ '163', '274', '376' ]
        },
        KittyPryde: {
            bg: 'rgb(209, 185, 4, 0.6)',
            fg: '2b294e',
            energy: 'mask',
            faces: [ '022', '032', '133' ]
        },
        Magneto: {
            bg: 'ac7fa6',
            fg: '6d2940',
            energy: 'mask',
            faces: [ '144', '257', '368' ]
        },
        Quicksilver: {
            bg: '32af39',
            fg: 'ebdbe8',
            energy: 'zap',
            faces: [ '031', '132', '143' ]
        },
        Wolverine: {
            bg: '32285d',
            fg: 'd9dd30',
            energy: 'fist',
            faces: [ '152', '263', '384' ],
            bursts: [ 1, 1, 0 ]
        }
    },

    cards: [
        {
            id: 1,
            character: 'Angel',
            name: 'Air Transport',
            text: 'When fielded, you may field a Sidekick die from your used pile (spin it to its character side)',
            affiliation: 'xmen',
            cost: 3,
            max: 4,
        },
        {
            id: 2,
            character: 'Angel',
            name: 'Inspiring',
            text: 'When Angel attacks, your Sidekicks get +1A and +1D (no matter how many Angel dice attack)',
            affiliation: 'xmen',
            cost: 3,
            max: 4,
        },
        {
            id: 3,
            character: 'Angel',
            name: 'Superhero',
            text: 'When fielded, Angel may pair up with a different Heroic character until the start of your next turn.\nOnce per turn while Angel is paired up, you may pay <shield> to give Angel and his partner each +2D',
            affiliation: 'xmen',
            cost: 3,
            heroic: true,
            max: 4,
        },


        {
            id: 4,
            character: 'Cyclops',
            name: 'Optic Blast',
            text: 'When fielded, Cyclops deals 3 damage to an opposing character. Your opponent may pay 3 life to prevent this.',
            affiliation: 'xmen',
            cost: 6,
            max: 4,
            whenFielded: {
                async: true,    // because opponent needs to decide whether to take damage personally or let character take it
                resolve() {
                    alert('TODO: enemy character takes 3 damage from Cyclops');
                    return Promise.resolve();
                },
            },
        },
        {
            id: 5,
            character: 'Cyclops',
            name: 'Overlook',
            text: 'When fielded, Cyclops deals 1 damage to your opponent and each opposing character.',
            affiliation: 'xmen',
            cost: 6,
            max: 4,
        },
        {
            id: 6,
            character: 'Cyclops',
            name: 'Superhero',
            text: 'When fielded, Cyclops may pair up with a different Heroic character until the start of your next turn.\nWhile Cyclops is paired up, he and his partner each deal 1 damage to the opponent when assigned to attack.',
            affiliation: 'xmen',
            cost: 5,
            heroic: true,
            max: 4,
        },
        

        {
            id: 7,
            character: 'Iceman',
            name: 'Cryokinetic',
            text: '',
            affiliation: 'xmen',
            cost: 4,
            max: 4,
        },
        {
            id: 8,
            character: 'Iceman',
            name: 'Robert Louis Drake',
            text: 'You may pay <zap> to give Iceman +1A and +1D.',
            affiliation: 'xmen',
            cost: 5,
            max: 4,
        },
        {
            id: 9,
            character: 'Iceman',
            name: 'Too Cool for Words',
            text: 'Once per turn, you may pay <zap> to double Iceman\'s attack.',
            globaltext: 'Pay <zap> to spin any number of your Sidekick dice to their <zap> side (if active, move them to your reserve pool)',
            affiliation: 'xmen',
            cost: 5,
            max: 4,
        },
        

        {
            id: 10,
            character: 'Juggernaut',
            name: 'Cain Marko',
            text: 'When Juggernaut takes damage, you may move any or all of your Sidekicks to your used pile. Prevent up to 3 damage to Juggernaut per Sidekick moved.',
            affiliation: 'villain',
            cost: 6,
            max: 4,
        },
        {
            id: 11,
            character: 'Juggernaut',
            name: 'Unstoppable',
            text: 'Once per turn, you may move one of your Sidekicks to your used pile to give Juggernaut +4A and +4D.',
            affiliation: 'villain',
            cost: 7,
            max: 4,
        },
        {
            id: 12,
            character: 'Juggernaut',
            name: 'Archvillain',
            text: 'When fielded, if your opponent has no Villains in the field, you may move one of your Sidekicks to your used pile to deal 1 damage to your opponent and gain 1 life.',
            affiliation: 'villain',
            cost: 6,
            max: 4,
        },

        
        {
            id: 13,
            character: 'KittyPryde',
            name: 'Ariel',
            text: '',
            affiliation: 'xmen',
            cost: 2,
            max: 4,
        },
        {
            id: 14,
            character: 'KittyPryde',
            name: 'Sprite',
            text: 'Kitty Pryde cannot be blocked by Sidekicks.',
            affiliation: 'xmen',
            cost: 3,
            max: 4,
        },
        {
            id: 15,
            character: 'KittyPryde',
            name: 'Shadowcat',
            text: 'Kitty Pryde cannot be blocked on the turn she is fielded.',
            globaltext: 'Pay <mask>. Target character cannot attack this turn unless its owner pays 1 life.',
            affiliation: 'xmen',
            cost: 4,
            max: 4,
        },

        
        {
            id: 16,
            character: 'Magneto',
            name: 'Field Control',
            text: 'When fielded, you may pay <mask><mask> to move a character from the field or reserve pool to its owners prep area.',
            affiliation: 'villain',
            cost: 6,
            max: 4,
        },
        {
            id: 17,
            character: 'Magneto',
            name: 'Will to Live',
            text: 'If Magneto leaves the field, he goes to your prep area instead of the used pile or dice bag.',
            affiliation: 'villain',
            cost: 6,
            max: 4,
        },
        {
            id: 18,
            character: 'Magneto',
            name: 'Archvillain',
            text: 'If your opponent has no Villains in the field, Magneto gains +3A and +3D.',
            affiliation: 'villain',
            cost: 6,
            max: 4,
        },

        
        {
            id: 19,
            character: 'Quicksilver',
            name: 'Pietro Maximoff',
            text: 'When fielded, Quicksilver deals 1 damage to one opposing character.',
            affiliation: 'xmen',
            cost: 3,
            max: 4,
        },
        {
            id: 20,
            character: 'Quicksilver',
            name: 'Thanks to Isotope E',
            text: 'When fielded, Quicksilver deals 1 damage to each opposing Sidekick.',
            affiliation: 'xmen',
            cost: 4,
            max: 4,
        },
        {
            id: 21,
            character: 'Quicksilver',
            name: 'Former Villain',
            text: 'When Quicksilver is blocked, he deals 1 damage to each opposing character (this extra damage is resolved before normal combat damage is assigned).',
            affiliation: 'xmen',
            cost: 4,
            max: 4,
        },

        
        {
            id: 22,
            character: 'Wolverine',
            name: 'The Best There Is',
            text: 'Wolverine deals double damage to characters that block him.',
            affiliation: 'xmen',
            cost: 5,
            max: 4,
        },
        {
            id: 23,
            character: 'Wolverine',
            name: 'Not Very Nice',
            text: 'When Wolverine is blocked, you may pay <fist><fist> to have him deal damage equal to his attack to one character blocking him (this extra damage is resolved before normal combat damage is assigned).',
            affiliation: 'xmen',
            cost: 6,
            max: 4,
        },
        {
            id: 24,
            character: 'Wolverine',
            name: 'Superhero',
            text: 'When fielded, Wolverine may pair up with a different Heroic character until the start of your next turn.\nWhile Wolverine is paired up, he and his partner can only be blocked by two or more characters (each).',
            affiliation: 'xmen',
            cost: 6,
            heroic: true,
            max: 4,
        },

        
        {
            id: 25,
            action: true,
            name: 'Ambush',
            text: 'One of your characters gets +1A for each character your opponent has in the field.',
            cost: 3,
            max: 3,
            precondition(game) {
                if (game.selectedDice.length !== 2) {
                    return 'You need to choose an action die and a character to target';
                }
                const actionDice = game.selectedDice.filter(die => die.face.type === 'action');
                const targetDice = game.selectedDice.filter(die => die.face.type === 'character');
                if (actionDice.length !== 1 || targetDice.length !== 1) {
                    return 'You need to choose an action die and a character to target';
                }
                const actionDie = actionDice[0];
                const targetDie = targetDice[0];
                if (actionDie.owner !== game.currentTurn || targetDie.owner !== game.currentTurn ||
                    (targetDie.location !== 'field' && targetDie.location !== 'attack') ||
                    actionDie.location !== 'reserve' ||
                    targetDie.face.type !== 'character') {
                    return 'You need to select the ambush die and one of your fielded character dice';
                }
            },
            doit({game, commit}) {
                const opponent = game.players[1-game.currentTurn];
                const opponentDice = [...opponent.field, ...opponent.attack];

                const actionDice = game.selectedDice.filter(die => die.face.type === 'action');
                const targetDice = game.selectedDice.filter(die => die.face.type === 'character');

                commit('addModifier', {die:targetDice[0], stat: 'attack', amount: opponentDice.length, source: 'Ambush'});
            },
        },
        {
            id: 26,
            action: true,
            name: 'Enrage',
            text: 'Choose a character. That character must attack at its next opportunity. Spin that character up one level (if able).',
            cost: 3,
            max: 3,
            global: {
                text: 'Pay <zap>. Give one character +1A.',
                phase: 'attack',
                precondition(game) {
                    const targetDice = game.selectedDice.filter(die => die.face.type === 'character');
                    const energyDice = game.selectedDice.filter(die => die.face.type === 'energy' && (die.face.icon === 'zap' || die.face.icon === 'wild'));
                    if (targetDice.length !== 1) {
                        return 'You need to pick one character to enrage';
                    }
                    if (energyDice.length === 0) {
                        return 'You need to pay with <zap> energy';
                    }
                    if (targetDice.length + energyDice.length !== game.selectedDice.length) {
                        return 'You can only use <zap> or <wild> energy to pay to Enrage';
                    }
                },
                doit({game, commit}) {
                    const targetDie = game.selectedDice.filter(die => die.face.type === 'character')[0];
                    const energyDice = game.selectedDice.filter(die => die.face.type === 'energy' && (die.face.icon === 'zap' || die.face.icon === 'wild'));
                    commit('addModifier', {die:targetDie, stat:'attack', amount:energyDice.length, source:'Enrage'});
                    commit('moveAllDice', {source:'reserve', dice:energyDice, dest:'outOfPlay'});
                },
            },
        },
        {
            id: 27,
            action: true,
            name: 'Feedback',
            text: 'Deal 1 damage to your opponent for each of their characters that is knocked out for the rest of this turn.',
            cost: 3,
            max: 3,
        },
        {
            id: 28,
            action: true,
            name: 'Imprisoned',
            text: 'This die captures any number of opposing characters with a total fielding cost of 2 or less. This effect lasts until canceled or you do damage to your opponent (return the captured dice to the field).',
            cost: 4,
            max: 3,
        },
        {
            id: 29,
            action: true,
            name: 'Possession',
            text: 'At the start of your attack step, take control of an opposing character with a level lower than one of your characters. Attack with it.\n<burst><burst> Instead, take control of an opposing character with an equal or lower level.',
            cost: 4,
            max: 3,
        },
        {
            id: 30,
            action: true,
            name: 'Reckless Melee',
            text: 'Deal 1 damage to each character (including yours).\n<burst> Instead, deal 1 damage to each player.\n<burst><burst> Instead, deal 1 damage to each player and 1 damage to each character.',
            cost: 3,
            max: 3,
            precondition(game) {
                if (game.selectedDice.length !== 1) {
                    return 'You can only recklessly melee one die at a time 😅';
                }
            },
            doit({game, commit}) {
                const bursts = game.selectedDice[0].face.bursts;
                game.players.forEach(player => {
                    if (bursts === 0 || bursts === 2) {
                        const eligibleDice = [...player.attack, ...player.field];
                        eligibleDice.forEach(die => {
                            commit('damageDie', {die, amount:1, source: 'Reckless Melee'});
                        });
                    }

                    if (bursts === 1 || bursts === 2) {
                        commit('damagePlayer', {playerNum:player.playerNum, amount:1, source: 'Reckless Melee'});
                    }
                });
            },
        },
        {
            id: 31,
            action: true,
            name: 'Relentless',
            text: 'Spin this die to a generic energy side. Reroll a character or Sidekick die from your reserve pool.',
            globaltext: 'Pay <mask>. Target character cannot block.',
            cost: 4,
            max: 3,
        },
        {
            id: 32,
            action: true,
            name: 'Selective Shield',
            text: 'Choose an energy type. Characters of that type cannot attack until next turn.\n<burst><burst> Also choose one character of that type. That character cannot block until your next turn.',
            globaltext: 'Pay <fist> and target a blocked character. That character deals no damage.',
            cost: 4,
            max: 3,
        },
        {
            id: 33,
            action: true,
            name: 'Take That, Villain!',
            text: 'Deal 3 damage to a Villain.\n<burst><burst> Deal an extra 1 damage to that Villain.',
            cost: 3,
            max: 3,
        },
        {
            id: 34,
            action: true,
            name: 'Transfer Power',
            text: 'Roll a character die from your used pile. If it rolls a character face, field it at no cost. Otherwise, place it in your bag.',
            globaltext: 'Pay <shield>. Swap the attack value of one of your characters with that of one opposing character.',
            cost: 3,
            max: 3,
        },
    ],
}