import React, { useState } from 'react'
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonItem,
  IonLabel,
} from '@ionic/react'
import type { ChecklistTemplate } from '../../utils/checklists'
import { getChecklistState, resetChecklist, toggleChecklistItem } from '../../utils/checklists'

interface Props {
  template: ChecklistTemplate
}

const ChecklistCard: React.FC<Props> = ({ template }) => {
  const [state, setState] = useState<Record<string, boolean>>(() => {
    const stored = getChecklistState()
    return stored[template.id] ?? {}
  })

  const handleToggle = (itemId: string) => {
    const updated = toggleChecklistItem(template.id, itemId)
    setState(updated[template.id] || {})
  }

  const handleReset = () => {
    const updated = resetChecklist(template.id)
    setState(updated[template.id] || {})
  }

  return (
    <IonCard className="tab-card">
      <IonCardHeader>
        <IonCardSubtitle>Checklist</IonCardSubtitle>
        <IonCardTitle>{template.title}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p>{template.description}</p>
        {template.items.map((item) => (
          <IonItem key={item.id} lines="none">
            <IonLabel>{item.label}</IonLabel>
            <IonCheckbox
              slot="end"
              checked={!!state[item.id]}
              onIonChange={() => handleToggle(item.id)}
            />
          </IonItem>
        ))}
        <IonButton expand="block" fill="clear" size="small" onClick={handleReset}>
          Reset Checklist
        </IonButton>
      </IonCardContent>
    </IonCard>
  )
}

export default ChecklistCard
