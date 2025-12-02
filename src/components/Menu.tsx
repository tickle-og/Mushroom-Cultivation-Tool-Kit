import React, { useEffect, useState } from 'react'
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar,
  IonToggle,
} from '@ionic/react'
import {
  calculatorOutline,
  bookOutline,
  constructOutline,
  journalOutline,
  settingsOutline,
  informationCircleOutline,
} from 'ionicons/icons'
import { useLocation } from 'react-router'
import { loadSettings, saveSettings, type AppSettings } from '../utils/settings'
import { applyThemeClass, resolveTheme } from '../utils/theme'

const primaryPages = [
  { title: 'Calculators', url: '/tabs/calculators', icon: calculatorOutline },
  { title: 'Reference', url: '/tabs/reference', icon: bookOutline },
  { title: 'Tools', url: '/tabs/tools', icon: constructOutline },
  { title: 'Logbook', url: '/tabs/logbook', icon: journalOutline },
]

const secondaryPages = [
  { title: 'Settings', url: '/settings', icon: settingsOutline },
  { title: 'About', url: '/about', icon: informationCircleOutline },
]

const Menu: React.FC = () => {
  const location = useLocation()
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings())

  useEffect(() => {
    applyThemeClass(settings.theme)
  }, [settings.theme])

  const handleThemeToggle = (checked: boolean) => {
    const nextTheme: AppSettings['theme'] = checked ? 'dark' : 'light'
    const updated = { ...settings, theme: nextTheme }
    setSettings(updated)
    saveSettings(updated)
  }

  const darkActive = resolveTheme(settings.theme) === 'dark'

  const renderMenuItems = (pages: typeof primaryPages) =>
    pages.map((page) => (
      <IonMenuToggle key={page.title} autoHide={false}>
        <IonItem
          routerLink={page.url}
          routerDirection="none"
          detail={false}
          className={location.pathname.startsWith(page.url) ? 'selected' : ''}
        >
          <IonIcon slot="start" icon={page.icon} />
          <IonLabel>{page.title}</IonLabel>
        </IonItem>
      </IonMenuToggle>
    ))

  return (
    <IonMenu contentId="main" type="overlay">
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Mycoenvy Cultivation Toolbag</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem lines="full">
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle
              slot="end"
              checked={darkActive}
              onIonChange={(e) => handleThemeToggle(e.detail.checked)}
              aria-label="Toggle dark theme"
            />
          </IonItem>
        </IonList>
        <IonList>{renderMenuItems(primaryPages)}</IonList>
        <IonList>{renderMenuItems(secondaryPages)}</IonList>
      </IonContent>
    </IonMenu>
  )
}

export default Menu
