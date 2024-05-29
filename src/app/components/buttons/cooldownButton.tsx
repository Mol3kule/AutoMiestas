'use client';

import { FormEvent, useEffect, useState } from "react";

export const CooldownButton = ({ type, text, cooldown, className, cooldownByDefault, buttonClicked }: { type: React.ButtonHTMLAttributes<HTMLButtonElement>['type'], text: string, cooldown: number, className: string, cooldownByDefault?: boolean, buttonClicked?: () => void }) => {
    const [datePressed, setDatePressed] = useState<number | null>(null);
    const [remainingCooldown, setRemainingCooldown] = useState<number | null>(null);
    const [isDefaultCooldown, setIsDefaultCooldown] = useState<boolean>(cooldownByDefault ?? false);

    useEffect(() => {
        if (isDefaultCooldown) {
            setDatePressed(Date.now());
        }
    }, []); 

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (datePressed) {
            const updateRemainingCooldown = () => {
                const elapsed = Date.now() - datePressed;
                const remaining = Math.max(0, cooldown - elapsed);
                setRemainingCooldown(remaining);

                if (remaining === 0) {
                    clearInterval(intervalId);
                }
            };

            // Initial update
            updateRemainingCooldown();

            // Set interval to update every second
            intervalId = setInterval(updateRemainingCooldown, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [datePressed, cooldown]);

    const handleButtonClick = (e: FormEvent) => {
        e.preventDefault();
        if (!datePressed || Date.now() - datePressed > cooldown) {
            setDatePressed(Date.now());
            if (!buttonClicked) return;
            buttonClicked();
        }
    }

    return (
        <button
            type={type}
            className={className}
            onClick={handleButtonClick}
            disabled={remainingCooldown !== null && remainingCooldown > 0}
            style={{ cursor: remainingCooldown !== null && remainingCooldown > 0 ? 'not-allowed' : 'pointer' }}
        >
            {remainingCooldown !== null && remainingCooldown > 0
                ? `${text}. (${Math.ceil(remainingCooldown / 1000)}s)`
                : text
            }
        </button>
    );
};
