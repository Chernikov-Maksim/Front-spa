"use client";

import { useCallback, useState } from "react";

const useModal = (initialValue: boolean): [boolean, () => void, () => void] => {
    const [isOpen, setIsOpen] = useState<boolean>(initialValue);

    const open = useCallback(() => {
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
    }, []);

    return [isOpen, open, close];
};

export { useModal };
