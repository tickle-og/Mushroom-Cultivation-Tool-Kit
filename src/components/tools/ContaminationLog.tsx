import React, { useState } from 'react'
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonInput,
  IonItem,
  IonLabel,
  IonTextarea,
  IonList,
  IonNote,
} from '@ionic/react'
import type { ContaminationNote } from '../../utils/contaminationLog'
import { addContaminationNote, loadContaminationNotes } from '../../utils/contaminationLog'

const ContaminationLog: React.FC = () => {
  const [notes, setNotes] = useState<ContaminationNote[]>(() => loadContaminationNotes())
  const [form, setForm] = useState({ date: '', cause: '', notes: '' })

  const handleSubmit = () => {
    if (!form.date || !form.cause) {
      return
    }
    const entry: ContaminationNote = {
      id: Date.now().toString(),
      date: form.date,
      suspectedCause: form.cause,
      notes: form.notes,
    }
    const updated = addContaminationNote(entry)
    setNotes(updated)
    setForm({ date: '', cause: '', notes: '' })
  }

  return (
    <IonCard className="tab-card">
      <IonCardHeader>
        <IonCardSubtitle>Issue Tracking</IonCardSubtitle>
        <IonCardTitle>Contamination Log</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <IonItem>
          <IonLabel position="stacked">Date</IonLabel>
          <IonInput
            type="date"
            value={form.date}
            onIonChange={(e) => setForm((prev) => ({ ...prev, date: e.detail.value ?? '' }))}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Likely Cause</IonLabel>
          <IonInput
            value={form.cause}
            placeholder="e.g., unclean scalpel"
            onIonChange={(e) => setForm((prev) => ({ ...prev, cause: e.detail.value ?? '' }))}
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Notes</IonLabel>
          <IonTextarea
            autoGrow
            value={form.notes}
            onIonChange={(e) => setForm((prev) => ({ ...prev, notes: e.detail.value ?? '' }))}
          />
        </IonItem>
        <IonButton expand="block" className="ion-margin-top" onClick={handleSubmit}>
          Save Note
        </IonButton>

        <IonList className="ion-padding-top">
          {notes.length === 0 && <IonNote>No contamination notes yet.</IonNote>}
          {notes.map((note) => (
            <IonItem key={note.id} lines="none">
              <IonLabel>
                <h2>{note.date} — {note.suspectedCause}</h2>
                <p>{note.notes}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonCardContent>
    </IonCard>
  )
}

export default ContaminationLog
