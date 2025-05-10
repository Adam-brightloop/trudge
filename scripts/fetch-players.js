const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

async function fetchPlayers() {
  try {
    console.log('Fetching NFL players...');
    const response = await axios.get('https://api.sleeper.app/v1/players/nfl');
    const players = response.data;
    const playerMap = Object.keys(players).reduce((acc, id) => {
      const player = players[id];
      acc[id] = {
        full_name: player.full_name || 'Unknown Player',
        position: player.position || 'N/A',
        team: player.team || 'N/A',
        years_exp: player.years_exp != null ? player.years_exp : 'N/A',
      };
      return acc;
    }, {});
    const filePath = path.join(__dirname, '../data/players.json');
    await fs.writeFile(filePath, JSON.stringify(playerMap, null, 2));
    console.log('Players saved to data/players.json');
  } catch (error) {
    console.error('Error fetching players:', error.message);
  }
}

fetchPlayers();