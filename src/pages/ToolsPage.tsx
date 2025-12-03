import React from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import ChecklistCard from '../components/tools/ChecklistCard'
import ContaminationLog from '../components/tools/ContaminationLog'
import { checklistTemplates } from '../utils/checklists'
import AIAssistant from '../components/assistant/AIAssistant'

const ToolsPage: React.FC = () => (
  <IonPage>
    <IonHeader>
      <IonToolbar color="primary">
        <IonTitle>Tools</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent fullscreen>
      <div className="ion-padding">
        <AIAssistant />
        {checklistTemplates.map((template) => (
          <ChecklistCard key={template.id} template={template} />
        ))}
        <ContaminationLog />
      </div>
    </IonContent>
  </IonPage>
)

export default ToolsPage
