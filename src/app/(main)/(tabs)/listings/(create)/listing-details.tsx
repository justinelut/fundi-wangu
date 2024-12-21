import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Info } from 'lucide-react-native';
import { cn } from '@/lib/cn';
import { Picker } from '@react-native-picker/picker';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


// Define the Zod schema for validation
const listingSchema = z.object({
  title: z.string().min(3, 'Service title must be at least 3 characters long'),
  category: z.string().nonempty('Category is required'),
});

type ListingFormType = z.infer<typeof listingSchema>;

const categories = [
  'Plumbing',
  'Electrician',
  'Graphic Design',
  'Cleaning',
  'Carpentry',
  'Photography',
];

const ListingCreationScreen: React.FC = () => {
  const [category, setCategory] = useState('');

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ListingFormType>({
    criteriaMode: 'all',
    shouldFocusError: true,
    mode: 'onChange',
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: '',
      category: '',
    },
  });

  useEffect(() => {
    console.log('Errors:', errors); // Logs errors whenever they change
  }, [errors]);

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
  };

  return (
    <SafeAreaView className="h-full bg-background">
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 px-4 py-10 pt-20">
        {/* Header */}
        <View className="mb-6">
          <Text className="mb-2 text-3xl font-bold text-foreground">Create Your Listing</Text>
          <Text className="mb-4 text-secondary-foreground">
            Please provide the title and category for your service.
          </Text>
        </View>

        {/* Service Title Input */}
        <View className="mb-6">
          <Input
            label="Service Title"
            name="title" // Match the schema field name
            control={control}
            placeholder="Enter the service title"
            error={errors.title?.message} // Display error for the correct field
            leftIcon={<Info size={20} color="#FF6B35" />}
          />
        </View>

        {/* Category Selection */}
        <View className="mb-6">
          <Text className="mb-2 text-lg font-medium text-foreground">Category</Text>
          <View className="rounded-lg border border-gray-300 bg-white">
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => {
                setCategory(itemValue);
                setValue('category', itemValue, { shouldValidate: true });
              }}
              className="px-4 py-3">
              <Picker.Item label="Select Category" value="" />
              {categories.map((cat, index) => (
                <Picker.Item key={index} label={cat} value={cat} />
              ))}
            </Picker>
          </View>
          {errors.category && (
            <Text className="mt-1 text-xs text-red-500">{errors.category.message}</Text>
          )}
        </View>

        {/* Next Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className={cn('mt-6 rounded-full bg-primary px-6 py-5')}>
          <Text className="text-center font-semibold text-white">Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListingCreationScreen;
