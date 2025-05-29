import { Link } from 'react-router-dom';
import { Trophy, Users, Calendar, Search, Moon, Globe2 } from 'lucide-react';

const features =[
  {
    icon: Trophy,
    title: 'Top Leagues Coverage',
    description: 'Follow matches from Premier League, La Liga, Bundesliga, Serie A, and more.',
  },
  {
    icon: Calendar,
    title: 'Real-time Updates',
    description: 'Stay updated with upcoming matches, automatically adjusted to your timezone.',
  },
  {
    icon: Users,
    title: 'Player Profiles',
    description: 'Coming soon...',
    comingSoon: true,
  },
  {
    icon: Search,
    title: 'Smart Search',
    description: 'Coming soon...',
    comingSoon: true,
  },
  {
    icon: Moon,
    title: 'Dark Mode',
    description: 'Comfortable viewing experience with automatic dark mode support.',
  },
  {
    icon: Globe2,
    title: 'Global Coverage',
    description: 'International matches and tournaments from around the world.',
  },
];


const LandingPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative text-center py-16 md:py-24 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('https://th.bing.com/th/id/OIP.AbP2hCZJaufik5JgGb-UogHaDt?rs=1&pid=ImgDetMain')`, // replace with your image URL
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Track Soccer Matches Like Never Before
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Your ultimate platform for following soccer matches, tracking player statistics, and staying updated with your favorite teams in real-time.
          </p>
          <Link
            to="/matches"
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Get Started
            <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>


      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          );
        })}
      </div>

      {/* Statistics Section */}
      <div className="py-16 md:py-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Soccer Fans Worldwide</h2>
          <p className="text-gray-600 dark:text-gray-300">Join thousands of users tracking their favorite teams and players</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: '100+', label: 'Leagues' },
            { number: '10K+', label: 'Matches' },
            { number: '5K+', label: 'Players' },
            { number: 'Coming soon', label: 'Users' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl p-8 md:p-12 text-center text-white my-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Start Tracking?
        </h2>
        <p className="text-lg mb-8 opacity-90">
          Join now and never miss an important match again!
        </p>
        <Link
          to="/matches"
          className="inline-flex items-center px-8 py-3 text-lg font-medium text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          View Matches
          <svg className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;