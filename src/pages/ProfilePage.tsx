import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CoinDisplay } from "@/components/ui/CoinDisplay";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Award, Calendar, Clock, Footprints, Leaf, 
  MapPin, Settings, User as UserIcon, BadgeCheck
} from "lucide-react";

export default function ProfilePage() {
  const [coins] = useState(1250000);
  
  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">پروفایل</h1>
          <Button variant="outline" className="flex items-center gap-2 px-3 py-2">
            <Settings size={18} />
            <span className="text-sm">تنظیمات</span>
          </Button>
        </div>
        
        {/* User Profile Card */}
        <Card className="p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 rounded-full gradient-bg flex items-center justify-center text-white ml-4">
              <img src="/profile.jpg" alt="پروفایل" className="w-full h-full rounded-full object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-bold">امیر تهرانی</h2>
              <p className="text-gray-500">دانشجو</p>
            </div>
          </div>
          
          <div className="flex justify-between items-center mb-4">
            <PriceDisplay amount={coins} />
            <Badge icon={Award} label="پیاده‌رو طلایی" className="bg-yellow-500 text-white" />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <StatItem label="کل قدم‌ها" value="178.5k" icon={Footprints} />
            <StatItem label="مسافت" value="143km" icon={MapPin} />
            <StatItem label="CO₂ ذخیره‌شده" value="38kg" icon={Leaf} />
          </div>
          
          <Button className="w-full">ویرایش پروفایل</Button>
        </Card>
        
        {/* Tabs */}
        <Tabs defaultValue="history" className="mb-6">
          <TabsList className="w-full grid grid-cols-3 h-auto">
            <TabsTrigger value="history" className="py-2">تاریخچه</TabsTrigger>
            <TabsTrigger value="badges" className="py-2">نشان‌ها</TabsTrigger>
            <TabsTrigger value="rewards" className="py-2">جوایز من</TabsTrigger>
          </TabsList>
          
          <TabsContent value="history" className="mt-4">
            <div className="space-y-4">
              {historyItems.map((item, index) => (
                <HistoryItem key={index} item={item} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="badges" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge, index) => (
                <BadgeCard key={index} badge={badge} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="rewards" className="mt-4">
            <div className="space-y-4">
              {myRewards.map((reward, index) => (
                <RewardItem key={index} reward={reward} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

interface StatItemProps {
  label: string;
  value: string;
  icon: React.ElementType;
}

function StatItem({ label, value, icon: Icon }: StatItemProps) {
  return (
    <div className="text-center">
      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mx-auto mb-1">
        <Icon size={18} className="text-sabzgaam-dark-green" />
      </div>
      <p className="text-lg font-bold">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

interface BadgeProps {
  icon: React.ElementType;
  label: string;
  className?: string;
}

function Badge({ icon: Icon, label, className }: BadgeProps) {
  return (
    <div className={`flex items-center bg-yellow-500 text-white rounded-full px-3 py-1 ${className || ''}`}>
      <Icon size={14} className="text-white ml-1" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

interface HistoryItemProps {
  item: {
    date: string;
    steps: number;
    distance: string;
    coins: number;
  };
}

function HistoryItem({ item }: HistoryItemProps) {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center ml-3">
            <Calendar size={18} className="text-sabzgaam-dark-green" />
          </div>
          <div>
            <p className="font-medium">{item.date}</p>
            <div className="flex items-center text-xs text-gray-500">
              <Footprints size={12} className="ml-1" />
              <span className="ml-2">{item.steps.toLocaleString()} قدم</span>
              <MapPin size={12} className="ml-1" />
              <span>{item.distance}</span>
            </div>
          </div>
        </div>
        <PriceDisplay amount={item.coins * 10000} size="sm" />
      </div>
    </Card>
  );
}

interface BadgeCardProps {
  badge: {
    title: string;
    description: string;
    icon: React.ElementType;
    unlocked: boolean;
  };
}

function BadgeCard({ badge }: BadgeCardProps) {
  return (
    <Card className={`p-4 text-center ${!badge.unlocked ? 'opacity-60' : 'card-hover'}`}>
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2 relative">
        <div className={`w-16 h-16 rounded-full ${badge.unlocked ? 'gradient-bg' : 'bg-gray-200'} flex items-center justify-center`}>
          <badge.icon size={28} className="text-white" />
        </div>
        {badge.unlocked && (
          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
            <BadgeCheck size={14} className="text-white" />
          </div>
        )}
      </div>
      <h3 className="font-bold mb-1">{badge.title}</h3>
      <p className="text-xs text-gray-500">{badge.description}</p>
    </Card>
  );
}

interface RewardItemProps {
  reward: {
    title: string;
    vendor: string;
    discount: string;
    expiry: string;
    code: string;
    used: boolean;
  };
}

function RewardItem({ reward }: RewardItemProps) {
  return (
    <Card className={`p-4 ${reward.used ? 'opacity-60' : 'card-hover'}`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">{reward.title}</h3>
          <p className="text-xs text-gray-500">{reward.vendor}</p>
          <p className="text-sm font-semibold text-sabzgaam-dark-green mt-1">{reward.discount}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center text-xs text-gray-500 mb-1">
            <Clock size={12} className="ml-1" />
            <span>انقضا: {reward.expiry}</span>
          </div>
          <p className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{reward.code}</p>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-gray-100">
        <Button 
          variant={reward.used ? "outline" : "default"} 
          size="sm" 
          className="w-full"
          disabled={reward.used}
        >
          {reward.used ? "استفاده شده" : "نمایش کد QR"}
        </Button>
      </div>
    </Card>
  );
}

const historyItems = [
  {
    date: "امروز",
    steps: 8432,
    distance: "6.7 کیلومتر",
    coins: 80,
  },
  {
    date: "دیروز",
    steps: 12549,
    distance: "10.0 کیلومتر",
    coins: 120,
  },
  {
    date: "دوشنبه، 20 فروردین",
    steps: 9876,
    distance: "7.9 کیلومتر",
    coins: 100,
  },
  {
    date: "یکشنبه، 19 فروردین",
    steps: 3456,
    distance: "2.8 کیلومتر",
    coins: 30,
  },
];

const badges = [
  {
    title: "اولین قدم",
    description: "تکمیل اولین پیاده‌روی",
    icon: Footprints,
    unlocked: true,
  },
  {
    title: "محیط‌زیست‌دوست",
    description: "صرفه‌جویی 10 کیلوگرم CO₂",
    icon: Leaf,
    unlocked: true,
  },
  {
    title: "دانشجو",
    description: "پیاده‌روی در 5 منطقه مختلف",
    icon: MapPin,
    unlocked: true,
  },
  {
    title: "ماراتن",
    description: "پیاده‌روی 42.2 کیلومتر در یک هفته",
    icon: Award,
    unlocked: false,
  },
];

const myRewards = [
  {
    title: "تخفیف قهوه",
    vendor: "کافه تهران",
    discount: "15% تخفیف",
    expiry: "29 فروردین 1404",
    code: "WC-45FG9H2J",
    used: false,
  },
  {
    title: "بلیط اتوبوس",
    vendor: "مترو تهران",
    discount: "بلیط رایگان",
    expiry: "26 فروردین 1404",
    code: "WC-A73BC9D2",
    used: true,
  },
];
