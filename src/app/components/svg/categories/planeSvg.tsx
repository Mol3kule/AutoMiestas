import React from 'react'

export default function PlaneSvg({ color }: { color: string }) {
    return (
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="air6 1" clipPath="url(#clip0_731_264)">
                <g id="Group">
                    <path id="Vector" d="M30 9.59461C30 14.7843 4.98166 20.5126 3.08725 20.5126C2.02514 20.5126 0.820094 20.2678 0.820094 19.2886C0.820094 18.9615 1.19769 18.4886 1.86029 17.9186L1.85955 17.919L0.103378 14.7986C-0.134416 14.3761 0.0541136 13.8409 0.504114 13.6607L0.805927 13.5399C1.35294 13.3209 1.96857 13.3535 2.48931 13.6292L5.6775 15.317C6.91882 14.5807 8.32696 13.8099 9.81112 13.0509L3.59813 9.02005C3.10661 8.70113 3.11186 7.97986 3.60799 7.66819L4.11622 7.34888C4.9621 6.81746 5.99044 6.6605 6.95632 6.91525L17.2921 9.64152C20.5148 8.36241 23.4284 7.48937 25.153 7.48937C25.6136 7.48937 26.0749 7.50157 26.52 7.53339L23.3987 8.94246L23.324 9.99236L28.1422 7.77751C29.2971 8.05295 30 8.56701 30 9.59461ZM17.4261 18.5531L21.2814 22.9327C21.5163 23.1997 21.899 23.28 22.2214 23.1301L22.7377 22.8902C23.6793 22.4525 24.2338 21.4602 24.1132 20.4289L23.6306 16.3022C23.6007 16.0468 23.3416 15.8852 23.0991 15.9706L17.5938 17.9099C17.3258 18.0044 17.2383 18.3399 17.4261 18.5531Z" fill={color} />
                </g>
            </g>
            <defs>
                <clipPath id="clip0_731_264">
                    <rect width="30" height="30" fill="white" />
                </clipPath>
            </defs>
        </svg>

    )
}
