import { useState, useEffect } from 'react';
import { getCompetitions, getMatches } from '../services/api';
import LeagueSelector from '../components/home/LeagueSelector';
import MatchesList from '../components/home/MatchesList';
import toast from 'react-hot-toast';

interface League {
  league_key: string;
  league_name: string;
  code: string;
  league_logo: string;
}

interface Match {
  id: string;
  utcDate: string;
  homeTeam: { id: string; name: string; shortName: string; crest: string };
  awayTeam: { id: string; name: string; shortName: string; crest: string };
  venue: string;
  competition: { name: string; emblem: string };
}

// Transformer function to map API match data to Match interface
const transformMatch = (apiMatch: any): Match => {
  // Compose ISO datetime from event_date and event_time (UTC assumed)
  const dateTime = `${apiMatch.event_date}T${apiMatch.event_time}:00Z`;

  return {
    id: String(apiMatch.event_key),
    utcDate: new Date(dateTime).toISOString(),

    homeTeam: {
      id: String(apiMatch.home_team_key),
      name: apiMatch.event_home_team,
      shortName: apiMatch.event_home_team,
      crest: apiMatch.home_team_logo,
    },

    awayTeam: {
      id: String(apiMatch.away_team_key),
      name: apiMatch.event_away_team,
      shortName: apiMatch.event_away_team,
      crest: apiMatch.away_team_logo,
    },

    venue: apiMatch.event_stadium || 'N/A',

    competition: {
      name: apiMatch.league_name,
      emblem: apiMatch.league_logo,
    },
  };
};

const HomePage = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoadingLeagues, setIsLoadingLeagues] = useState(true);
  const [isLoadingMatches, setIsLoadingMatches] = useState(false);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const data = await getCompetitions();
        setLeagues(data);
        if (data.length > 0) {
          // Find league with league_key '22' or fallback to first league if not found
          const defaultLeague = data.find((league: League) => league.league_key === "22") || data[122];
          console.log(defaultLeague)
          setSelectedLeague(defaultLeague);
        }

      } catch (error) {
        console.error('Error fetching leagues:', error);
        toast.error('Failed to load leagues. Please try again.');
      } finally {
        setIsLoadingLeagues(false);
      }
    };

    fetchLeagues();
  }, []);

  useEffect(() => {
    if (selectedLeague) {
      console.log('selected', selectedLeague)
      const fetchMatches = async () => {
        setIsLoadingMatches(true);
        try {
          const data = await getMatches(selectedLeague.league_key);
          // data is the API response object with .result array of matches
          const rawMatches = data || [];
          const formattedMatches = rawMatches.map(transformMatch);
          setMatches(formattedMatches);
        } catch (error) {
          console.error('Error fetching matches:', error);
          toast.error('Failed to load matches. Please try again.');
        } finally {
          setIsLoadingMatches(false);
        }
      };

      fetchMatches();
    }
  }, [selectedLeague]);

  const handleSelectLeague = (league: League) => {
    setSelectedLeague(league);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
          Upcoming Soccer Matches
        </h1>

        {isLoadingLeagues ? (
          <div className="w-48 h-10 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md"></div>
        ) : (
          <LeagueSelector
            leagues={leagues}
            selectedLeague={selectedLeague}
            onSelectLeague={handleSelectLeague}
          />
        )}
      </div>

      <p className="text-red-400 text-sm mt-4 font-blue">

        Some leagues may not have ongoing matches right now, so no results will appear for them.
      </p>
      <p className=" text-red-400 text-sm mb-2">

        You can try leagues like Premier League, Segunda División, Primera A, Allsvenskan, etc. for checking.
      </p>
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
        <MatchesList matches={matches} isLoading={isLoadingMatches} />
      </div>
    </div>
  );
};

export default HomePage;
