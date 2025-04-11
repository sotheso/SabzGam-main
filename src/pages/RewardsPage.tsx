import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { PriceDisplay } from "@/components/ui/PriceDisplay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Coffee, ShoppingBag, Bus, Ticket, Theater } from "lucide-react";
import { toast } from "sonner";

export default function RewardsPage() {
  const [coins] = useState(125000);
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
          <TabsList className="w-full grid grid-cols-4 h-auto">
            <TabsTrigger value="all" className="py-2">همه</TabsTrigger>
            <TabsTrigger value="food" className="py-2">غذا</TabsTrigger>
            <TabsTrigger value="retail" className="py-2">خرید</TabsTrigger>
            <TabsTrigger value="transport" className="py-2">حمل و نقل</TabsTrigger>
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
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center card-hover">
      <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white ml-3">
        <reward.icon size={20} />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center">
          <h3 className="font-medium">{reward.title}</h3>
          <Badge variant="outline" className="mr-2 text-xs">{reward.category}</Badge>
        </div>
        <p className="text-xs text-gray-500">{reward.vendor}</p>
        <p className="text-sm font-semibold text-walkcoin-green">{reward.discount}</p>
      </div>
      
      <div className="mr-auto flex flex-col items-end">
        <PriceDisplay amount={reward.cost} size="sm" />
        <Button 
          variant={canAfford ? "default" : "outline"} 
          size="sm" 
          className="mt-2" 
          onClick={handleRedeem}
          disabled={!canAfford}
        >
          دریافت
        </Button>
      </div>
    </div>
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
          <div className="w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white ml-3">
            <reward.icon size={20} />
          </div>
          <div>
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

const rewards = [
  {
    id: 1,
    title: "تخفیف قهوه",
    description: "تخفیف برای خرید قهوه بعدی شما",
    vendor: "کافه تهران",
    category: "food",
    cost: 200000,
    discount: "۱۵٪ تخفیف",
    icon: Coffee,
  },
  {
    id: 2,
    title: "شیرینی رایگان",
    description: "یک شیرینی رایگان با هر خرید",
    vendor: "کافه تهران",
    category: "food",
    cost: 300000,
    discount: "آیتم رایگان",
    icon: Coffee,
  },
  {
    id: 3,
    title: "تخفیف خرید",
    description: "تخفیف برای خرید بعدی شما",
    vendor: "بازار تهران",
    category: "retail",
    cost: 500000,
    discount: "۱۰٪ تخفیف",
    icon: ShoppingBag,
  },
  {
    id: 4,
    title: "بلیط اتوبوس",
    description: "یک بلیط اتوبوس رایگان",
    vendor: "مترو تهران",
    category: "transport",
    cost: 150000,
    discount: "بلیط رایگان",
    icon: Bus,
  },
  {
    id: 5,
    title: "تخفیف بلیط سینما",
    description: "تخفیف برای بلیط سینما",
    vendor: "سینما تهران",
    category: "entertainment",
    cost: 400000,
    discount: "۲۰٪ تخفیف",
    icon: Ticket,
  },
  {
    id: 6,
    title: "بلیط تئاتر",
    description: "تخفیف برای بلیط تئاتر",
    vendor: "تئاتر تهران",
    category: "entertainment",
    cost: 600000,
    discount: "۲۵٪ تخفیف",
    icon: Theater,
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
