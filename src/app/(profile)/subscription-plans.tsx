import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeInRight } from 'react-native-reanimated';
import { ChevronLeft, Check, Star, Lock, HelpCircle } from 'lucide-react-native';// Assuming cn is imported from the utils file
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

const plans: Plan[] = [
  {
    name: 'Basic',
    monthlyPrice: 500,
    yearlyPrice: 5000,
    description: 'Ideal for individuals or small businesses just starting to list their services.',
    features: [
      { name: '5 Service Listings', included: true },
      { name: 'Basic Support (Email)', included: true },
      { name: 'Edit Listings', included: true },
      { name: 'Limited Search Visibility', included: true },
      { name: 'Basic Analytics', included: true },
      { name: 'Featured Listings', included: false },
      { name: 'Service Variants', included: false },
      { name: 'Promotions & Discounts', included: false },
    ],
  },
  {
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
    popular: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: 2500,
    yearlyPrice: 25000,
    description: 'Best suited for larger businesses or agencies with a need for full control and maximum visibility.',
    features: [
      { name: 'Unlimited Service Listings', included: true, highlighted: true },
      { name: '24/7 Dedicated Support', included: true, highlighted: true },
      { name: 'Full Analytics & Reporting', included: true, highlighted: true },
      { name: 'Featured Listings (2 Weeks/Month)', included: true },
      { name: 'Top Priority Search Visibility', included: true },
      { name: 'Multiple Admins', included: true },
      { name: 'Exclusive Promotions & Discounts', included: true },
      { name: 'Priority Listing Placement', included: true },
    ],
  },
];

const PlanCard: React.FC<{ plan: Plan; isYearly: boolean; index: number }> = ({ plan, isYearly, index }) => {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const discount = isYearly ? (plan.name === 'Basic' ? 10 : plan.name === 'Professional' ? 15 : 20) : 0;

  return (
    <Animated.View
      entering={FadeInRight.delay(index * 200)}
      className={cn('bg-white rounded-3xl p-6 mb-6 shadow-lg', plan.popular && 'border-2 border-primary')}
    >
      {plan.popular && (
        <View className="absolute -top-3 right-4 bg-primary px-3 py-1 rounded-full">
          <Text className="text-white font-bold text-xs">Most Popular</Text>
        </View>
      )}
      <Text className="text-2xl font-bold text-foreground mb-2">{plan.name}</Text>
      <Text className="text-secondary-foreground mb-4">{plan.description}</Text>
      <View className="flex-row items-baseline mb-4">
        <Text className="text-3xl font-bold text-foreground">KSh {price.toLocaleString()}</Text>
        <Text className="text-secondary-foreground ml-1">/{isYearly ? 'year' : 'month'}</Text>
      </View>
      {isYearly && (
        <Text className="text-green-600 font-semibold mb-4">{discount}% discount on yearly billing</Text>
      )}
      {plan.features.map((feature, index) => (
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
      <TouchableOpacity
        className={cn('mt-6 py-3 px-6 rounded-full', plan.popular ? 'bg-primary' : 'bg-secondary')}
      >
        <Text className={cn('text-center font-semibold', plan.popular ? 'text-white' : 'text-secondary-foreground')}>
          Subscribe Now
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const SubscriptionPlansScreen: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1 px-4">
        <Animated.View entering={FadeInDown.duration(500)} className="mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <TouchableOpacity className="p-2">
              <ChevronLeft size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2">
              <HelpCircle size={24} color="#000" />
            </TouchableOpacity>
          </View>
          <Text className="text-3xl font-bold text-foreground mb-2">Choose Your Plan</Text>
          <Text className="text-secondary-foreground mb-4">
            Select the plan that fits your needs. Get your services listed and start reaching more customers today!
          </Text>
          <View className="flex-row items-center justify-center mb-6">
            <Text className={cn('mr-2', !isYearly ? 'font-semibold' : '')}>Monthly</Text>
            <Switch
              value={isYearly}
              onValueChange={setIsYearly}
              trackColor={{ false: '#767577', true: '#FF6B35' }}
              thumbColor={isYearly ? '#f4f3f4' : '#f4f3f4'}
            />
            <Text className={cn('ml-2', isYearly ? 'font-semibold' : '')}>Yearly</Text>
          </View>
        </Animated.View>
        
        {plans.map((plan, index) => (
          <PlanCard key={plan.name} plan={plan} isYearly={isYearly} index={index} />
        ))}

        <Animated.View entering={FadeInDown.delay(800)} className="mb-8">
          <Text className="text-center text-secondary-foreground mb-4">
            Gain more visibility, attract customers, and grow your business!
          </Text>
          <TouchableOpacity>
            <Text className="text-center text-primary font-semibold">
              Need help? Contact support
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubscriptionPlansScreen;
