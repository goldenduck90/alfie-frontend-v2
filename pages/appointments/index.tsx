import { PractitionerApplicationLayout } from "../../src/components/layouts/PractitionerApplicationLayout";
import { CalendarView } from "../../src/components/appointments/Calendar";
import React from "react";

const Appointments = () => {
  return <CalendarView />;
};

Appointments.getLAyout = (page: React.ReactNode) => (
  <PractitionerApplicationLayout title="Appointments">
    {page}
  </PractitionerApplicationLayout>
);

export default Appointments;

import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Font, Space } from "../../atoms";
import { HeaderText } from "../../components/CustomText";
import { LeftChev } from "../../components/NavigationComponents/Icons";

const Settings = ({ logout }: { logout: () => void }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginTop: 20,
          marginHorizontal: Space.space5,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <LeftChev style={{ justifyContents: "start" }} />
          <HeaderText
            customTextStyle={{
              lineHeight: 32,
              fontSize: 23,
              fontFamily: Font.poppins700Bold.fontFamily,
              justifyContent: "center",
              flex: "inline-flex",
            }}
            text="Settings"
          />
          {/* <View /> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#ffffff",
  },
});
export default Settings;
