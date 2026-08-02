/// <reference types="chrome"/>

export async function saveData(key: string, value: unknown) {

    await chrome.storage.sync.set({

        [key]: value

    });

}

export async function getData<T>(key: string): Promise<T | undefined> {

    const result = await chrome.storage.sync.get(key);

    return result[key] as T | undefined;

}

export async function removeData(key: string) {

    await chrome.storage.local.remove(key);

}

export async function clearStorage() {

    await chrome.storage.local.clear();

}