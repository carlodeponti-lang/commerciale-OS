'use client';

const EVENTS = [
  { id: 1, time: '09:00 - 09:30', title: 'Follow-up Post Incontro', type: 'task', day: 'Oggi' },
  { id: 2, time: '10:30 - 11:30', title: 'Incontro GNOSIS Svizzera - Dr. Casoni', type: 'meeting', day: 'Oggi' },
  { id: 3, time: '14:00 - 14:30', title: 'Rispondere Labanalysis SA8000', type: 'mail', day: 'Oggi' },
  { id: 4, time: '09:00 - 09:30', title: 'Call Flamma - revisione offerta', type: 'meeting', day: 'Domani' },
  { id: 5, time: '15:00 - 16:00', title: 'Preparare report mensile', type: 'task', day: 'Domani' },
  { id: 6, time: '11:00 - 12:00', title: 'Visita cliente IBSA - Milano', type: 'meeting', day: 'Dopodomani' },
];

const TYPE_COLOR: Record<string, string> = {
  meeting: 'border-l-blue-500 bg-blue-50',
  task: 'border-l-gray-300 bg-gray-50',
  mail: 'border-l-orange-400 bg-orange-50',
};

const TYPE_BADGE: Record<string, string> = {
  meeting: 'bg-blue-100 text-blue-700',
  task: 'bg-gray-100 text-gray-600',
  mail: 'bg-orange-100 text-orange-700',
};

const DAYS = ['Oggi', 'Domani', 'Dopodomani'];

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Calendario</h2>
      {DAYS.map((day) => {
        const dayEvents = EVENTS.filter((e) => e.day === day);
        return (
          <div key={day}>
            <p className="text-xs font-semibold text-gray-400 uppercase mb-3">{day}</p>
            <div className="space-y-2">
              {dayEvents.map((ev) => (
                <div key={ev.id} className={`flex items-center gap-4 p-4 rounded-xl border-l-4 ${TYPE_COLOR[ev.type]}`}>
                  <span className="text-xs font-mono text-gray-500 w-28">{ev.time}</span>
                  <p className="text-sm font-medium text-gray-900 flex-1">{ev.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${TYPE_BADGE[ev.type]}`}>{ev.type}</span>
                </div>
              ))}
              {dayEvents.length === 0 && (
                <div className="py-3 px-4 bg-gray-50 rounded-xl text-sm text-gray-400">Nessun evento</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
