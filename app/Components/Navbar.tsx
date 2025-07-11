import React from 'react'

type NavbarProps = {
  mode: React.CSSProperties
};

export default function Navbar({ mode }: NavbarProps) {
    return (
            <nav className="navbar py-4" style={mode}>
                <div className="container-fluid" style={mode}>
                    <span className="nnavbar-brand mb-0 h1 fs-2" style={mode}>NotChatGPT</span>
                </div>
            </nav>
    )
}
