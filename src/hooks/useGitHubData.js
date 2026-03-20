import { useQuery } from '@tanstack/react-query';

// Fetch GitHub contributions data from our API
const fetchGitHubData = async () => {
  try {
    const response = await fetch('/api/github');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub data: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.error) {
      console.warn('GitHub API warning:', data.error);
    }
    
    // Ensure stats object exists with default values
    if (!data.stats) {
      data.stats = {
        totalContributions: 0,
        currentYearContributions: 0,
        currentStreak: 0,
        longestStreak: 0,
        repositories: 0,
        followers: 0,
        following: 0,
        pullRequests: 0,
        lastUpdated: new Date().toISOString()
      };
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    throw error;
  }
};

// Custom hook for GitHub data with caching
export const useGitHubData = () => {
  return useQuery({
    queryKey: ['githubData'],
    queryFn: fetchGitHubData,
    staleTime: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    cacheTime: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Export for manual refetch if needed
export const githubQueryKey = ['githubData'];
