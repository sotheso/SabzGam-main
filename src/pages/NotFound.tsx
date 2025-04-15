import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "خطای ۴۰۴: کاربر تلاش کرد به مسیر غیرموجود دسترسی پیدا کند:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">۴۰۴</h1>
          <p className="text-xl text-gray-600 mb-4">اوه! صفحه مورد نظر پیدا نشد</p>
          <a href="/" className="text-sabzgaam-dark-green hover:text-sabzgaam-dark-blue underline">
            بازگشت به خانه
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
