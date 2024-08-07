import { useState } from "react";

export function useConfirm() {
    const [showModal, setShowModal] = useState(false);

    const cancel = () => {
        setShowModal(false);
    };

    return [
        showModal,
        setShowModal,
        cancel
    ];
}


