export const appLocalStorage = {
  set(key: string, value: unknown) {
    const joinValue = JSON.stringify(value);

    window.localStorage.setItem(key, joinValue);
  },
  get<T>(key: string, initialValue: T): T {
    const joinValue = window.localStorage.getItem(key);

    if (!joinValue) {
      this.set(key, initialValue);

      return initialValue;
    }

    try {
      return JSON.parse(joinValue);
    } catch {
      this.set(key, initialValue);

      return initialValue;
    }
  },
};
