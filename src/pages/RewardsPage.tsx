import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Coffee, ShoppingBag, Bus, Ticket, Theater, Cake, Film } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";

export default function RewardsPage() {
  const [coins] = useState(6000000);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredRewards = rewards.filter(reward => 
    reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reward.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reward.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">جوایز</h1>
          <PriceDisplay amount={coins} />
        </div>
        
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="جستجوی جوایز..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {/* Category Tabs */}
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="w-full grid grid-cols-4 h-auto bg-amber-100 p-1 rounded-lg">
            <TabsTrigger 
              value="all" 
              className="py-2 data-[state=active]:bg-white data-[state=active]:text-sabzgaam-dark-green data-[state=active]:shadow-sm rounded-md transition-all"
            >
              همه
            </TabsTrigger>
            <TabsTrigger 
              value="transport" 
              className="py-2 data-[state=active]:bg-white data-[state=active]:text-sabzgaam-dark-green data-[state=active]:shadow-sm rounded-md transition-all"
            >
              حمل و نقل
            </TabsTrigger>
            <TabsTrigger 
              value="food" 
              className="py-2 data-[state=active]:bg-white data-[state=active]:text-sabzgaam-dark-green data-[state=active]:shadow-sm rounded-md transition-all"
            >
              غذا
            </TabsTrigger>
            <TabsTrigger 
              value="retail" 
              className="py-2 data-[state=active]:bg-white data-[state=active]:text-sabzgaam-dark-green data-[state=active]:shadow-sm rounded-md transition-all"
            >
              خرید و تفریح
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <RewardsList rewards={filteredRewards} userCoins={coins} />
          </TabsContent>
          
          <TabsContent value="food" className="mt-4">
            <RewardsList 
              rewards={filteredRewards.filter(r => r.category === "food")} 
              userCoins={coins} 
            />
          </TabsContent>
          
          <TabsContent value="retail" className="mt-4">
            <RewardsList 
              rewards={filteredRewards.filter(r => r.category === "retail")} 
              userCoins={coins} 
            />
          </TabsContent>
          
          <TabsContent value="transport" className="mt-4">
            <RewardsList 
              rewards={filteredRewards.filter(r => r.category === "transport")} 
              userCoins={coins} 
            />
          </TabsContent>
        </Tabs>
        
        {/* Featured Rewards */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3">جوایز ویژه</h2>
          <div className="grid grid-cols-1 gap-4">
            {featuredRewards.map((reward, index) => (
              <FeaturedRewardCard 
                key={index} 
                reward={reward} 
                userCoins={coins} 
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

interface Reward {
  id: number;
  title: string;
  description: string;
  vendor: string;
  category: string;
  cost: number;
  discount: string;
  icon: React.ElementType;
}

interface RewardsListProps {
  rewards: Reward[];
  userCoins: number;
}

function RewardsList({ rewards, userCoins }: RewardsListProps) {
  if (rewards.length === 0) {
    return <p className="text-center text-gray-500 my-8">جوایزی یافت نشد</p>;
  }
  
  return (
    <div className="grid grid-cols-1 gap-4">
      {rewards.map((reward) => (
        <RewardCard key={reward.id} reward={reward} userCoins={userCoins} />
      ))}
    </div>
  );
}

interface RewardCardProps {
  reward: Reward;
  userCoins: number;
}

function RewardCard({ reward, userCoins }: RewardCardProps) {
  const canAfford = userCoins >= reward.cost;
  
  const handleRedeem = () => {
    if (canAfford) {
      toast.success(`شما «${reward.title}» را دریافت کردید!`, {
        description: `کد شما: WC-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      });
    } else {
      toast.error("اعتبار ریالی کافی نیست", {
        description: `شما به ${(reward.cost - userCoins).toLocaleString('fa-IR')} ریال بیشتر برای دریافت این جایزه نیاز دارید.`,
      });
    }
  };
  
  return (
    <Card className={`p-4 ${canAfford ? 'card-hover' : 'opacity-60'}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white ml-6">
              <reward.icon size={20} />
            </div>
            <div className="mr-4">
              <h3 className="font-bold">{reward.title}</h3>
              <p className="text-xs text-gray-500">{reward.vendor}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-2">{reward.description}</p>
          <p className="text-sm font-semibold text-sabzgaam-dark-green">{reward.discount}</p>
        </div>
        <div className="text-left">
          <PriceDisplay amount={reward.cost} />
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100">
        <Button 
          className="w-full" 
          disabled={!canAfford}
          variant={canAfford ? "default" : "outline"}
          onClick={handleRedeem}
        >
          دریافت
        </Button>
      </div>
    </Card>
  );
}

function FeaturedRewardCard({ reward, userCoins }: RewardCardProps) {
  const canAfford = userCoins >= reward.cost;
  
  const handleRedeem = () => {
    if (canAfford) {
      toast.success(`شما «${reward.title}» را دریافت کردید!`, {
        description: `کد شما: WC-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      });
    } else {
      toast.error("اعتبار ریالی کافی نیست", {
        description: `شما به ${(reward.cost - userCoins).toLocaleString('fa-IR')} ریال بیشتر برای دریافت این جایزه نیاز دارید.`,
      });
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-sabzgaam-light-blue/20 to-sabzgaam-dark-green/30 rounded-xl p-5 shadow-md border border-gray-100 card-hover">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white ml-6">
            <reward.icon size={20} />
          </div>
          <div className="mr-4">
            <h3 className="font-bold">{reward.title}</h3>
            <p className="text-sm text-gray-600">{reward.vendor}</p>
          </div>
        </div>
        <PriceDisplay amount={reward.cost} size="sm" />
      </div>
      
      <p className="text-sm mb-4">{reward.description}</p>
      <p className="text-lg font-bold text-sabzgaam-dark-green mb-4">{reward.discount}</p>
      
      <Button 
        variant={canAfford ? "default" : "outline"} 
        className="w-full" 
        onClick={handleRedeem}
        disabled={!canAfford}
      >
        {canAfford ? "دریافت جایزه" : `به ${(reward.cost - userCoins).toLocaleString('fa-IR')} ریال بیشتر نیاز دارید`}
      </Button>
    </div>
  );
}

const categories = [
  { id: "food", label: "رستوران" },
  { id: "retail", label: "فروشگاه" },
  { id: "transport", label: "حمل و نقل" },
  { id: "entertainment", label: "تفریحی" },
];

const rewards: Reward[] = [
  {
    id: 1,
    title: "کافه پارک",
    description: "تخفیف ویژه برای انواع نوشیدنی‌های گرم و سرد",
    vendor: "۱.۲ کیلومتر با شما فاصله دارد",
    category: "food",
    cost: 500000,
    discount: "۲۰٪ تخفیف",
    icon: Coffee
  },
  {
    id: 2,
    title: "کافه جزیره",
    description: "تخفیف برای منوی صبحانه و عصرانه",
    vendor: "۲.۱ کیلومتر با شما فاصله دارد",
    category: "food",
    cost: 600000,
    discount: "۱۵٪ تخفیف",
    icon: Coffee
  },
  {
    id: 3,
    title: "مهدکودک شادی",
    description: "تخفیف ویژه برای ثبت‌نام ترم پاییز",
    vendor: "۱.۸ کیلومتر با شما فاصله دارد",
    category: "retail",
    cost: 5000000,
    discount: "۲۵٪ تخفیف",
    icon: Cake
  },
  {
    id: 4,
    title: "رستوران ایرانی",
    description: "تخفیف برای انواع غذاهای ایرانی و فرنگی",
    vendor: "۱.۵ کیلومتر با شما فاصله دارد",
    category: "food",
    cost: 3500000,
    discount: "۳۰٪ تخفیف",
    icon: ShoppingBag
  },
  {
    id: 5,
    title: "کافه قهوه باز",
    description: "یک فنجان قهوه دلخواه",
    vendor: "قهوه",
    category: "food",
    cost: 700000,
    discount: "۱۵٪ تخفیف",
    icon: Coffee,
  },
  {
    id: 6,
    title: "شیرینی گل محمدی",
    description: "یک جعبه شیرینی دانمارکی تازه",
    vendor: "شیرینی دانمارکی",
    category: "food",
    cost: 600000,
    discount: "۲۰٪ تخفیف",
    icon: Cake,
  },
  {
    id: 7,
    title: "تخفیف خرید از پوشاک ایرانی امیر کبیر",
    description: "تخفیف ویژه برای خرید از فروشگاه‌های پوشاک ایرانی امیر کبیر",
    vendor: "۱.۷ کیلومتر با شما فاصله دارد",
    category: "retail",
    cost: 5000000,
    discount: "۲۵٪ تخفیف",
    icon: ShoppingBag,
  },
  {
    id: 8,
    title: "بلیط اتوبوس",
    description: "بلیط رایگان اتوبوس برای یک مسیر دلخواه",
    vendor: "اتوبوسرانی تهران",
    category: "transport",
    cost: 280000,
    discount: "بلیط رایگان اتوبوس",
    icon: Bus,
  },
  {
    id: 9,
    title: "تخفیف بلیط سینما",
    description: "تخفیف برای تماشای فیلم",
    vendor: "سینما تهران",
    category: "entertainment",
    cost: 400000,
    discount: "۲۰٪ تخفیف",
    icon: Film,
  },
  {
    id: 10,
    title: "بلیط تئاتر",
    description: "تخفیف برای نمایش تئاتر",
    vendor: "تئاتر تهران",
    category: "entertainment",
    cost: 450000,
    discount: "۲۵٪ تخفیف",
    icon: Theater,
  },
  {
    id: 21,
    title: "سفر هوشمندانه، با مترو و BRT",
    description: "با استفاده از مترو و BRT، سفرهای خود را هوشمندانه‌تر کنید.",
    vendor: "حمل و نقل عمومی",
    category: "transport",
    cost: 50000,
    discount: "۲۰٪ تخفیف",
    icon: Bus,
  },
  {
    id: 22,
    title: "حمل و نقل عمومی؛ انتخاب شما، آینده تهران",
    description: "با انتخاب حمل و نقل عمومی، به آینده تهران کمک کنید.",
    vendor: "حمل و نقل عمومی",
    category: "transport",
    cost: 60000,
    discount: "۲۵٪ تخفیف",
    icon: Bus,
  },
  {
    id: 23,
    title: "با هر سفر، سهم خود را در هوای پاک تهران داشته باشیم",
    description: "با استفاده از حمل و نقل عمومی، به هوای پاک تهران کمک کنید.",
    vendor: "حمل و نقل عمومی",
    category: "transport",
    cost: 70000,
    discount: "۳۰٪ تخفیف",
    icon: Bus,
  },
  {
    id: 24,
    title: "از ترافیک فرار کن، با اتوبوس و مترو همراه شو!",
    description: "با استفاده از اتوبوس و مترو، از ترافیک فرار کنید.",
    vendor: "حمل و نقل عمومی",
    category: "transport",
    cost: 80000,
    discount: "۳۵٪ تخفیف",
    icon: Bus,
  },
  {
    id: 25,
    title: "شهر بهتر، زندگی بهتر؛ با حمل و نقل عمومی",
    description: "با استفاده از حمل و نقل عمومی، زندگی بهتری داشته باشید.",
    vendor: "حمل و نقل عمومی",
    category: "transport",
    cost: 90000,
    discount: "۴۰٪ تخفیف",
    icon: Bus,
  },
  {
    id: 11,
    title: "پارک آبی اوپال",
    description: "تخفیف ویژه برای بلیط ورودی پارک آبی و استفاده از تمامی امکانات",
    vendor: "۲.۵ کیلومتر با شما فاصله دارد",
    category: "retail",
    cost: 450000,
    discount: "۳۵٪ تخفیف",
    icon: ShoppingBag
  },
  {
    id: 12,
    title: "استخر مجموعه تفریحی شاهین",
    description: "تخفیف برای استفاده از استخر و سونا",
    vendor: "۱.۳ کیلومتر با شما فاصله دارد",
    category: "retail",
    cost: 560000,
    discount: "۲۵٪ تخفیف",
    icon: ShoppingBag
  },
];

const featuredRewards = [
  {
    id: 101,
    title: "ست قهوه ویژه",
    description: "از مجموعه قهوه‌های ویژه ما با یک دوست با تخفیف ویژه برای کاربران اپلیکیشن لذت ببرید!",
    vendor: "کافه تهران پریمیوم",
    category: "food",
    cost: 1000000,
    discount: "یکی بخر، یکی رایگان ببر",
    icon: Coffee,
  },
  {
    id: 102,
    title: "بلیط ماهانه حمل و نقل",
    description: "تخفیف قابل توجه برای بلیط ماهانه حمل و نقل عمومی در تهران",
    vendor: "مترو و اتوبوس تهران",
    category: "transport",
    cost: 2000000,
    discount: "۳۰٪ تخفیف بلیط ماهانه",
    icon: Bus,
  },
];
