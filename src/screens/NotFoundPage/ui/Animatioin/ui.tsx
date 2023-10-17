import styles from "@/screens/NotFoundPage/ui/styles.module.scss";

const Animation = () => {
    return (
        <div className={styles.animation}>
            <svg width={812} height={425} viewBox="0 0 812 425">
                <g clipPath="url(#chess_board_clip)">
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#chess_board_pattern)" />
                </g>
                <defs>
                    <pattern id="chess_board_pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <g>
                            <rect x="0" y="0" fill="#e0e0e0" width="20" height="20" />
                            <rect x="20" y="20" fill="#e0e0e0" width="20" height="20" />
                            <rect x="20" y="0" fill="#FFFFFF" width="20" height="20" />
                            <rect x="0" y="20" fill="#FFFFFF" width="20" height="20" />
                        </g>
                    </pattern>
                    <clipPath id="chess_board_clip">
                        <circle r={180} cx={180} cy={242.5}>
                            <animate
                                attributeName="cx"
                                values="180;199;342;342;180"
                                dur="4s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cy"
                                values="242.5;180;242.5;180;242.5"
                                dur="4s"
                                repeatCount="indefinite"
                            />
                        </circle>
                        <circle r={180} cx={470} cy={242.5}>
                            <animate
                                attributeName="cx"
                                values="470;489;632;632;470"
                                dur="4s"
                                repeatCount="indefinite"
                            />
                            <animate
                                attributeName="cy"
                                values="242.5;180;242.5;180;242.5"
                                dur="4s"
                                repeatCount="indefinite"
                            />
                        </circle>
                    </clipPath>
                </defs>
            </svg>
        </div>
    );
};

export { Animation };
