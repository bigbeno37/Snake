/**
 * Utility class to use the Observer pattern with reactive programming.
 */
export class Observable {
    /**
     * The internal value.
     */
    #_value;

    /**
     * The list of observers that will be notified when the internal value updates.
     */
    #_observers = [];

    constructor(value) {
        this.#_value = value;
    }

    /**
     * Returns the current internal value.
     */
    get value() {
        return this.#_value;
    }

    /**
     * Updates the internal value of this Observable to the given value. This will call all observers with the new
     * given value.
     *
     * @param newValue The new value this Observable should hold.
     */
    set value(newValue) {
        this.#_value = newValue;
        this.#_observers.forEach(observer => observer(newValue));
    }

    /**
     * Adds an observer to this Observable instance.
     *
     * @param observer A function that will be given the new value as a parameter.
     */
    addObserver(observer) {
        this.#_observers.push(observer);
    }

    /**
     * Adds an observer to this Observable instance and immediately runs the given observer. Useful for cases such
     * as an observer being used to render elements.
     *
     * @param observer A function that will be given the new value as a parameter.
     */
    addObserverAndRun(observer) {
        this.addObserver(observer);
        observer(this.#_value);
    }

    /**
     * Maps the current value of this Observable into a new value, calling all observers afterwards.
     *
     * @param mapper A function that accepts this Observable's value and returns a new value.
     */
    map(mapper) {
        this.value = mapper(this.#_value);
    }
}