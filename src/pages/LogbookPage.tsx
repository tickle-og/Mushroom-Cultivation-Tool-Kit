import React, { useState } from 'react'
import {
  IonButton,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonNote,
  IonButtons,
} from '@ionic/react'
import { addSharp, closeOutline } from 'ionicons/icons'
import LogEntryForm from '../components/logbook/LogEntryForm'
import LogEntryList from '../components/logbook/LogEntryList'
import { deleteEntry, loadEntries, saveEntry } from '../utils/logbook'
import type { LogEntry } from '../utils/logbook'

const sortEntries = (entries: LogEntry[]) =>
  [...entries].sort((a, b) => (a.date < b.date ? 1 : -1))

const LogbookPage: React.FC = () => {
  const [entries, setEntries] = useState<LogEntry[]>(() => sortEntries(loadEntries()))
  const [showForm, setShowForm] = useState(false)
  const [selectedEntry, setSelectedEntry] = useState<LogEntry | null>(null)

  const handleSave = (entry: LogEntry) => {
    const updated = sortEntries(saveEntry(entry))
    setEntries(updated)
    setShowForm(false)
  }

  const handleDelete = (entry: LogEntry) => {
    const updated = sortEntries(deleteEntry(entry.id))
    setEntries(updated)
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Logbook</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowForm(true)}>Add Entry</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="ion-padding">
          <IonCard color="light" className="tab-card">
            <IonCardHeader>
              <IonCardTitle>Grow Notes</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <p>Capture inoculations, surface adjustments, and flush data. Storage is local for now—TODO: encrypted vault.</p>
            </IonCardContent>
          </IonCard>
          <LogEntryList entries={entries} onSelect={setSelectedEntry} onDelete={handleDelete} />
        </div>

        <IonFab slot="fixed" vertical="bottom" horizontal="end">
          <IonFabButton color="primary" onClick={() => setShowForm(true)}>
            <IonIcon icon={addSharp} />
          </IonFabButton>
        </IonFab>

        <IonModal isOpen={showForm} onDidDismiss={() => setShowForm(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>New Entry</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowForm(false)}>
                  <IonIcon icon={closeOutline} slot="icon-only" />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <LogEntryForm onSave={handleSave} onCancel={() => setShowForm(false)} />
        </IonModal>

        <IonModal isOpen={!!selectedEntry} onDidDismiss={() => setSelectedEntry(null)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>{selectedEntry?.title}</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setSelectedEntry(null)}>Close</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            {selectedEntry && (
              <div>
                <IonNote>{selectedEntry.date}</IonNote>
                <p className="ion-padding-top">{selectedEntry.body}</p>
                <div className="tags">
                  {selectedEntry.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
                {selectedEntry.tekIds && selectedEntry.tekIds.length > 0 && (
                  <p>TEKs: {selectedEntry.tekIds.join(', ')}</p>
                )}
                {selectedEntry.speciesIds && selectedEntry.speciesIds.length > 0 && (
                  <p>Species: {selectedEntry.speciesIds.join(', ')}</p>
                )}
              </div>
            )}
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  )
}

export default LogbookPage
