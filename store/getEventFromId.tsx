import { eventsData } from './events';

export const getEventFromEventId = (eventId: number) => {

    for (const category in eventsData) {
        const event = eventsData[category as keyof typeof eventsData].find((event: { eventId: number }) => event.eventId === eventId);

        if (event) {
            return event;
        }
    }
    return null;
};