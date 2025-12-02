import React, { useEffect, useState } from 'react'
import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  IonToggle,
  IonNote,
} from '@ionic/react'
import type { AppSettings } from '../utils/settings'
import { loadSettings, saveSettings } from '../utils/settings'
import { teks } from '../data/teks'
import { applyThemeClass, resolveTheme } from '../utils/theme'

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings())
  const [preferDark, setPreferDark] = useState(resolveTheme(settings.theme) === 'dark')

  useEffect(() => {
    applyThemeClass(settings.theme)
    saveSettings(settings)
    setPreferDark(resolveTheme(settings.theme) === 'dark')
  }, [settings])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>Dark Theme</IonLabel>
            <IonToggle
              checked={preferDark}
              onIonChange={(e) =>
                setSettings((prev) => ({ ...prev, theme: e.detail.checked ? 'dark' : 'light' }))
              }
            />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Preferred Units</IonLabel>
            <IonSelect
              value={settings.units}
              onIonChange={(e) => setSettings((prev) => ({ ...prev, units: e.detail.value as AppSettings['units'] }))}
            >
              <IonSelectOption value="metric">Metric</IonSelectOption>
              <IonSelectOption value="imperial">Imperial</IonSelectOption>
              <IonSelectOption value="mixed">Mixed</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Default TEK</IonLabel>
            <IonSelect
              value={settings.defaultTekId}
              onIonChange={(e) => setSettings((prev) => ({ ...prev, defaultTekId: e.detail.value as string }))}
            >
              {teks.map((tek) => (
                <IonSelectOption key={tek.id} value={tek.id}>
                  {tek.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
        </IonList>
        <IonNote className="ion-padding">
          Preferences are stored locally for now. Future releases will sync via encrypted vault.
        </IonNote>
      </IonContent>
    </IonPage>
  )
}

export default SettingsPage
