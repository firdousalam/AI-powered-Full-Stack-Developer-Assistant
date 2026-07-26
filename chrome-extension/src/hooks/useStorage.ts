import { useEffect, useState } from "react";

import { getData } from "../services/storage.service";

export function useStorage(key: string) {

    const [value, setValue] = useState<unknown>();

    useEffect(() => {

        async function load() {

            const data = await getData(key);

            setValue(data);

        }

        load();

    }, [key]);

    return value;

}