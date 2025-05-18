import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { CoinDisplay } from "@/components/ui/CoinDisplay";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { InfoCard } from "@/components/ui/InfoCard";
import { Button } from "@/components/ui/button";
import { CircleDollarSign, MapPin, Leaf, Footprints, Timer, Bus, Train, Bike } from "lucide-react";

export default function HomePage() {
  const [steps, setSteps] = useState(0);
  const [dailyGoal] = useState(10000);
  const [coins, setCoins] = useState(125);
  const [isWalking, setIsWalking] = useState(false);
  const [walkInterval, setWalkInterval] = useState<NodeJS.Timeout | null>(null);
  const [walkingTime, setWalkingTime] = useState(0);
  const [publicTransportTime, setPublicTransportTime] = useState(0);
  
  const toggleWalking = () => {
    if (isWalking) {
      if (walkInterval) clearInterval(walkInterval);
      setIsWalking(false);
    } else {
      const interval = setInterval(() => {
        setSteps(prev => {
          const newSteps = prev + Math.floor(Math.random() * 20) + 10;
          if (Math.floor(newSteps / 1000) > Math.floor(prev / 1000)) {
            setCoins(c => c + 2);
          }
          return newSteps;
        });
        setWalkingTime(prev => prev + 1);
      }, 1000);
      setWalkInterval(interval);
      setIsWalking(true);
    }
  };
  
  useEffect(() => {
    return () => {
      if (walkInterval) clearInterval(walkInterval);
    };
  }, [walkInterval]);
  
  const progressPercentage = Math.min(Math.round((steps / dailyGoal) * 100), 100);
  const distanceKm = (steps * 0.8 / 1000).toFixed(2);
  const co2Saved = (parseFloat(distanceKm) * 271).toFixed(0);

  const formatWalkingTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours} ساعت و ${minutes} دقیقه`;
  };

  return (
    <Layout>
      <div className="gradient-bg text-white p-6 pt-10 pb-16 rounded-b-3xl shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">سبزگام</h1>
          <CoinDisplay amount={coins} animate={isWalking} />
        </div>
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold mb-1">هدف روزانه پیاده‌روی</h2>
          <p className="text-white/70">۱۰,۰۰۰ قدم در روز</p>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold">{steps.toLocaleString('fa-IR')}</h2>
            <p className="text-white/70">از {dailyGoal.toLocaleString('fa-IR')} قدم</p>
          </div>
          <Button 
            onClick={toggleWalking}
            className={`${isWalking ? 'bg-red-500 hover:bg-red-600' : 'bg-white text-green-600 hover:bg-gray-100'}`}
          >
            {isWalking ? 'توقف پیاده‌روی' : 'شروع پیاده‌روی'}
          </Button>
        </div>
      </div>
      
      <div className="flex justify-center -mt-10 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow-md mr-12">
          <ProgressRing progress={progressPercentage} size={120}>
            <div className="text-center">
              <p className="text-3xl font-bold">{progressPercentage.toLocaleString('fa-IR')}%</p>
              <p className="text-xs text-gray-500">پیشرفت پیاده‌روی</p>
            </div>
          </ProgressRing>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <ProgressRing progress={Math.min((walkingTime / 3600) * 100, 100)} size={120}>
            <div className="text-center">
              <p className="text-3xl font-bold">{formatWalkingTime(walkingTime)}</p>
              <p className="text-xs text-gray-500">زمان پیاده‌روی</p>
            </div>
          </ProgressRing>
        </div>
      </div>
      
      <div className="px-4 grid grid-cols-2 gap-4 mb-6">
        <InfoCard 
          title="مسافت طی شده" 
          value={`${parseFloat(distanceKm).toLocaleString('fa-IR')} کیلومتر`}
          icon={<MapPin size={18} />}
        />
        <InfoCard 
          title="CO₂ صرفه‌جویی شده" 
          value={`${parseInt(co2Saved).toLocaleString('fa-IR')} گرم`}
          icon={<Leaf size={18} />}
        />
        <InfoCard 
          title="سکه‌های امروز" 
          value={isWalking ? `+${Math.floor(steps / 1000 * 2).toLocaleString('fa-IR')}` : "۰"}
          icon={<CircleDollarSign size={18} />}
        />
        <InfoCard 
          title="زمان پیاده‌روی" 
          value={formatWalkingTime(walkingTime)}
          icon={<Timer size={18} />}
        />
      </div>

      {/* حمل و نقل عمومی */}
      <div className="px-4 mb-8">
        <h2 className="text-xl font-bold mb-3">حمل و نقل عمومی</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 flex items-center border-b border-gray-100 bg-green-50">
              <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white mr-3">
                <Train size={16} />
              </div>
              <div className="flex-1">
                <p className="font-medium">استفاده از مترو</p>
                <p className="text-xs text-gray-500">امروز، ۹:۱۵ صبح</p>
                <p className="text-xs text-green-600 mt-1">صرفه‌جویی ۴۵ دقیقه‌ای در زمان سفر</p>
              </div>
              <div className="ml-auto">
                <CoinDisplay amount={25} size="sm" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 flex items-center border-b border-gray-100 bg-green-50">
              <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white mr-3">
                <Bus size={16} />
              </div>
              <div className="flex-1">
                <p className="font-medium">استفاده از اتوبوس BRT</p>
                <p className="text-xs text-gray-500">دیروز، ۸:۳۰ صبح</p>
                <p className="text-xs text-green-600 mt-1">کاهش ۲ کیلوگرم CO₂</p>
              </div>
              <div className="ml-auto">
                <CoinDisplay amount={20} size="sm" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 flex items-center border-b border-gray-100 bg-green-50">
              <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white mr-3">
                <Bike size={16} />
              </div>
              <div className="flex-1">
                <p className="font-medium">استفاده از دوچرخه‌های اشتراکی</p>
                <p className="text-xs text-gray-500">دیروز، ۵:۴۵ عصر</p>
                <p className="text-xs text-green-600 mt-1">سفر ۳ کیلومتری با دوچرخه</p>
              </div>
              <div className="ml-auto">
                <CoinDisplay amount={30} size="sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* فعالیت‌های اخیر */}
      <div className="px-4 mb-8">
        <h2 className="text-xl font-bold mb-3">فعالیت‌های اخیر</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {activityItems.map((item, index) => (
            <div 
              key={index}
              className="p-4 flex items-center border-b border-gray-100 last:border-b-0"
            >
              <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white mr-3">
                <item.icon size={16} />
              </div>
              <div>
                <p className="font-medium">{item.description}</p>
                <p className="text-xs text-gray-500">{item.time}</p>
              </div>
              {item.coins && (
                <div className="ml-auto">
                  <CoinDisplay amount={item.coins} size="sm" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

const activityItems = [
  {
    icon: Footprints,
    description: "تکمیل ۱۰,۰۰۰ قدم",
    time: "امروز، ۱۰:۲۳ صبح",
    coins: 20,
  },
  {
    icon: Timer,
    description: "پیاده‌روی به مدت ۱ ساعت",
    time: "دیروز، ۶:۱۲ عصر",
    coins: 15,
  },
  {
    icon: MapPin,
    description: "پیاده‌روی در خیابان ولیعصر",
    time: "دیروز، ۴:۳۰ عصر",
    coins: 10,
  },
  {
    icon: Leaf,
    description: "صرفه‌جویی ۱ کیلوگرم CO₂",
    time: "۲ روز پیش",
    coins: 5,
  },
];
