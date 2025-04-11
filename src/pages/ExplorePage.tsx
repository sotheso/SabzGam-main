import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation, Search, Users, Award, Clock } from "lucide-react";

export default function ExplorePage() {
  return (
    <Layout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">کاوش</h1>
          <Button variant="outline" size="icon">
            <Navigation size={18} />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="جستجوی مکان‌ها..."
            className="pl-10"
          />
        </div>
        
        {/* Map */}
        <div className="w-full h-48 rounded-xl mb-6 relative overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d207371.97156509518!2d51.21437267265627!3d35.697389799999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00491ff3dcd9%3A0xf0b3697c567024bc!2sTehran%2C%20Tehran%20Province%2C%20Iran!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="absolute bottom-4 right-4">
            <Button size="sm" className="gradient-bg">
              <MapPin size={16} className="ml-1" />
              مکان‌های نزدیک
            </Button>
          </div>
        </div>
        
        {/* Popular Routes */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">مسیرهای محبوب</h2>
          <div className="space-y-4">
            {popularRoutes.map((route, index) => (
              <RouteCard key={index} route={route} />
            ))}
          </div>
        </div>
        
        {/* Walking Events */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">رویدادهای آینده</h2>
          <div className="space-y-4">
            {events.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

interface RouteProps {
  route: {
    name: string;
    distance: string;
    time: string;
    popularity: number;
    coins: number;
  };
}

function RouteCard({ route }: RouteProps) {
  return (
    <Card className="p-4 card-hover">
      <div className="flex justify-between items-start gap-8">
        <div className="space-y-3">
          <h3 className="font-bold text-lg">{route.name}</h3>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <MapPin size={14} className="ml-2" />
              <span>{route.distance}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock size={14} className="ml-2" />
              <span>{route.time}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Users size={14} className="ml-2" />
              <span>{route.popularity}+ پیاده‌رو</span>
            </div>
          </div>
        </div>
        <div className="text-right shrink-0">
          <span className="text-xs text-gray-500 block mb-2">دریافت</span>
          <div className="font-bold text-amber-500 text-xl">{route.coins} سکه</div>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
        <Button variant="outline" size="sm">
          مشاهده جزئیات
        </Button>
        <Button size="sm">
          شروع مسیر
        </Button>
      </div>
    </Card>
  );
}

interface EventProps {
  event: {
    title: string;
    date: string;
    location: string;
    participants: number;
    coins: number;
  };
}

function EventCard({ event }: EventProps) {
  return (
    <Card className="p-4 card-hover">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold">{event.title}</h3>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <Clock size={12} className="ml-1" />
            <span className="ml-2">{event.date}</span>
            <MapPin size={12} className="ml-1" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500 mt-1">
            <Users size={12} className="ml-1" />
            <span>{event.participants} شرکت‌کننده</span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-500">جایزه</span>
          <div className="flex items-center">
            <span className="font-bold text-amber-500 ml-1">{event.coins} سکه</span>
            <Award size={16} className="text-amber-500" />
          </div>
        </div>
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100">
        <Button className="w-full">
          پیوستن به رویداد
        </Button>
      </div>
    </Card>
  );
}

const popularRoutes = [
  {
    name: "پیاده‌روی خیابان ولیعصر",
    distance: "۳.۲ کیلومتر",
    time: "۴۰-۴۵ دقیقه",
    popularity: 234,
    coins: 3,
  },
  {
    name: "گشت بازار تهران",
    distance: "۲.۵ کیلومتر",
    time: "۳۰-۳۵ دقیقه",
    popularity: 189,
    coins: 2,
  },
  {
    name: "دور پارک ملت",
    distance: "۴.۱ کیلومتر",
    time: "۵۰-۵۵ دقیقه",
    popularity: 156,
    coins: 4,
  },
];

const events = [
  {
    title: "پیاده‌روی روز جهانی بدون خودرو",
    date: "۲ اردیبهشت ۱۴۰۴ • ۱۰:۰۰ صبح",
    location: "پارک طالقانی",
    participants: 157,
    coins: 25,
  },
  {
    title: "پیاده‌روی تاریخی تهران",
    date: "۸ اردیبهشت ۱۴۰۴ • ۴:۰۰ عصر",
    location: "موزه ملی",
    participants: 87,
    coins: 15,
  },
];
