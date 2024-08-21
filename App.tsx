import i18next from "i18next";
import { StatusBar } from "expo-status-bar";
import { initReactI18next, useTranslation } from "react-i18next";
import { AppState, StyleSheet, Text, View } from "react-native";
import i18nextHttpBackend, { HttpBackendOptions } from "i18next-http-backend";
import { useEffect } from "react";

i18next
  .use(initReactI18next)
  .use(i18nextHttpBackend)
  .init<HttpBackendOptions>({
    backend: {
      loadPath: "https://random-data-api.com/api/v2/users",
      parse(data) {
        console.log("called parse");
        return JSON.parse(data);
      },
    },
    lng: "en",
    fallbackLng: "en",
    defaultNS: "translation",
    ns: ["translation"],
    react: {
      useSuspense: false,
    },
    compatibilityJSON: "v3",
    debug: true,
  });

export default function App() {
  const { t } = useTranslation();

  useEffect(() => {
    const listener = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        i18next.reloadResources().then(() => {
          console.log("reloaded");
          i18next.changeLanguage("en");
        });
      }
    });

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>first name: {t("first_name")}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
