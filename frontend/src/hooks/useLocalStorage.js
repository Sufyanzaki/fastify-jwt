import { useEffect, useState } from 'react'

const PREFIX = 'social-'

export default function useLocalStorage(key, initialValue) {
    const prefixedKey = PREFIX + key
    const [value, setValue] = useState(() => {
        const jsonValue = localStorage.getItem(prefixedKey)
        if (jsonValue) { return JSON.parse(jsonValue) }
        if (typeof initialValue === 'function') {
            return initialValue()
        } else {
            return initialValue
        }
    }
    )

    useEffect(() => {
        if (value) { localStorage.setItem(prefixedKey, JSON.stringify(value)) }
    }, [prefixedKey, value])

    return [value, setValue]
}