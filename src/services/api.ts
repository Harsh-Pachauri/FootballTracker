import toast from 'react-hot-toast';

const API_KEY = import.meta.env.VITE_API_KEY ;

// You can dynamically generate these dates too
const FROM_DATE = '2025-05-29';
const TO_DATE = '2025-06-20';
// const League_Id = '22';

// Generic fetch function
async function fetchApi(endpoint: string) {
  try {
    const url = `https://apiv2.allsportsapi.com/football/?${endpoint}&APIkey=${API_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw { status: response.status, message: response.statusText };
    }

    const data = await response.json();

    if (data.success !== 1) {
      throw { status: 'API Error', message: 'API returned unsuccessful response' };
    }

    return data.result;
  } catch (error) {
    console.error('API Error:', error);
    toast.error('Failed to fetch data. Please try again.');
    throw error;
  }
}

// Get all competitions (leagues)
export async function getCompetitions() {
  try {
    const leagues = await fetchApi('met=Leagues');
    return leagues;
  } catch (error) {
    toast.error('Could not load leagues.');
    throw error;
  }
}

// Get upcoming matches for a specific league
export async function getMatches(leagueId: string="22") {
  try {
    const endpoint = `met=Fixtures&from=${FROM_DATE}&to=${TO_DATE}&leagueId=${leagueId}`;
    console.log(endpoint)
    const matches = await fetchApi(endpoint);
    console.log(matches)
    return matches;
  } catch (error) {
    toast.error('Could not load matches.');
    throw error;
  }
}

// Get team details + player stats
export async function getTeam(teamId: string) {
  try {
    const data = await fetchApi(`met=Teams&teamId=${teamId}`);
    return data?.[0] || null; // Includes team details + players
  } catch (error) {
    toast.error('Could not load team details.');
    throw error;
  }
}

// Get upcoming matches for a team
export async function getTeamMatches(teamId: string) {
  try {
    const endpoint = `met=Fixtures&from=${FROM_DATE}&to=${TO_DATE}&teamId=${teamId}`;
    const data = await fetchApi(endpoint);
    return { matches: data || [] };
  } catch (error) {
    toast.error('Could not load team matches.');
    throw error;
  }
}

// Get individual player details (only needed if detailed player info per match)
export async function getPlayer(playerId: string) {
  try {
    const data = await fetchApi(`met=Players&playerId=${playerId}`);
    return data?.[0] || null;
  } catch (error) {
    toast.error('Could not load player details.');
    throw error;
  }
}

// Search by team/player name
export async function searchTeamsAndPlayers(query: string) {
  try {
    const [teamsRes, playersRes] = await Promise.all([
      fetchApi(`met=SearchTeams&teamName=${encodeURIComponent(query)}`),
      fetchApi(`met=SearchPlayers&playerName=${encodeURIComponent(query)}`),
    ]);

    const formattedTeams = (teamsRes || []).map((team: any) => ({
      id: team.team_key,
      name: team.team_name,
      type: 'team',
      imageUrl: team.team_logo,
    }));

    const formattedPlayers = (playersRes || []).map((player: any) => ({
      id: player.player_key,
      name: player.player_name,
      type: 'player',
      imageUrl: player.player_image,
    }));

    return [...formattedTeams, ...formattedPlayers];
  } catch (error) {
    toast.error('Search failed.');
    throw error;
  }
}
