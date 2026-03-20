import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'Harman8815';
const API_BASE_URL = 'https://github-contributions-api.jogruber.de/v4';

// Cache duration in milliseconds (1 day)
const CACHE_DURATION = 24 * 60 * 60 * 1000;
let cachedData = null;
let lastFetch = 0;

export async function GET() {
  try {
    const now = Date.now();
    
    // Return cached data if still valid
    if (cachedData && (now - lastFetch) < CACHE_DURATION) {
      return NextResponse.json(cachedData);
    }

    // Fetch fresh data
    const response = await fetch(`${API_BASE_URL}/${GITHUB_USERNAME}?y=all`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch GitHub data: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Calculate additional stats
    const currentYear = new Date().getFullYear();
    const currentYearContributions = data.total[currentYear.toString()] || 0;
    
    // Calculate total contributions
    const totalContributions = Object.values(data.total).reduce((sum, year) => sum + year, 0);
    
    // Calculate current streak (consecutive days with contributions up to today)
    const sortedContributions = [...data.contributions].sort((a, b) => 
      new Date(b.date) - new Date(a.date)
    );
    
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    const oneDayMs = 24 * 60 * 60 * 1000;
    
    // Check if today has contributions
    const todayContrib = sortedContributions.find(c => {
      const contribDate = new Date(c.date);
      contribDate.setHours(0, 0, 0, 0);
      return contribDate.getTime() === today.getTime();
    });
    
    if (todayContrib && todayContrib.count > 0) {
      currentStreak = 1;
    }
    
    // Calculate current streak from most recent contributions
    let expectedDate = new Date(today);
    for (let i = 0; i < sortedContributions.length; i++) {
      const contrib = sortedContributions[i];
      const contribDate = new Date(contrib.date);
      contribDate.setHours(0, 0, 0, 0);
      expectedDate.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.abs((today - contribDate) / oneDayMs);
      
      if (contrib.count > 0 && daysDiff === currentStreak) {
        if (currentStreak === 0 && daysDiff === 0) {
          currentStreak = 1;
        } else if (daysDiff > 0) {
          currentStreak++;
        }
      } else if (contrib.count === 0 || daysDiff > currentStreak) {
        break;
      }
    }
    
    // Calculate longest streak
    tempStreak = 0;
    for (let i = 0; i < sortedContributions.length; i++) {
      const contrib = sortedContributions[i];
      if (contrib.count > 0) {
        tempStreak++;
        if (tempStreak > longestStreak) {
          longestStreak = tempStreak;
        }
      } else {
        tempStreak = 0;
      }
    }
    
    // Enhanced data with stats
    const enhancedData = {
      ...data,
      stats: {
        totalContributions,
        currentYearContributions,
        currentStreak,
        longestStreak,
        repositories: 17,
        followers: 7,
        following: 14,
        pullRequests: 25,
        lastUpdated: new Date().toISOString()
      }
    };
    
    // Cache the data
    cachedData = enhancedData;
    lastFetch = now;
    
    return NextResponse.json(enhancedData);
    
  } catch (error) {
    console.error('GitHub API error:', error);
    
    // Return cached data if available, even if expired
    if (cachedData) {
      return NextResponse.json({
        ...cachedData,
        error: 'Using cached data due to API error',
        lastUpdated: cachedData.lastUpdated
      });
    }
    
    // Return error response
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data', message: error.message },
      { status: 500 }
    );
  }
}

// Clear cache endpoint for development
export async function DELETE() {
  cachedData = null;
  lastFetch = 0;
  return NextResponse.json({ message: 'Cache cleared' });
}
