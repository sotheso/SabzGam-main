import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { CoinDisplay } from "@/components/ui/CoinDisplay";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { InfoCard } from "@/components/ui/InfoCard";
import { Button } from "@/components/ui/button";
import { CircleDollarSign, MapPin, Leaf, Footprints } from "lucide-react";

export default function HomePage() {
  const [steps, setSteps] = useState(0);
  const [dailyGoal] = useState(10000);
  const [coins, setCoins] = useState(125);
  const [isWalking, setIsWalking] = useState(false);
  const [walkInterval, setWalkInterval] = useState<NodeJS.Timeout | null>(null);
  
  // Simulate walking
  const toggleWalking = () => {
    if (isWalking) {
      if (walkInterval) clearInterval(walkInterval);
      setIsWalking(false);
    } else {
      const interval = setInterval(() => {
        setSteps(prev => {
          const newSteps = prev + Math.floor(Math.random() * 20) + 10;
          // Add coins for every 1000 steps
          if (Math.floor(newSteps / 1000) > Math.floor(prev / 1000)) {
            setCoins(c => c + 1);
          }
          return newSteps;
        });
      }, 1000);
      setWalkInterval(interval);
      setIsWalking(true);
    }
  };
  
  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (walkInterval) clearInterval(walkInterval);
    };
  }, [walkInterval]);
  
  const progressPercentage = Math.min(Math.round((steps / dailyGoal) * 100), 100);
  
  // Calculate distance walked (approx. 0.8m per step)
  const distanceKm = (steps * 0.8 / 1000).toFixed(2);
  
  // Calculate CO2 saved (approx. 271g per km not driven)
  const co2Saved = (parseFloat(distanceKm) * 271).toFixed(0);

  return (
    <Layout>
      {/* Header */}
      <div className="gradient-bg text-white p-6 pt-10 pb-16 rounded-b-3xl shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <CoinDisplay amount={125} size="sm" />
          </div>
          <h1 className="text-2xl font-bold">سبزگام</h1>
        </div>
        <p className="text-white/80">پیشرفت امروز</p>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-4xl font-bold">۰</h2>
            <p className="text-white/70">از ۱۰,۰۰۰ قدم</p>
          </div>
          <Button 
            onClick={toggleWalking}
            className="bg-white text-green-600 hover:bg-gray-100"
          >
            شروع پیاده‌روی
          </Button>
        </div>
      </div>
      
      {/* Progress Ring */}
      <div className="flex justify-center -mt-10 mb-6">
        <div className="bg-white p-4 rounded-2xl shadow-md">
          <ProgressRing progress={0} size={120}>
            <div className="text-center">
              <p className="text-3xl font-bold">۰%</p>
              <p className="text-xs text-gray-500">هدف روزانه</p>
            </div>
          </ProgressRing>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="px-4 grid grid-cols-2 gap-4 mb-6">
        <InfoCard 
          title="مسافت" 
          value="۰ کیلومتر"
          icon={<MapPin size={18} />}
        />
        <InfoCard 
          title="CO₂ صرفه‌جویی شده" 
          value="۰ گرم"
          icon={<Leaf size={18} />}
        />
        <InfoCard 
          title="سکه‌های امروز" 
          value="۰"
          icon={<CircleDollarSign size={18} />}
        />
        <InfoCard 
          title="سرعت متوسط قدم" 
          value="۰/دقیقه"
          icon={<Footprints size={18} />}
        />
      </div>
      
      {/* Recent Activity */}
      <div className="px-4 mb-8">
        <h2 className="text-xl font-bold mb-3">فعالیت‌های اخیر</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 flex items-center border-b border-gray-100">
            <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center text-white mr-3">
              <CircleDollarSign size={16} />
            </div>
            <div>
              <p className="font-medium">دریافت جایزه سبزگام</p>
              <p className="text-xs text-gray-500">امروز، ۱۰:۲۳ صبح</p>
            </div>
            <div className="ml-auto">
              <CoinDisplay amount={5} size="sm" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const activityItems = [
  {
    icon: CircleDollarSign,
    description: "دریافت جایزه سبزگام",
    time: "امروز، ۱۰:۲۳ صبح",
    coins: 5,
  },
  {
    icon: Footprints,
    description: "تکمیل ۱۰,۰۰۰ قدم",
    time: "دیروز، ۶:۱۲ عصر",
    coins: 10,
  },
  {
    icon: MapPin,
    description: "پیاده‌روی در خیابان ولیعصر",
    time: "دیروز، ۴:۳۰ عصر",
  },
  {
    icon: Leaf,
    description: "صرفه‌جویی ۱ کیلوگرم CO₂",
    time: "۲ روز پیش",
  },
];
