const transformarDataUtils = (data: string) => {
    
    const partes = data.split('/')
    const newData = `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`

    return newData;
}

export default  transformarDataUtils 