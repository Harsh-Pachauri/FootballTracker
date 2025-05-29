

interface Coach {
  coach_name: string;
  coach_country: string | null;
  coach_age: number | null;
}

interface Team {
  id: number;
  team_name: string;
  team_logo: string;
  venue?: string;
  founded?: number;
  clubColors?: string;
  website?: string;
  coaches: Coach[];
}

interface TeamBannerProps {
  team: Team;
}

const TeamBanner = ({ team }: TeamBannerProps) => {
  const mainCoach = team.coaches?.[0]; // assuming the first coach is the head coach

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg overflow-hidden shadow-lg">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          {/* Team Logo */}
          <div className="w-28 h-28 bg-white rounded-full p-2 flex items-center justify-center shadow-md">
            <img
              src={team.team_logo}
              alt={`${team.team_name} logo`}
              className="max-w-full max-h-full"
            />
          </div>

          {/* Team Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{team.team_name}</h1>

            {/* Coach Info */}
            {mainCoach && (
              <div className="mt-4 bg-blue-900/30 p-3 rounded-lg inline-block">
                <p className="text-sm opacity-80 mb-1">Manager</p>
                <p className="font-semibold">{mainCoach.coach_name}</p>
                {mainCoach.coach_country && (
                  <p className="text-xs opacity-70">{mainCoach.coach_country}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Website link */}
      {team.website && (
        <div className="bg-blue-900/50 py-2 px-4 text-center">
          <a
            href={team.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-100 hover:text-white text-sm transition-colors"
          >
            Visit Official Website
          </a>
        </div>
      )}
    </div>
  );
};

export default TeamBanner;
