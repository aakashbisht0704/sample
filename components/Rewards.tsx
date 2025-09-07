import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Star, Award, Crown, Target, Zap, BookOpen, TrendingUp, Users } from 'lucide-react';

const badges = [
  {
    id: 1,
    name: 'First Star',
    description: 'Complete your first lesson',
    icon: Star,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    earned: true
  },
  {
    id: 2,
    name: 'Quick Learner',
    description: 'Answer 5 questions in under 2 minutes',
    icon: Zap,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    earned: true
  },
  {
    id: 3,
    name: 'Math Champion',
    description: 'Score 90% or higher in a math session',
    icon: Crown,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
    earned: true
  },
  {
    id: 4,
    name: 'Perfect Score',
    description: 'Get 100% on a post-test',
    icon: Target,
    color: 'text-green-500',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    earned: false
  },
  {
    id: 5,
    name: 'Bookworm',
    description: 'Complete 10 lessons in one week',
    icon: BookOpen,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    earned: false
  },
  {
    id: 6,
    name: 'Improvement Star',
    description: 'Improve by 25% in one session',
    icon: TrendingUp,
    color: 'text-teal-500',
    bgColor: 'bg-teal-50 dark:bg-teal-900/20',
    earned: true
  },
  {
    id: 7,
    name: 'Team Player',
    description: 'Help a classmate with a question',
    icon: Users,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
    earned: false
  },
  {
    id: 8,
    name: 'Master Badge',
    description: 'Earn all other badges',
    icon: Award,
    color: 'text-gold-500',
    bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20',
    earned: false
  }
];

export function Rewards() {
  const earnedBadges = badges.filter(badge => badge.earned);
  const availableBadges = badges.filter(badge => !badge.earned);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl mb-2">Your Rewards</h2>
        <p className="text-muted-foreground">
          You've earned {earnedBadges.length} out of {badges.length} badges
        </p>
      </div>

      {/* Earned Badges */}
      <div className="mb-12">
        <h3 className="text-xl mb-6 flex items-center">
          <Star className="h-5 w-5 text-yellow-500 mr-2" />
          Earned Badges ({earnedBadges.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {earnedBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <Card key={badge.id} className="transition-all hover:shadow-md">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${badge.bgColor}`}>
                    <Icon className={`h-8 w-8 ${badge.color}`} />
                  </div>
                  <h4 className="font-semibold mb-2">{badge.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    Earned!
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Available Badges */}
      <div>
        <h3 className="text-xl mb-6 flex items-center">
          <Target className="h-5 w-5 text-gray-400 mr-2" />
          Available Badges ({availableBadges.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {availableBadges.map((badge) => {
            const Icon = badge.icon;
            return (
              <Card key={badge.id} className="opacity-75 transition-all hover:opacity-90 hover:shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                    <Icon className="h-8 w-8 text-gray-400" />
                  </div>
                  <h4 className="font-semibold mb-2 text-muted-foreground">{badge.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
                  <Badge variant="outline" className="text-muted-foreground">
                    Not Earned
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Progress Summary */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle className="text-center">Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-semibold text-purple-600 mb-2">{earnedBadges.length}</div>
              <div className="text-sm text-muted-foreground">Badges Earned</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-teal-600 mb-2">320</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-yellow-600 mb-2">1st</div>
              <div className="text-sm text-muted-foreground">Class Rank</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
