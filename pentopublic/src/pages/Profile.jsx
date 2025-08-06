import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { getSubscriptionStatus } from "@/services/api";
import { User, Calendar, CreditCard, Shield, Star, Crown, CheckCircle, XCircle, Sparkles } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const res = await getSubscriptionStatus(user?.userId);
        setSubscription(res);
      } catch (error) {
        console.error("Error fetching subscription:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "reader") fetchSubscription();
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-400/10 to-pink-400/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="relative inline-flex items-center justify-center w-28 h-28 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full mb-6 shadow-2xl ring-4 ring-white/20 ring-offset-4 ring-offset-transparent">
            <User className="w-14 h-14 text-white drop-shadow-sm" />
            <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white/30">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            {/* Floating particles effect */}
            <div className="absolute inset-0 rounded-full">
              <div className="absolute top-2 left-4 w-1 h-1 bg-white/40 rounded-full animate-ping"></div>
              <div className="absolute bottom-3 right-3 w-1.5 h-1.5 bg-white/30 rounded-full animate-ping animation-delay-300"></div>
              <div className="absolute top-1/2 left-1 w-1 h-1 bg-white/50 rounded-full animate-ping animation-delay-700"></div>
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-3 drop-shadow-sm">
            Welcome Back
          </h1>
          <p className="text-gray-600 text-xl font-medium">Manage your profile and subscription details</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Main Profile Card */}
        <Card className="backdrop-blur-xl bg-white/90 border-0 shadow-2xl ring-1 ring-black/5 mb-8 overflow-hidden relative group hover:shadow-3xl transition-all duration-500">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Header with enhanced styling */}
          <CardHeader className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white pb-10 overflow-hidden">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:20px_20px] animate-pulse"></div>
            </div>
            
            <div className="flex items-center gap-6 relative z-10">
              <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm ring-2 ring-white/30 group-hover:scale-105 transition-transform duration-300">
                <User className="w-10 h-10 text-white drop-shadow-md" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold mb-2 drop-shadow-sm">Reader Profile</CardTitle>
                <p className="text-blue-100 text-lg font-medium">Your account information and settings</p>
              </div>
            </div>
            
            {/* Enhanced bottom border */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/40 via-white/60 to-white/40"></div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-white/20 rounded-t-full blur-sm"></div>
          </CardHeader>
          
          <CardContent className="relative p-10 space-y-10">
            {/* Username Section */}
            <div className="group/item hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 p-6 rounded-2xl transition-all duration-500 border border-transparent hover:border-blue-200/50 hover:shadow-lg">
              <div className="flex items-center gap-6 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg group-hover/item:scale-110 group-hover/item:rotate-3 transition-all duration-300">
                  <User className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Username</span>
              </div>
              <span className="text-3xl font-bold text-gray-900 ml-18 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {user?.userName}
              </span>
            </div>

            {/* Role Section */}
            <div className="group/item hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-teal-50/50 p-6 rounded-2xl transition-all duration-500 border border-transparent hover:border-emerald-200/50 hover:shadow-lg">
              <div className="flex items-center gap-6 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover/item:scale-110 group-hover/item:-rotate-3 transition-all duration-300">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Account Role</span>
              </div>
              <div className="ml-18">
                <Badge 
                  variant="outline" 
                  className="px-6 py-3 text-base font-bold capitalize bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 text-emerald-700 hover:shadow-xl hover:scale-105 transition-all duration-300 rounded-xl"
                >
                  <Crown className="w-5 h-5 mr-3" />
                  {user?.role}
                </Badge>
              </div>
            </div>

            {/* Subscription Section */}
            {user?.role === "reader" && !loading && (
              <div className="group/item hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-slate-50/50 p-6 rounded-2xl transition-all duration-500 border border-transparent hover:border-gray-200/50 hover:shadow-lg">
                <div className="flex items-center gap-6 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover/item:scale-110 transition-all duration-300 ${
                    subscription?.isSubscribed 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 group-hover/item:rotate-12' 
                      : 'bg-gradient-to-r from-red-500 to-rose-500 group-hover/item:-rotate-12'
                  }`}>
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Subscription Status</span>
                </div>
                
                <div className="ml-18 space-y-6">
                  <Badge
                    variant={subscription?.isSubscribed ? "default" : "destructive"}
                    className={`px-6 py-3 text-base font-bold transition-all duration-300 hover:shadow-xl hover:scale-105 rounded-xl ${
                      subscription?.isSubscribed
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600'
                        : 'bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600'
                    }`}
                  >
                    {subscription?.isSubscribed ? (
                      <CheckCircle className="w-5 h-5 mr-3" />
                    ) : (
                      <XCircle className="w-5 h-5 mr-3" />
                    )}
                    {subscription?.isSubscribed ? "Active Subscription" : "Not Subscribed"}
                  </Badge>

                  {subscription?.isSubscribed && (
                    <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border-2 border-green-200 rounded-2xl p-8 space-y-6 shadow-lg hover:shadow-xl transition-all duration-300">
                      <div className="flex items-center gap-4 p-4 bg-white/60 rounded-xl backdrop-blur-sm">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-green-800 mb-1 uppercase tracking-wide">Valid Until</p>
                          <p className="text-xl font-bold text-green-900">
                            {subscription.endDate || "N/A"}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-4 bg-white/60 rounded-xl backdrop-blur-sm">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-green-800 mb-1 uppercase tracking-wide">Payment Method</p>
                          <p className="text-xl font-bold text-green-900 capitalize">
                            {subscription.paymentMode}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Loading State */}
            {user?.role === "reader" && loading && (
              <div className="group/item hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-slate-50/50 p-6 rounded-2xl transition-all duration-500 border border-transparent hover:border-gray-200/50">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Loading Subscription...</span>
                </div>
                <div className="ml-18 space-y-4">
                  <div className="w-48 h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse"></div>
                  <div className="w-32 h-6 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Enhanced Footer */}
        <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
          <p className="text-gray-600 text-base">
            Need help? 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-semibold cursor-pointer hover:underline ml-2 transition-all duration-300 hover:scale-105 inline-block">
              Contact Support
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;