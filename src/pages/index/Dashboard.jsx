import React from 'react'
import Header from '../layouts/header'
import { Theme } from '@carbon/react'

function Dashboard() {
    return (
        <div>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h1>
                            Dashboard
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard