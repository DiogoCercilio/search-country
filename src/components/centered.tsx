import React from 'react'

function Centered({ children }: any) {
    return (
        <div className="justify-center items-center flex" style={{ minHeight: 'calc(100vh - 300px)' }}>
            {children}
        </div>
    )
}

export default Centered