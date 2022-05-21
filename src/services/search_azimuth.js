const searchAzimuth = async data => {
    const response = await fetch(`https://mt2aga2c5l.execute-api.us-east-2.amazonaws.com/get-node?urbit-id=${data}`)

    return response.json()
}

module.exports = searchAzimuth