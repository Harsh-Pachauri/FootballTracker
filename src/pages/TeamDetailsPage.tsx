import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTeam, getTeamMatches } from '../services/api';
import TeamBanner from '../components/team/TeamBanner';
import PlayerCard from '../components/team/PlayerCard';
import toast from 'react-hot-toast';

const TeamDetailsPage = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const [team, setTeam] = useState<any>(null);
  const [matches, setMatches] = useState([]);
  const [activeTab, setActiveTab] = useState<'matches' | 'players'>('matches');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      if (!teamId) return;
      
      setIsLoading(true);
      try {
        const teamData = await getTeam(teamId);
        console.log('h')
        console.log(teamData)
        console.log('p')
        setTeam(teamData);
        
        const matchesData = await getTeamMatches(teamId);
        setMatches(matchesData.matches || []);
      } catch (error) {
        console.error('Error fetching team data:', error);
        toast.error('Failed to load team information');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, [teamId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-600 dark:text-gray-300">Team not found</p>
      </div>
    );
  }

  return (
    <div>
      <TeamBanner team={team} />
      
      {/* Tabs */}
      <div className="mt-8 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          
          <button
            onClick={() => setActiveTab('players')}
            className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
              activeTab === 'players'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Players
          </button>
        </nav>
      </div>
      
      {/* Tab Content */}
      <div className="mt-6">
        
          <div>
            <h2 className="text-xl font-semibold mb-4">Squad</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.players.map((player: any) => (
                <PlayerCard key={player.player_key} player={player} />
              ))}
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default TeamDetailsPage;