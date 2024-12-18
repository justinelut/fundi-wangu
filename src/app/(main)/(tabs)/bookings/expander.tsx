import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Text, View, ExpandableSection, SegmentedControl, Colors, Icon } from 'react-native-ui-lib';

const chevronDown = require('@/assets/icon.png');
const chevronUp = require('@/assets/icon.png');
const infoIcon = require('@/assets/icon.png');
const DEFAULT = undefined;
const PARTIALLY_EXPANDED_HEIGHT = 100;
const FULLY_EXPANDED_HEIGHT = 300;

const ExpandableSectionScreen: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [minHeight, setMinHeight] = useState(DEFAULT);

  const getChevron = (expanded: boolean) => (expanded ? chevronUp : chevronDown);

  const renderReadMoreHeader = () => (
    <View marginH-page marginT-10 row>
      <Text text80 marginL-40 marginR-5 $textPrimary>
        Read More
      </Text>
      <Icon style={styles.icon} source={getChevron(expanded)} tintColor={Colors.$iconPrimary} />
    </View>
  );

  const renderHeader = (
    text: string,
    expanded: boolean,
    { disabled, showInfo }: { disabled?: boolean; showInfo?: boolean } = {}
  ) => (
    <View marginH-page marginV-20 spread row>
      <View row>
        {showInfo && (
          <Icon
            source={infoIcon}
            marginR-10
            tintColor={disabled ? Colors.grey40 : undefined}
          />
        )}
        <Text text60 marginL-4 grey40={disabled}>
          {text}
        </Text>
      </View>
      <Icon
        style={styles.icon}
        source={getChevron(expanded)}
        tintColor={disabled ? Colors.grey40 : undefined}
      />
    </View>
  );

  const renderContent = () => (
    <View marginH-60>
      <Text text80>
        If you have any questions, comments, or concerns, please don&apos;t hesitate to get in touch with us. You can
        easily reach out to us through our contact form on our website.
      </Text>
      <Text text80>
        Alternatively, you can reach us via email at help@help.com, where our team is ready to assist you promptly. If
        you prefer speaking with someone directly, feel free to give us a call at 1-833-350-1066.
      </Text>
    </View>
  );

  const renderOptions = () => (
    <View marginH-page>
      <Text text70BO marginB-8>
        Minimum Height
      </Text>
      <Text text80 marginB-16>
        The expandable section can be either fully collapsed, partially expanded to reveal some of the items, or fully
        expanded by default.
      </Text>
      <SegmentedControl
        activeColor={Colors.$textDefaultLight}
        activeBackgroundColor={Colors.$backgroundInverted}
        segments={[{ label: 'Default' }, { label: 'Partially' }, { label: 'Fully Expanded' }]}
        onChangeIndex={(index) => {
          switch (index) {
            case 0:
              setMinHeight(DEFAULT);
              break;
            case 1:
              setMinHeight(PARTIALLY_EXPANDED_HEIGHT);
              break;
            case 2:
              setMinHeight(FULLY_EXPANDED_HEIGHT);
              break;
          }
        }}
      />
    </View>
  );

  const renderExpandableSection = () => (
    <ExpandableSection
      top={minHeight === PARTIALLY_EXPANDED_HEIGHT}
      expanded={expanded}
      sectionHeader={
        minHeight === PARTIALLY_EXPANDED_HEIGHT
          ? renderReadMoreHeader()
          : renderHeader('How can I contact you?', expanded, { showInfo: true })
      }
      onPress={() => setExpanded(!expanded)}
      minHeight={minHeight}
    >
      {renderContent()}
    </ExpandableSection>
  );

  const renderNextItem = () =>
    renderHeader('Where are you located?', false, { disabled: true, showInfo: true });

  return (
    <ScrollView>
      <Text text40 margin-20>
        ExpandableSection
      </Text>
      {renderOptions()}
      {renderExpandableSection()}
      {minHeight !== PARTIALLY_EXPANDED_HEIGHT && renderNextItem()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center',
    width: '10px',
    height: '10px',
  },
});

export default ExpandableSectionScreen;
