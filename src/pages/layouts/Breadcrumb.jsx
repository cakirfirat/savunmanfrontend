import React from 'react'
import { Breadcrumb, BreadcrumbItem } from 'carbon-components-react'

function Breadcrumbitem() {
    return (
        <Breadcrumb className='mt-5 ms-5'>
            <BreadcrumbItem>
                <a href="/">Ana sayfa</a>
            </BreadcrumbItem>
            <BreadcrumbItem isActive={true} href="#">Paketler</BreadcrumbItem>
        </Breadcrumb>
    )
}

export default Breadcrumbitem