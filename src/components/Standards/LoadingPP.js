import React from 'react'
import Skeleton from 'react-loading-skeleton'

function LoadingPP() {
    return (
        <>
            <div style={{ display: 'flex' }}>
                <Skeleton variant="rounded" width={1350} height={150} />
            </div>
            <div style={{ display: 'flex', marginTop: '50px', marginLeft: '170px' }}>
                <Skeleton variant="rounded" width={1000} height={350} />
            </div>
            <div style={{ display: 'flex', marginTop: '50px', marginLeft: '170px' }}>
                <Skeleton variant="rounded" width={1000} height={350} />
            </div>
            <div style={{ display: 'flex', marginTop: '50px', marginLeft: '170px', marginBottom: '50px' }}>
                <Skeleton variant="rounded" width={1000} height={350} />
            </div>
        </>
    )
}

export default LoadingPP