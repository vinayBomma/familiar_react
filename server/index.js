const express = require('express')
const mongoose = require('mongoose')

const app = express()

app.listen(5000, () => {
    console.log('Listening on 5000')
})