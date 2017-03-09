/* global document */

import './style.scss'
import React from 'react' // eslint-disable-line no-unused-vars
import ReactDOM from 'react-dom'
import TestWrapper from './test-wrapper.jsx'

function main() {
    const div = document.createElement('div')
    document.body.appendChild(div)
    ReactDOM.render(<TestWrapper/>, div)
}

main()
