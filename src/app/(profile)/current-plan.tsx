import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { ChevronLeft, Check, Lock, HelpCircle, RefreshCw } from 'lucide-react-native';
import { cn } from '@/lib/cn';

interface PlanFeature {
  name: string;
  included: boolean;
  highlighted?: boolean;
}

interface Plan {
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
}

const currentPlan: Plan = {
  name: 'Professional',
  monthlyPrice: 1200,
  yearlyPrice: 12000,
  description: 'Perfect for growing businesses with multiple services and a need for higher visibility.',
  features: [
    { name: '20 Service Listings', included: true, highlighted: true },
    { name: 'Priority Support (Email and Chat)', included: true, highlighted: true },
    { name: 'Advanced Analytics', included: true, highlighted: true },
    { name: 'Featured Listings (1 Week/Month)', included: true },
    { name: 'Unlimited Search Visibility', included: true },
    { name: 'Service Variants', included: true },
    { name: 'Access to Promotions & Discounts', included: true },
    { name: 'Multiple Admins', included: false },
  ],
};

const SubscriptionPage: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4">
        {/* Banner */}
        <Animated.View entering={FadeInDown.duration(500)} className="mb-6 bg-primary p-4 rounded-xl">
          <Text className="text-white font-semibold text-lg">Your Subscription Status</Text>
          <Text className="text-white mt-2">
            You are currently subscribed to the <Text className="font-bold">{currentPlan.name}</Text> plan.
          </Text>
        </Animated.View>

        {/* Back Button & Help Icon */}
        <View className="flex-row items-center justify-between mb-4">
          <TouchableOpacity className="p-2">
            <ChevronLeft size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity className="p-2">
            <HelpCircle size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Current Plan Details */}
        <Animated.View entering={FadeInDown.duration(500)} className="bg-white rounded-3xl p-6 mb-6 shadow-lg">
          <Text className="text-2xl font-bold text-foreground mb-2">Current Plan</Text>
          <Text className="text-secondary-foreground mb-4">{currentPlan.description}</Text>
          <View className="flex-row items-baseline mb-4">
            <Text className="text-3xl font-bold text-foreground">KSh {isYearly ? currentPlan.yearlyPrice : currentPlan.monthlyPrice}</Text>
            <Text className="text-secondary-foreground ml-1">/{isYearly ? 'year' : 'month'}</Text>
          </View>
          <View className="flex-row items-center mb-4">
            <Text className="mr-2">Billing:</Text>
            <Text className="text-foreground">{isYearly ? 'Yearly' : 'Monthly'}</Text>
          </View>
          <View className="flex-row items-center mb-4">
            <Text className="mr-2">Next Renewal:</Text>
            <Text className="text-foreground">January 15, 2025</Text> {/* Placeholder, you can dynamically set the date */}
          </View>

          {/* Plan Features */}
          {currentPlan.features.map((feature, index) => (
            <View key={index} className="flex-row items-center mb-2">
              {feature.included ? (
                <Check size={20} color="#22C55E" className="mr-2" />
              ) : (
                <Lock size={20} color="#6B7280" className="mr-2" />
              )}
              <Text className={cn(feature.highlighted ? 'font-semibold' : '', feature.included ? 'text-foreground' : 'text-secondary-foreground')}>
                {feature.name}
              </Text>
            </View>
          ))}
        </Animated.View>

        {/* Upgrade & Renew Buttons */}
        <View className="flex-row justify-between mb-6">
          <TouchableOpacity
            className={cn('py-3 px-6 rounded-full bg-primary w-1/2', currentPlan.name === 'Enterprise' && 'opacity-50')}
            disabled={currentPlan.name === 'Enterprise'}
          >
            <Text className="text-center font-semibold text-white">Upgrade Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-3 px-6 rounded-full bg-secondary w-1/2">
            <Text className="text-center font-semibold text-secondary-foreground">Renew Subscription</Text>
          </TouchableOpacity>
        </View>

        {/* Actions */}
        <View className="flex-row justify-between mb-6">
          <TouchableOpacity className="py-3 px-6 rounded-full bg-neutral-200">
            <Text className="text-center font-semibold text-foreground">Cancel Subscription</Text>
          </TouchableOpacity>
          <TouchableOpacity className="py-3 px-6 rounded-full bg-neutral-200">
            <Text className="text-center font-semibold text-foreground">Manage Payment</Text>
          </TouchableOpacity>
        </View>

        {/* Subscription History / Contact */}
        <Animated.View entering={FadeInDown.delay(800)} className="mb-8">
          <Text className="text-center text-secondary-foreground mb-4">
            View your subscription history or contact our support team for any issues.
          </Text>
          <TouchableOpacity>
            <Text className="text-center text-primary font-semibold">
              View Subscription History
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="mt-2">
            <Text className="text-center text-primary font-semibold">
              Need help? Contact support
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubscriptionPage;
