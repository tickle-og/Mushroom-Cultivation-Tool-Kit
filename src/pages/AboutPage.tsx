import React from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonItem, IonLabel } from '@ionic/react'

const AboutPage: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>About</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Mycoenvy Cultivation Toolbag</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              A focused mobile toolbox inspired by the Ionic Conference app, rebuilt for cultivators that need quick math,
              reference data, and lightweight tracking. It is intentionally lightweight—not an ERP or grow op replacement.
            </p>
            <p>
              Version 0.1. Data lives locally on your device until we ship encrypted sync. Send feature ideas via the Help tab in future iterations.
            </p>
          </IonCardContent>
        </IonCard>
        <IonList>
          <IonItem>
            <IonLabel>Creator</IonLabel>
            <IonLabel slot="end">Mycoenvy Collective</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Status</IonLabel>
            <IonLabel slot="end">MVP prototype</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Built With</IonLabel>
            <IonLabel slot="end">Ionic React + TypeScript</IonLabel>
          </IonItem>
        </IonList>
      </div>
    </IonContent>
  </IonPage>
)

export default AboutPage
