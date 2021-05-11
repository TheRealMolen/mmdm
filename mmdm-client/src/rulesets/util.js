import uxm from './uxm';


export const makeSidekickDie = () => {
  const fg = '#333';
  const bg = '#eee';

  const faces = [
    { fg, bg, icon: 'mask' },
    { fg, bg, icon: 'zap' },
    { fg, bg, icon: 'fist' },
    { fg, bg, icon: 'shield' },
    { fg, bg, icon: 'wild' },
    { fg, bg, icon: 'prawn', field: '0', attack: '1', defense: '1' },
  ];

  return { faces, type: 'sidekick' };
};


const htmlifyColour = (col) => {
  if (col.indexOf('#') >= 0 || col.indexOf('(') >= 0) {
    return col;
  }
  return '#' + col;
};

export const makeCharacterDie = (card, ruleset = null) => {
  const characters = ruleset ? ruleset.characters : uxm.characters;

  const stats = characters[card.character];
  const fg = htmlifyColour(stats.fg);
  const bg = htmlifyColour(stats.bg);

  const oneEnergy = { fg, bg, icon: stats.energy };
  const twoEnergy = { fg, bg, icon: stats.energy + 'x2' };

  const faces = [oneEnergy, twoEnergy, twoEnergy];
  for (let i = 0; i < 3; ++i) {
    const face = { fg, bg, icon: card.character.toLowerCase(), field: stats.faces[i][0], attack: stats.faces[i][1], defense: stats.faces[i][2] };
    if (stats.bursts && stats.bursts[i] > 0) {
      face.bursts = '****'.substring(0, stats.bursts[i]);
    }
    faces.push(face);
  }

  return { card, faces, type: 'character' };
};


export const pickActionColour = existingCards => {
  const allColours = ['#E68C3C', '#DC95DF', '#63BF56', '#6FACED'];
  const available = allColours.filter(col => {
    return !existingCards.some(card => {
      return card.tint == col;
    });
  });

  if (available.length == 0) {
    return 'white';
  }
  return available[Math.floor(Math.random() * available.length)];
};


export const makeActionDie = (card) => {
  const tint = card.tint ? card.tint : '#fff';

  const faces = [];
  for (let i = 0; i < 3; ++i) {
    faces.push({ bg: tint, fg: '#222', icon: 'two' });
  }
  let bursts = '';
  for (let i = 0; i < 3; ++i) {
    faces.push({ bg: tint, fg: '#222', icon: 'action', bursts });
    bursts += '*';
  }

  return { card, faces, type: 'action' };
};


export const findCard = (name, character=null, ruleset=uxm) => {
  return ruleset.cards.find(card => {
    if (card.name !== name) {
      return false;
    }
    if (character) {
      if (typeof card.character === 'undefined' || card.character !== character) {
        return false;
      }
    }
    return true;
  });
};

