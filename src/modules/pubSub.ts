import { Subscriber } from './types';

class PubSub {
	static observers: { [key: string]: Subscriber[] } = {};

	static subscribe(topic: string, subscriber: Subscriber) {
		if (!PubSub.observers[topic]) {
			PubSub.observers[topic] = [];
		}

		PubSub.observers[topic].push(subscriber);
	}

	static unsubscribe(topic: string, subscriber: Subscriber) {
		PubSub.observers[topic] = PubSub.observers[topic].filter(
			(func) => func !== subscriber,
		);
		if (PubSub.observers[topic].length === 0) {
			delete PubSub.observers[topic];
		}
	}

	static notify(topic: string, ...args: any[]) {
		if (!PubSub.observers[topic]) return;
		PubSub.observers[topic].forEach((sub) => sub({ ...args }));
	}

	static hasSubscriber(topic: string) {
		return PubSub.observers.hasOwnProperty(topic);
	}

	static clearObservers() {
		PubSub.observers = {};
	}
}

export { PubSub };
