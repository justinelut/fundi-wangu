import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

type ReusableBottomSheetProps = {
  title?: string;
  children: React.ReactNode;
};

const ReusableBottomSheet = React.forwardRef<BottomSheet, ReusableBottomSheetProps>(
  ({ title, children }, ref) => {
    // Snap points for the bottom sheet (adjust as needed)
    const snapPoints = ['25%', '50%', '90%'];

    return (
      <BottomSheet
        ref={ref}
        index={-1} // Initial state (hidden)
        snapPoints={snapPoints}
        enablePanDownToClose
        backgroundStyle={{ backgroundColor: '#ffffff' }}
        handleIndicatorStyle={{ backgroundColor: '#cccccc' }}
      >
        <View style={{ padding: 16 }}>
          {/* Optional Title */}
          {title && <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>{title}</Text>}
          {/* Content */}
          {children}
        </View>
      </BottomSheet>
    );
  }
);

export default ReusableBottomSheet;
