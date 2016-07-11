import React from 'react'
import ReactDOM from 'react-dom'
import EtchView from './EtchView.js'

const app = function() {

	ReactDOM.render(<EtchView/>,document.querySelector('.container'))
}

app()