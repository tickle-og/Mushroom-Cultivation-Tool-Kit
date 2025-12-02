import React from 'react'
import {
  IonApp,
  IonSplitPane,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { Redirect, Route } from 'react-router-dom'
import {
  calculatorOutline,
  bookOutline,
  constructOutline,
  journalOutline,
} from 'ionicons/icons'

import Menu from './components/Menu'
import CalculatorsPage from './pages/CalculatorsPage'
import ReferencePage from './pages/ReferencePage'
import ToolsPage from './pages/ToolsPage'
import LogbookPage from './pages/LogbookPage'
import SettingsPage from './pages/SettingsPage'
import AboutPage from './pages/AboutPage'

import './App.css'

const Tabs: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route path="/tabs/calculators" component={CalculatorsPage} exact />
      <Route path="/tabs/reference" component={ReferencePage} exact />
      <Route path="/tabs/tools" component={ToolsPage} exact />
      <Route path="/tabs/logbook" component={LogbookPage} exact />
      <Redirect exact from="/tabs" to="/tabs/calculators" />
    </IonRouterOutlet>
    <IonTabBar slot="bottom">
      <IonTabButton tab="calculators" href="/tabs/calculators">
        <IonIcon icon={calculatorOutline} />
        <IonLabel>Calculators</IonLabel>
      </IonTabButton>
      <IonTabButton tab="reference" href="/tabs/reference">
        <IonIcon icon={bookOutline} />
        <IonLabel>Reference</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tools" href="/tabs/tools">
        <IonIcon icon={constructOutline} />
        <IonLabel>Tools</IonLabel>
      </IonTabButton>
      <IonTabButton tab="logbook" href="/tabs/logbook">
        <IonIcon icon={journalOutline} />
        <IonLabel>Logbook</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
)

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          <Route path="/tabs" component={Tabs} />
          <Route path="/settings" component={SettingsPage} exact />
          <Route path="/about" component={AboutPage} exact />
          <Redirect exact from="/" to="/tabs/calculators" />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
)

export default App
