import { Layout } from "@/components/layout/Layout";
import { Card } from "@/components/ui/card";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { 
  Award, Calendar, Check, Footprints, Leaf, 
  MapPin, Star, Trophy, Users, Flame, Clock
} from "lucide-react";

// Helper function to convert English numbers to Persian
function toPersianNumber(num: number | string): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, x => persianDigits[parseInt(x)]);
}

export default function AchievementsPage() {
  const totalBadges = badges.length;
  const unlockedBadges = badges.filter(badge => badge.progress === 100).length;
  const badgeProgress = Math.floor((unlockedBadges / totalBadges) * 100);
  
  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">دستاوردها</h1>
          <PriceDisplay amount={1250000} />
        </div>
        
        {/* Progress Summary */}
        <Card className="p-4 mb-6">
          <div className="flex items-center">
            <ProgressRing progress={badgeProgress} size={80}>
              <Trophy size={24} className="text-walkcoin-green" />
            </ProgressRing>
            <div className="mr-4">
              <h2 className="text-lg font-bold">پیشرفت دستاوردها</h2>
              <p className="text-sm text-gray-500">
                شما {toPersianNumber(unlockedBadges)} از {toPersianNumber(totalBadges)} نشان را باز کرده‌اید
              </p>
              <div className="mt-1 flex items-center">
                <Star size={16} className="text-yellow-500 ml-1" />
                <span className="font-medium text-walkcoin-purple">سطح ۳: شهروند پویا</span>
              </div>
            </div>
          </div>
        </Card>
        
        {/* Challenges */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">چالش‌های فعلی</h2>
          <div className="space-y-4">
            {challenges.map((challenge, index) => (
              <ChallengeCard key={index} challenge={challenge} />
            ))}
          </div>
        </div>
        
        {/* Badges */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">نشان‌ها</h2>
          <div className="grid grid-cols-2 gap-4">
            {badges.map((badge, index) => (
              <BadgeCard key={index} badge={badge} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

interface ChallengeProps {
  challenge: {
    title: string;
    description: string;
    icon: React.ElementType;
    progress: number;
    reward: number;
    endDate: string;
  };
}

function ChallengeCard({ challenge }: ChallengeProps) {
  return (
    <Card className="p-4 card-hover">
      <div className="flex items-start">
        <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white ml-3">
          <challenge.icon size={20} />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold">{challenge.title}</h3>
              <p className="text-sm text-gray-500">{challenge.description}</p>
            </div>
            <PriceDisplay amount={challenge.reward * 10000} size="sm" />
          </div>
          
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">{toPersianNumber(challenge.progress)}٪ تکمیل شده</span>
              <span className="text-xs text-gray-500 flex items-center">
                <Clock size={12} className="ml-1" />
                پایان: {challenge.endDate}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div 
                className="h-2 gradient-bg rounded-full"
                style={{ width: `${challenge.progress}%` }}  
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

interface BadgeProps {
  badge: {
    title: string;
    description: string;
    icon: React.ElementType;
    progress: number;
  };
}

function BadgeCard({ badge }: BadgeProps) {
  const isUnlocked = badge.progress === 100;
  
  return (
    <Card className={`p-4 text-center ${!isUnlocked ? 'opacity-80' : 'card-hover'}`}>
      <div className="relative w-16 h-16 mx-auto mb-2">
        <div className={`w-16 h-16 rounded-full ${isUnlocked ? 'gradient-bg' : 'bg-gray-200'} flex items-center justify-center`}>
          <badge.icon size={28} className="text-white" />
        </div>
        
        {isUnlocked ? (
          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
            <Check size={14} className="text-white" />
          </div>
        ) : (
          <div className="absolute inset-0">
            <ProgressRing progress={badge.progress} size={64} strokeWidth={4}>
              <span className="text-xs font-bold">{toPersianNumber(badge.progress)}٪</span>
            </ProgressRing>
          </div>
        )}
      </div>
      
      <h3 className="font-bold mb-1">{badge.title}</h3>
      <p className="text-xs text-gray-500">{badge.description}</p>
    </Card>
  );
}

const challenges = [
  {
    title: "چالش قدم هفتگی",
    description: "۵۰,۰۰۰ قدم در این هفته بردارید",
    icon: Footprints,
    progress: 68,
    reward: 30,
    endDate: "یکشنبه، ۲۵ فروردین",
  },
  {
    title: "چالش روز زمین",
    description: "با پیاده‌روی ۵ کیلوگرم CO₂ صرفه‌جویی کنید",
    icon: Leaf,
    progress: 42,
    reward: 25,
    endDate: "دوشنبه، ۲ اردیبهشت",
  },
  {
    title: "پیاده‌روی گروهی",
    description: "به یک رویداد پیاده‌روی جمعی بپیوندید",
    icon: Users,
    progress: 0,
    reward: 20,
    endDate: "جمعه، ۳۰ فروردین",
  },
];

const badges = [
  {
    title: "اولین قدم‌ها",
    description: "اولین ۱,۰۰۰ قدم خود را بردارید",
    icon: Footprints,
    progress: 100,
  },
  {
    title: "قهرمان اقلیم",
    description: "۱۰ کیلوگرم CO₂ صرفه‌جویی کنید",
    icon: Leaf,
    progress: 100,
  },
  {
    title: "شهروند پویا",
    description: "در ۵ منطقه مختلف پیاده‌روی کنید",
    icon: MapPin,
    progress: 80,
  },
  {
    title: "مبارز هفتگی",
    description: "۵ چالش هفتگی را کامل کنید",
    icon: Award,
    progress: 60,
  },
  {
    title: "پادشاه تداوم",
    description: "۷ روز پشت سر هم پیاده‌روی کنید",
    icon: Calendar,
    progress: 100,
  },
  {
    title: "استاد ماراتن",
    description: "۴۲٫۲ کیلومتر در یک ماه پیاده‌روی کنید",
    icon: Trophy,
    progress: 35,
  },
  {
    title: "استاد تداوم",
    description: "یک رکورد ۳۰ روزه حفظ کنید",
    icon: Flame,
    progress: 23,
  },
  {
    title: "راهنمای جامعه",
    description: "به ۳ کاربر جدید در پیوستن کمک کنید",
    icon: Users,
    progress: 33,
  },
];
