import React, { Suspense, lazy } from 'react'
import {
  IonApp,
  IonSplitPane,
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonSpinner,
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
const CalculatorsPage = lazy(() => import('./pages/CalculatorsPage'))
const ReferencePage = lazy(() => import('./pages/ReferencePage'))
const ToolsPage = lazy(() => import('./pages/ToolsPage'))
const LogbookPage = lazy(() => import('./pages/LogbookPage'))
const SettingsPage = lazy(() => import('./pages/SettingsPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))

import './App.css'

const RouteFallback = () => (
  <div className="route-loading">
    <IonSpinner name="crescent" />
  </div>
)

const Tabs: React.FC = () => (
  <IonTabs>
    <Suspense fallback={<RouteFallback />}>
      <IonRouterOutlet>
        <Route path="/tabs/calculators" component={CalculatorsPage} exact />
        <Route path="/tabs/reference" component={ReferencePage} exact />
        <Route path="/tabs/tools" component={ToolsPage} exact />
        <Route path="/tabs/logbook" component={LogbookPage} exact />
        <Redirect exact from="/tabs" to="/tabs/calculators" />
      </IonRouterOutlet>
    </Suspense>
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
        <Suspense fallback={<RouteFallback />}>
          <IonRouterOutlet id="main">
            <Route path="/tabs" component={Tabs} />
            <Route path="/settings" component={SettingsPage} exact />
            <Route path="/about" component={AboutPage} exact />
            <Redirect exact from="/" to="/tabs/calculators" />
          </IonRouterOutlet>
        </Suspense>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
)

export default App
