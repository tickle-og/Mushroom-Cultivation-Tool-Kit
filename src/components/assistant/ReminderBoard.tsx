import React, { useState } from 'react'
import { IonButton, IonInput, IonItem, IonLabel, IonList, IonNote } from '@ionic/react'
import { defaultReminders, loadReminderState, saveReminderState, getNextDueLabel, bumpReminder } from '../../utils/reminders'
import type { ReminderEntry, ReminderState } from '../../utils/reminders'

const ReminderBoard: React.FC = () => {
  const [state, setState] = useState<ReminderState>(() => loadReminderState())

  const handleChange = (id: string, value?: string) => {
    const nextState = { ...state, [id]: value ?? '' }
    setState(nextState)
    saveReminderState(nextState)
  }

  const handleBump = (reminder: ReminderEntry) => {
    const nextDue = bumpReminder(state[reminder.id], reminder.frequencyHours)
    handleChange(reminder.id, nextDue)
  }

  const renderDueReadout = (id: string) => getNextDueLabel(state[id])

  return (
    <IonList>
      {defaultReminders.map((reminder) => (
        <IonItem key={reminder.id} lines="full" className="reminder-item">
          <IonLabel>
            <strong>{reminder.task}</strong>
            <p>{reminder.description}</p>
            <IonNote>{renderDueReadout(reminder.id)}</IonNote>
          </IonLabel>
          <div className="reminder-actions">
            <IonInput
              type="datetime-local"
              value={state[reminder.id]}
              onIonChange={(e) => handleChange(reminder.id, e.detail.value ?? '')}
              aria-label={`Set next ${reminder.task} reminder`}
            />
            <IonButton fill="outline" size="small" onClick={() => handleBump(reminder)}>
              Mark Done +{reminder.frequencyHours / 24}d
            </IonButton>
          </div>
        </IonItem>
      ))}
    </IonList>
  )
}

export default ReminderBoard
