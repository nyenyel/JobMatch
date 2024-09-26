import React from 'react'
import { useOutletContext } from 'react-router-dom'

export default function JobSkillComponent() {
    const data = useOutletContext()
    console.log(data?.skill)
    return (
        <>
            <div>JobSkillComponent</div>
        </>
    )
}
